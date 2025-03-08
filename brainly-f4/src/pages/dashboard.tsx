import { ReactElement, useState } from "react";
import { MenuIcon } from "../Icons/menuIcon";
import { AllNotes } from "../Icons/AllNote";
import { TweetIcon } from "../Icons/TweetsIcon";
import { YoutubeIcon } from "../Icons/YoutubIcon";
import { DocumentIcon } from "../Icons/DocumentsIcon";
import { LinkIcon } from "../Icons/LinkIcon";
import { OtherIcon } from "../Icons/OthefileIcon";
import {  Turtle, X } from "lucide-react";
import { CrossIcon } from "../Icons/CrossIcon";
import { BrainIcon } from "../Icons/BrainIcon";
import { Button1, Button2 } from "../Components/Button";
import { AddContentCard } from "../Components/AddContenCard";
import axios from "axios";
import { BarContent, Nav } from "../Components/Nav";





export function Dashboard(){


    const [isOpen, setIsOpen] = useState(false);
    const [visible, setvisible] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    embedCode: "",
    link: "",
  });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Ensure token exists
      const response = await axios.post("http://localhost:5000/api/content", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Content Added:", response.data);
      setIsOpen(false);
    } catch (error) {
      console.error("Error submitting content:", error);
    }
  };


    return <div className="">
        <div className="flex relative"> 
        <div
        className={`fixed top-0 left-0 h-full w-72 bg-white transform transition-transform duration-300 ease-in-out shadow-lg ${ isOpen ? "translate-x-0" : "-translate-x-full" }  `} >
                <div className="mt-12 md:mt-4 flex flex-col gap-2">
                        <BarContent startLoglo={<AllNotes/>} indentifier="All Notes" />
                        <BarContent startLoglo={<TweetIcon/>} indentifier="Tweets" />
                        <BarContent startLoglo={<YoutubeIcon/>} indentifier="Youtube" />
                        <BarContent startLoglo={<DocumentIcon/>} indentifier="Documents" />
                        <BarContent startLoglo={<LinkIcon/>} indentifier="Link" />
                        <BarContent startLoglo={<OtherIcon/>} indentifier="Others" />
                </div>
        </div> 
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-7 left-7 bg-white border text-white p-2 rounded-md focus:outline-none"
                >
                {isOpen ? <CrossIcon /> : <MenuIcon />}
            </button>        
        </div>
            <div className=" hidden md:block fixed top-0 left-0 h-screen w-72 bg-white border-r z-40 transition-transform duration-300 ease-in-out sidebar-container -translate-x-full md:translate-x-0">
                <div className=" h-screen w-72 fixed top-0 left-0 bg-white border border-r-gray-200 border-t-0">
                    <div className="hidden md:block">
                        <Nav/>
                    </div>
                    
                </div>
            </div>
            <div className="flex-1 bg-[#f8fbfc] min-h-screen p-8 md:pl-80 transition-all">
                <div className="flex justify-center items-center md:hidden">
                    <div className="flex items-center">
                        <div className="text-4xl text-[#4f45e4] pr-1.5"> <BrainIcon/> </div>
                        <div className="text-xl font-medium">Second Brain</div>
                    </div>
                </div>    
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold md:mt-0 mt-18"> All-Notes</h1>
                    <div className="block md:hidden">
                        <div className="flex gap-3 mb-12">
                            
                        </div>
                    </div>
                    <div className="">
                        <div className="flex flex-col items-center p-4">
                        <div>
                        <button onClick={() => setvisible(true)} className=" hidden md:block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700" >
                            Add Content
                        </button>
                        <button onClick={() => setvisible(true)} className=" block  md:hidden bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                            Add
                        </button>
                        </div>
                        {visible && (
                                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                                    <div className="flex justify-between ">
                                        <h2 className="text-xl font-bold mb-4">Add New Content</h2>
                                        <button onClick={() => setvisible(false)} className="bg-white border text-white px-2 py-2 rounded-md hover:bg-white mb-8 ">
                                                <CrossIcon/>
                                        </button>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                    <input type="text" name="title" placeholder="Title" className="w-full p-2 border rounded-lg mb-2" onChange={handleChange} required />
                                    <textarea name="description" placeholder="Description" className="w-full p-2 border rounded-lg mb-2" onChange={handleChange} required />
                                    <input type="text" name="embedCode" placeholder="Embed Code (YouTube/Twitter)" className="w-full p-2 rounded-lg border mb-2" onChange={handleChange} />
                                    <input type="text" name="link" placeholder="External Link" className="w-full p-2 border mb-2 rounded-lg" onChange={handleChange} />
                                    <div className="flex justify-between">
                                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                        Submit
                                        </button>
                                        
                                    </div>
                                    </form>
                                </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div></div>



            </div> 
        </div>
}

