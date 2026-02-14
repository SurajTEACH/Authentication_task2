import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", form);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);

      toast.success("Login Successful....");

      setTimeout(() => {
        if (data.user.role === "admin") {
          window.location.href = "https://portfolio-com-brown.vercel.app/";
        } else {
          window.location.href = "https://surajkumarshah.netlify.app";
        }
      }, 1500);

    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
      <Motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <Motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold"
          >
            Login
          </Motion.button>

        </form>

        <p className="text-center mt-4">
          Don’t have account?{" "}
          <Link to="/signup" className="text-indigo-600 font-semibold">
            Signup
          </Link>
        </p>
      </Motion.div>
    </div>
  );
}
