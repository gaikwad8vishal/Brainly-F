import { ReactElement, useState, useEffect } from "react";
import { MenuIcon } from "../Icons/menuIcon";
import { AllNotes } from "../Icons/AllNote";
import { TweetIcon } from "../Icons/TweetsIcon";
import { YoutubeIcon } from "../Icons/YoutubIcon";
import { DocumentIcon } from "../Icons/DocumentsIcon";
import { LinkIcon } from "../Icons/LinkIcon";
import { OtherIcon } from "../Icons/OthefileIcon";
import { CrossIcon } from "../Icons/CrossIcon";
import { BrainIcon } from "../Icons/BrainIcon";
import axios from "axios";
import { BarContent, Nav } from "../Components/Nav";
import { ShareIcon } from "../Icons/ShareIcon";
import { DeleteIcon } from "../Icons/DeleteIcon"

 




export function Dashboard(){

    
    const [isOpen, setIsOpen] = useState(false);
    const [notes, setNotes] = useState([]);
    const [formData, setFormData] = useState({ title: "", description: "", link: "" });
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [copiedId, setCopiedId] = useState<number | null>(null);

 
    useEffect(() => {
      fetchUserContent();
    }, []);

    const fetchUserContent = async () => {
      try {
        const response = await axios.get("http://localhost:3000/content/all-content", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        //@ts-ignore
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching user content:", error);
      }
    };


    const handleChange = (e:any) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.link.trim()) return;
        
        const embedCode = generateEmbedCode(formData.link); // Convert to embed code
      
        if (formData.title.length > 18) {
          alert("Title should be a maximum of 15 characters!");
          return;
        }
      
        const newNote = {
          title: formData.title,
          description: formData.description.trim(),
          link: formData.link,
          embedCode,
        };
      
        try {
          const response = await axios.post("http://localhost:3000/content/add", newNote, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Make sure user is authenticated
            },
          });
      
          //@ts-ignore
          setNotes([...notes, response.data]); // Update state with newly saved note
          setFormData({ title: "", description: "", link: "" }); // Reset form
          setShowModal(false); // Close modal
        } catch (error) {
          console.error("Error adding note:", error);
        }
      };
      
      const handleDelete = async (id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this content?");
        if (!confirmDelete) return;
    
        try {
          await axios.delete(`http://localhost:3000/content/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, 
            },
          });
    
    
          // Remove from frontend state
          setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
          alert("Content deleted successfully!");
        } catch (error) {
          console.error("Error deleting content:", error);
          alert("Failed to delete content!");
        }
    };
    

      const handleShare = (id: number, link: string) => {
        navigator.clipboard.writeText(link); // Copy to clipboard
        setCopiedId(id); // Show "Copied!" message
      
        setTimeout(() => setCopiedId(null), 2000); // gayab after 2s
      };
  
    // Convert link to embed code
    const generateEmbedCode = (link) => {
        if (link.includes("youtube.com") || link.includes("youtu.be")) {
          const videoId = link.split("v=")[1]?.split("&")[0] || link.split("/").pop();
          return `<iframe width="100%" height="200" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
        } else if (link.includes("twitter.com")) {
          return `<blockquote class="twitter-tweet"><a href="${link}"></a></blockquote><script async src="https://platform.twitter.com/widgets.js"></script>`;
        } 
        // If it's a normal link ( website, document, etc.)
        return `<a href="${link}" target="_blank" class="text-blue-600 underline">🔗 Open Link</a>`; 
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
                        <div className="text-4xl text-[#a11677] pr-1.5"> <BrainIcon/> </div>
                        <div className="text-xl font-medium">Second Brain</div>
                    </div>
                </div>    
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold md:mt-0 mt-18"> All-Notes</h1>
                    <button onClick={() => setShowModal(true)} className="bg-blue-600  hidden lg:block  text-white ml-96 px-4 py-2 rounded">Add Content</button>
                    <button onClick={() => setShowModal(true)} className="bg-blue-600  lg:hidden  text-white ml-72 px-4 py-2 rounded">Add</button>
                    {showModal && (
                        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <div className=" flex justify-between mb-6">
                                <h2 className="text-xl font-bold ">Add New Content</h2>
                                <div className="gap-4">
                                    <button className="  rounded hover:bg-blue-300 p-2" onClick={() => setShowModal(false)} >
                                        <CrossIcon/>
                                    </button>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3 ">
                                <div className="flex rounded border focus-within:ring-inset focus-within:border-[2px] focus-within:border-blue-900   justiy-between  ">
                                    <input name="title" maxLength={"18"} placeholder="Title(max 15 char)" value={formData.title} onChange={handleChange} className=" focus:outline-none  pr-28 focus:ring-0 p-2 "/>
                                    <div className="flex gap-4">
                                    <span
                                        className={` mt-2 text-sm ${
                                        formData.title.length >= 18 ? "text-red-500 font-bold" : "text-gray-500"
                                        }`}
                                    >
                                        {formData.title.length}/18
                                    </span>
                                    </div>
                                </div>

                                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 rounded"/>
                                <input name="link" placeholder="Paste link" value={formData.link} onChange={handleChange} className="border p-2 rounded"/>
                                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                    )}
                    <div>
                        
                    </div>
                </div>
                
            <div className="">
            <div className="mt-6  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notes.map((note, index) => (
                    <div key={index} className="bg-white shadow-lg p-4 rounded mb-4 ">
                        <div className="flex justify-between">
                        <h3 className="text-lg font-bold flex">
                        {note.title}
                        </h3>
                        <div className="flex gap-4"> 
                            <div className="relative">
                                <button onClick={() => handleShare(note.id, note.link)}>
                                    <ShareIcon/>
                                </button>
                                {copiedId === note.id && (
                                    <p className=" flex absolute top-8 left-0 bg-green-400 text-black-700 px-3 py-1 rounded text-sm">
                                    Copied!
                                    </p>
                                )}
                            </div>
                            <div className="relative">
                            <button onClick={() => handleDelete(note.id)} >
                                <DeleteIcon/>
                            </button>
                            </div>
                        </div>
                    </div>
                    
                    <p>{note.description}</p>
                    <div className=" mt-2 ">
                        {note.embedCode && <div dangerouslySetInnerHTML={{ __html: note.embedCode }} />}
                    </div>
                </div>
                ))}
            </div>
        </div>
    </div> 
</div>
}

