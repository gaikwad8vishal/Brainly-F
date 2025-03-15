import { useState, useEffect } from "react";
import { MenuIcon } from "../Icons/menuIcon";
import { AllNotes } from "../Icons/AllNote";
import { TweetIcon } from "../Icons/TweetsIcon";
import { YoutubeIcon } from "../Icons/YoutubIcon";
import { DocumentIcon } from "../Icons/DocumentsIcon";
import { LinkIcon } from "../Icons/LinkIcon";
import { CrossIcon } from "../Icons/CrossIcon";
import { BrainIcon } from "../Icons/BrainIcon";
import axios from "axios";
import { ShareIcon } from "../Icons/ShareIcon";
import { DeleteIcon } from "../Icons/DeleteIcon"
import { Sidebar } from "../components/Nav";
import { useNavigate } from "react-router-dom";

 

interface Note {
  id: string;
  title: string;
  description: string;
  link: string;
  embedCode?: string;
}



export function Dashboard(){

    
    const [isOpen, setIsOpen] = useState(false);
    const [notes, setNotes] = useState<Note[]>([]);
    const [formData, setFormData] = useState({ title: "", description: "", link: "" });
    const [showModal, setShowModal] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all-notes");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/signin");  
    };
    
    useEffect(() => {
      fetchUserContent();
    }, []);

    useEffect(() => {
      (window as any).twttr?.widgets?.load();
    }, [notes]);
    

    const fetchUserContent = async () => {
      try {
        const response = await axios.get("http://localhost:3000/content/all-content", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setNotes(response.data as any);
      } catch (error) {
        console.error("Error fetching user content:", error);
      }
    };


    const handleChange = (e:any) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      // Disable submit button while processing
      if (isSubmitting) return;
      setIsSubmitting(true);
    
      // Input validation
      if (selectedType !== "other" && !formData.link.trim()) {
        alert("Please enter a valid link!");
        setIsSubmitting(false);
        return;
      }
    
      if (!formData.title.trim() || !formData.link.trim()) {
        alert("Please enter a title and link!");
        setIsSubmitting(false);
        return;
      }
    
      if (["tweet", "youtube", "document", "link"].includes(selectedType) && !formData.link.trim()) {
        alert("Please provide a valid link for this content type.");
        setIsSubmitting(false);
        return;
      }
    
      if (formData.title.length > 18) {
        alert("Title should be a maximum of 18 characters!");
        setIsSubmitting(false);
        return;
      }
    
      const embedCode = generateEmbedCode(formData.link);
    
      const newNote = {
        title: formData.title,
        description: formData.description.trim(),
        link: formData.link || null,
        embedCode
      };
    
      try {
        const response = await axios.post<{ id: string; title: string; description?: string; link?: string; embedCode?: string; }>(
          "http://localhost:3000/content/add",
          newNote,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
    
        console.log("Response Data:", response.data);
    
        setNotes((prevNotes) => [...prevNotes, response.data as Note]);
    
        // Reset form and close modal
        setFormData({ title: "", description: "", link: "" });
        setShowModal(false);
      } catch (error) {
        console.error("Error adding note:", error);
      }
    
      setIsSubmitting(false);
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
    const handleCategoryChange = (category: string) => {
      setSelectedCategory(category);
    };
    
    
    const items = [
      { id: "all-notes", icon: <AllNotes />, label: "All Notes", onClick: () => handleCategoryChange("all-notes") },
      { id: "tweets", icon: <TweetIcon />, label: "Tweets", onClick: () => handleCategoryChange("tweets") },
      { id: "youtube", icon: <YoutubeIcon />, label: "Youtube", onClick: () => handleCategoryChange("youtube") },
      { id: "documents", icon: <DocumentIcon />, label: "Documents", onClick: () => handleCategoryChange("documents") },
      { id: "link", icon: <LinkIcon />, label: "Link", onClick: () => handleCategoryChange("link") },
    ];
    
    const handleShare = (id: string, link?: string) => {
      if (!link) {
        console.error("No link available to share");
        return;
      }
    
      navigator.clipboard.writeText(link)
        .then(() => setCopiedId(id))
        .catch((err) => console.error("Failed to copy:", err));
    
      // Reset copied state after 2 seconds
      setTimeout(() => setCopiedId(null), 2000);
    };
    



      const generateEmbedCode = (linkOrFile: string, fileType?: string): string => {
        if (fileType === "document") {
          return `<a href="${linkOrFile}" target="_blank" class="text-blue-600 underline">📄 Open Document</a>`;
        } else if (linkOrFile.includes("youtube.com") || linkOrFile.includes("youtu.be")) {
          const videoId = linkOrFile.split("v=")[1]?.split("&")[0] || linkOrFile.split("/").pop();
          return `<iframe width="100%" height="200" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
        } else if (linkOrFile.includes("x.com") || linkOrFile.includes("twitter.com")) {
          return `<blockquote class="twitter-tweet"><a href="${linkOrFile}"></a></blockquote><script async src="https://platform.twitter.com/widgets.js"></script>`;
        }
      
        // For normal website links
        return `<a href="${linkOrFile}" target="_blank" class=" mb-4 text-blue-600 underline">open link</a>`;
      };
      

      const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(e.target.value);
      };
      

      const filteredNotes = notes.filter((note) => {
        if (!note.embedCode || typeof note.embedCode !== "string") return false; // Ensure embedCode exists
        const embedCode: string = note.embedCode;
      
        if (selectedCategory === "all-notes") return true;
        if (selectedCategory === "youtube") return embedCode.includes("youtube.com") || embedCode.includes("youtu.be");
        if (selectedCategory === "tweets") return embedCode.includes("twitter.com") || embedCode.includes("x.com");
        if (selectedCategory === "documents") return embedCode.includes("Open Document");
        if (selectedCategory === "link") return embedCode.includes("Open Link");
      
        return false;
      });

      

    return <div className="">
        <div className="flex relative"> 
        <div
        className={`fixed top-0 left-0 h-full w-72 bg-white transform transition-transform duration-300 ease-in-out shadow-lg ${ isOpen ? "translate-x-0" : "-translate-x-full" }  `} >
                <div className="mt-12 md:mt-4 flex flex-col gap-2">
                        <Sidebar items={items}/>
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
                    <a className="flex items-center justify-center gap-2 mt-12" data-discover="true"> 
                      <BrainIcon/>
                      <span className="text-2xl font-semibold">Second Brain</span>
                    </a>
                        <Sidebar items={items}/>
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
                <div className="">
                <div className="  mb-6">
                    <h1 className="text-3xl font-semibold md:mt-0 mt-18"> All-Notes...</h1>
                    <div className=" "> 
                      <div className="flex justify-end gap-4">
                      <button 
                      onClick={() => {
                        setShowModal(true);
                        setIsSubmitting(false); // Reset button state when opening modal
                      }} 
                      className="bg-purple-600 hover:bg-purple-800 hidden lg:block text-white ml-96 px-4 py-2 rounded"
                    >
                      Add Content
                    </button>

                        <button onClick={handleLogout} className=" hidden lg:block hover:text-red-400 text-red-800 font-bold px-4 py-2 rounded-md ">Logout</button>
                      </div>
                      <div className="flex justify-end gap-4">
                        <button onClick={handleLogout} className=" block lg:hidden  text-red py-2 px-5 rounded-md hover:bg-red-600">L</button>
                        <button onClick={() => {
                        setShowModal(true); 
                        setIsSubmitting(false);}} className="bg-purple-800 hover:bg-purple-800 lg:hidden  text-white px-4 py-2 rounded">Add</button>
                      </div>
                    </div>
                    {showModal && (
                        <div className="fixed inset-0 bg-gray-900  bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <div className=" flex justify-between mb-6">
                                <h2 className="text-xl font-bold ">Add New Content</h2>
                                <div className="gap-4">
                                    <button className="  rounded hover:bg-blue-300 p-2" onClick={() => setShowModal(false)} >
                                        <CrossIcon/>
                                    </button>
                                </div>
                            </div>
                            <select
                              className="w-full p-2 border rounded-md mb-4"
                              value={selectedType}
                              onChange={handleTypeChange}
                            >
                              <option value="">-- Select Type --</option>
                              <option value="tweet">Tweet</option>
                              <option value="youtube">YouTube</option>
                              <option value="document">Document</option>
                              <option value="link">Link</option>
                              <option value="other">Other</option>
                            </select>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3 ">
                                <div className="flex rounded border focus-within:ring-inset focus-within:border-[2px] focus-within:border-blue-900   justiy-between  ">
                                    <input name="title"  required maxLength={18} placeholder="Title(max 18 char)" value={formData.title} onChange={handleChange} className=" focus:outline-none  pr-28 focus:ring-0 p-2 "/>
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
                                <button 
                                      type="submit" 
                                      className={`p-2 rounded text-white ${
                                        isSubmitting ? "bg-purple-800 cursor-not-allowed" : "bg-purple-800"
                                      }`}
                                      disabled={isSubmitting}
                                    >
                                      {isSubmitting ? "Submitting..." : "Submit"}
                                </button>
                            </form>
                        </div>
                    </div>
                    )}
                    <div>
                        
                    </div>
                </div>
                

            <div className="">
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNotes.map((note, index) => (
                <div key={index} className="bg shadow-lg p-4 rounded-lg mb-4">
                  <div className="flex justify-between">
                    <h3 className="text-2xl font-bold flex">{note.title}</h3>
                    <div className="flex gap-4 relative">
                    <button onClick={() => handleShare(note.id, note.link)}>
                        <ShareIcon />
                      </button>
                      {copiedId === note.id && (
                        <p className="absolute top-8 left-0 bg-green-400 text-black px-3 py-1 rounded text-sm">
                          Copied!
                        </p>
                      )}

                      <button onClick={() => handleDelete(note.id)}>
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                  <p>{note.description}</p>
                  <div className="mt-2">
                    {note.embedCode && <div dangerouslySetInnerHTML={{ __html: note.embedCode }} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
    </div> 
</div>
}