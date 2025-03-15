
import {  useState } from "react";
import axios from "axios";


export function AddContentCard(){
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        embedCode: "",
        link: ""
      });

      const handleChange = (e:any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
          const token = localStorage.getItem("token"); // Assuming token is stored after login
          const response = await axios.post("http://localhost:5000/addContent", formData, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log("Content added successfully", response.data);
          alert("Content added successfully");
        } catch (error) {
          console.error("Error adding content", error);
          alert("Failed to add content");
        }
      };
    

    return <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center transition-all duration-300">
            <h2 className="text-xl font-bold mb-4">Add New Content</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        ></textarea>
        <input
          type="text"
          name="embedCode"
          placeholder="Embed Code (YouTube/Twitter)"
          value={formData.embedCode}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="text"
          name="link"
          placeholder="Link"
          value={formData.link}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
}