import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../Icons/BrainIcon";
import { UserIcon } from "../Icons/UserIcon";
import { RightarrowIcon } from "../Icons/RightarrowIcon";
import { LockIcon } from "../Icons/lockIcon";


const SigninForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate();

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/signin", {
        username,
        password,
      });
      //@ts-ignore
      setMessage(response.data.message);
      //@ts-ignore

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard"); // Store JWT token
      setUsername("");
      setPassword("");
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Signin failed");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <a className="flex items-center justify-center gap-2 mb-8" href="/" data-discover="true"> 
                <BrainIcon/>
                <span className="text-2xl font-semibold">Second Brain</span>
              </a>
              <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
              <p className="mt-2 text-center text-sm text-gray-600" >Or 
                <a className="font-medium text-purple-600 hover:text-purple-800" data-discover="true" href="/signup"> create a new account</a>
              </p>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
                <form onSubmit={handleSignin} className=" space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserIcon/>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <LockIcon/>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="appearance-none block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                  <button 
                    type="submit" 
                    disabled={isLoading} // Disable button when loading
                    className={`w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                      isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-800"
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-800`}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                    <RightarrowIcon/>
                  </button>
                  </div>
                </form>
              </div>
            </div>
            {message && <p className="mt-3 text-center text-red-500">{message}</p>}
          </div>
        </div>
  );
};

export default SigninForm;

