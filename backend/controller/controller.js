import models from '../model/model.js';
const { User } = models; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getFilteredData = async (req, res) => {
  const { startDate, endDate } = req.query;
  const userId = req.user._id;

  let query = { userId }; // Filter by userId
  if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  try {
      const data = await User.find(query);
      if (!data.length) {
          return res.status(400).json({ message: "No data found" });
      }

      const formattedData = data.map(item => ({
          ...item._doc,
          date: item.date.toISOString().split('T')[0] // Format date to YYYY-MM-DD
      }));

      return res.status(200).json({ count: data.length, data: formattedData });
  } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
  }
};



export const addData = async (req, res) => {
    const userId = req.user._id; // Get user ID from authenticated user

    const expenseData = {
        title: req.body.title,
        description: req.body.description,
        amount: req.body.amount,
        date: req.body.date,
        reason: req.body.reason,
        startdate: req.body.startdate,
        enddate: req.body.enddate,
    };

    try {
        const userData = await User.findByIdAndUpdate(
            userId,
            { $push: { expenses: expenseData } }, // Push the new expense into the user's expenses array
            { new: true }
        );

        res.status(200).json({
            message: "Expense added successfully",
            success: true,
            data: userData?.expenses // Return updated expenses
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        });
    }
};

export const getAllData = async (req, res) => {
    const userId = req.user._id; // Get the authenticated user's ID

    try {
        // Fetch the user and only select the 'expenses' field
        const userData = await User.findById(userId).select('expenses');
        console.log("User expenses:", userData.expenses); // Log expenses
        // Check if user data exists
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return the user's expenses
        res.status(200).json({
            message: "Fetched expenses successfully",
            success: true,
            user: {
                name: userData.name,
                email: userData.email,
                expenses: userData.expenses
                // Return the user's expenses
            } // Return the user's expenses only
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        });
    }
};




// Delete a transaction by its ID
export const deleteData = async (req, res) => {
    const { _id } = req.user; // Get user ID from authenticated user
    const expenseId = req.params.expenseId; // Get expense ID

    try {
        const userData = await UserModel.findByIdAndUpdate(
            _id,
            { $pull: { expenses: { _id: expenseId } } }, // Remove specific expense
            { new: true }
        );

        res.status(200).json({
            message: "Expense Deleted successfully",
            success: true,
            data: userData?.expenses // Return updated expenses
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        });
    }
};



// Update data by ID
export const updateData = async (req, res) => {
    const userId = req.user._id;
    const expenseId = req.params.expenseId; // Get expense ID from request parameters

    try {
        const updatedExpense = await User.findOneAndUpdate(
            { _id: userId, 'expenses._id': expenseId }, // Ensure we only update the user's expense
            { $set: { 'expenses.$': req.body } }, // Use the positional operator to update the correct expense
            { new: true }
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: "No data found with this ID" });
        }

        return res.status(200).json({ message: "Updated successfully", data: updatedExpense.expenses });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};




// Register a new user
// export const register = async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (user) {
//             return res.status(409).json({ message: 'User already exists', success: false });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ name, email, password: hashedPassword });
//         await newUser.save();

//         res.status(201).json({ message: "Signup successful", success: true });
//     } catch (err) {
//         res.status(500).json({ message: "Internal server error", success: false });
//     }
// };

// // Login user
// export const login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(403).json({ message: 'Auth failed: email or password is incorrect', success: false });
//         }

//         const isPassEqual = await bcrypt.compare(password, user.password);
//         if (!isPassEqual) {
//             return res.status(403).json({ message: 'Auth failed: email or password is incorrect', success: false });
//         }

//         const jwtToken = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
//         res.status(200).json({ message: "Login successful", success: true, jwtToken, email: user.email, name: user.name });
//     } catch (err) {
//         res.status(500).json({ message: "Internal server error", success: false });
//     }
// };

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User is already exist, you can login', success: false });
        }
        const userModel = new User({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

// Reset password
export const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'No user registered with this email.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while resetting the password.' });
    }
};

// Get all users (admin functionality)
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        if (!users.length) {
            return res.status(400).json({ message: "No users found" });
        }

        return res.status(200).json({ count: users.length, users });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};
