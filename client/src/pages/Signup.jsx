import { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);

      toast.success("Registration Successful  Please Login");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      toast.error(err.response?.data?.message || "Signup Failed ");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 to-red-500 p-4">
      <Motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Signup</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <select
            className="w-full p-3 border rounded-lg"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <Motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold"
          >
            Signup
          </Motion.button>

        </form>

        <p className="text-center mt-4">
          Already have account?{" "}
          <Link to="/" className="text-pink-600 font-semibold">
            Login
          </Link>
        </p>
      </Motion.div>
    </div>
  );
}
