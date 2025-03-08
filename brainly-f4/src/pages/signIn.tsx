import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const SigninForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const response = await axios.post("http://localhost:3000/signin", {
        username,
        password,
      });

      setMessage(response.data.message);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard"); // Store JWT token
      setUsername("");
      setPassword("");
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Signin failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
        <a href="/" >signup</a>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Sign in</h2>
        <form onSubmit={handleSignin} className="flex flex-col">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded mb-2"
            required
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded mb-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white py-2 rounded">
            Sign in
          </button>
        </form>
        {message && <p className="mt-3 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default SigninForm;
