import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Graph from './components/Graph';
import Forms from './components/Forms';
import Table from './components/Table';
import Login from './components/Login';
import Register from './components/Register';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { baseurl } from './url';
import Navbar from './components/Navbar';

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setIsAuthenticated(true);
        setCurrentUser(user);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem('currentUser'); // Remove corrupted data if it can't be parsed
      }
    }
  }, []);

  const login = (user, token) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('token', token); // Store the token
  };
  

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  return { isAuthenticated, currentUser, login, logout };
}

function App() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    reason: '',
    date: '',
    amount: '',
  });
  const [editingData, setEditingData] = useState(null);
  const { isAuthenticated, currentUser, login, logout } = useAuth();
  const formsRef = useRef(null);

  // Fetch user-specific transactions
  const fetchTransactions = async () => {
    const token = localStorage.getItem('token');
    if (!token) return; // Early return if no token
  
    try {
      const res = await axios.get(`${baseurl}/data`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setTransactions(res.data.data); // Assuming your API returns data in this structure
    } catch (err) {
      console.error('Error fetching transactions:', err);
    }
  };
  

  // Fetch transactions when authenticated
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      fetchTransactions(); // Fetch transactions for the logged-in user
    }
  }, [isAuthenticated, currentUser]);

  // Scroll into view when editing data changes
  useEffect(() => {
    if (editingData && formsRef.current) {
      formsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [editingData]);

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="App">
      <Navbar currentUser={currentUser} logout={logout} /> {/* Add Navbar component */}
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg ">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/home" /> : <Login handleAuth={login} />
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/home" /> : <Register handleAuth={login} />
            }
          />
          <Route
            path="/home"
            element={
              isAuthenticated ? (
                <div>
                  <div className="grid md:grid-cols-2 gap-4 mt-10">
                    <Graph transactions={transactions} />
                    <div ref={formsRef}>
                      {isAuthenticated && (
                        <Forms
                          editingData={editingData}
                          setEditingData={setEditingData}
                          formData={formData}
                          setFormData={setFormData}
                          handleChange={handleChange}
                        />
                      )}
                    </div>
                  </div>
                  <Table
                    transactions={transactions}
                    setFormData={setFormData}
                    setEditingData={setEditingData}
                  />
                </div>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
