import React, { useState } from "react";
import axios from "axios";
import { baseurl } from "../url";
import { Link, useNavigate } from "react-router-dom";

function Login({ handleAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${baseurl}/data/login`, { email, password });
      setMessage(res.data.message);
      if (res.status === 200) {
        localStorage.setItem("currentUser", JSON.stringify(res.data.user));
        handleAuth(res.data.user, true);
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setResetMessage("Passwords do not match.");
      return;
    }
    try {
      const res = await axios.post(`${baseurl}/data/reset`, { email, newPassword });
      setResetMessage(res.data.message);
      setShowResetForm(false);
    } catch (err) {
      console.error(err);
      setResetMessage(err.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="mt-8 p-5 bg-gray-50 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Login to Your Account</h2>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-400 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 text-sm mb-1">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-400 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition duration-200"
        >
          Login
        </button>

        <div className="text-center mt-3">
          <button
            onClick={() => setShowResetForm(true)}
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <div className="text-center mt-3">
          <Link to="/register">
            <button className="w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-400 transition duration-200">
              Create Account
            </button>
          </Link>
        </div>

        {message && (
          <div className="mt-3 text-center text-red-500">
            {message}
          </div>
        )}
      </div>

      {showResetForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative bg-white p-6 rounded-lg shadow-lg w-80">
            <h5 className="text-lg font-semibold mb-3 text-gray-700">Reset Password</h5>
            <button
              className="absolute top-1 right-2 text-xl text-gray-500 hover:text-red-500"
              onClick={() => setShowResetForm(false)}
            >
              &times;
            </button>

            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">New Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-400 focus:outline-none"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm text-gray-600 mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-400 focus:outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {resetMessage && (
              <div className="text-red-500 text-sm mb-3">
                {resetMessage}
              </div>
            )}

            <div className="flex justify-end">
              <button
                className="mr-2 px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={() => setShowResetForm(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition"
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
