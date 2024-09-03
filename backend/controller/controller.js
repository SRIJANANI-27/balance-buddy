import { Tracker } from "../model/model.js";

// Get all data


// Get filtered data based on date range
export const getFilteredData = async (req, res) => {
    const { startDate, endDate } = req.query;

    let query = {};
    if (startDate && endDate) {
        query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    try {
        const data = await Tracker.find(query);
        if (!data) {
            return res.status(400).json({ message: "No data found" });
        }

        // Format the date before sending it to the frontend
        const formattedData = data.map(item => ({
            ...item._doc,
            date: item.date.toISOString().split('T')[0] // Format date to YYYY-MM-DD
        }));

        return res.status(200).json({
            count: data.length,
            data: formattedData
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
};


export const getalldata = async (req, res, next) => {
    let data;
    try {
        data = await Tracker.find();
    } catch (err) {
        console.log(err);
    }

    if (!data) {
        return res.status(400).json({ message: "No data found" });
    }

    // Format the date before sending it to the frontend
    const formattedData = data.map(item => ({
        ...item._doc,
        date: item.date.toISOString().split('T')[0] // Format date to YYYY-MM-DD
    }));

    return res.status(200).json({
        count: data.length,
        data: formattedData
    });
};

// Add new data


export const adddata = async (req, res) => {
    const { title, description, amount, date, startdate, enddate, reason } = req.body;

    // Validate required fields
    if (!title || !amount || !date) {
        return res.status(400).json({ error: 'Title, amount, and date are required' });
    }

    try {
        // Convert date string to Date object if it's valid
        const formattedDate = new Date(date);
        if (isNaN(formattedDate.getTime())) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        // Create new Tracker instance
        const newdata = new Tracker({
            title,
            description,
            amount,
            date: formattedDate,
            startdate: startdate ? new Date(startdate) : null, // Convert startdate if provided
            enddate: enddate ? new Date(enddate) : null,       // Convert enddate if provided
            reason
        });

        // Save the data
        const savedData = await newdata.save();

        // Respond with success
        return res.status(201).json({ newdata: savedData });
    } catch (err) {
        console.error('Error saving data:', err); // Log the error
        return res.status(500).json({ error: 'An error occurred while saving the data' });
    }
};


// Delete data by ID
export const deletedata = async (req, res) => {
    let data;
    let id = req.params.id;

    try {
        data = await Tracker.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }

    if (!data) {
        return res.status(404).json({ message: "No data found with this ID" });
    }

    return res.status(200).json({ message: "Deleted successfully" });
};

// Update data by ID
export const updatedata = async (req, res) => {
    let data;
    const { title, description, date, amount, reason } = req.body;
    let id = req.params.id;

    // Convert date string to Date object
    const formattedDate = new Date(date);

    try {
        data = await Tracker.findByIdAndUpdate(id, {
            title,
            description,
            amount,
            date: formattedDate,// Use the formatted Date object
            reason
        });
    } catch (err) {
        console.log(err);
    }

    if (!data) {
        return res.status(404).json({ message: "No data found with this ID" });
    }

    return res.status(200).json({ message: "Updated successfully" });
};
