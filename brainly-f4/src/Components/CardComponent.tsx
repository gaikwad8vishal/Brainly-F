import { useState } from "react";
import { CrossIcon } from "../Icons/CrossIcon";

export default function NotesApp() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "", link: "" });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.link.trim()) return;

    const embedCode = generateEmbedCode(formData.link); // Convert link to embed

    setNotes([...notes, { ...formData, embedCode }]); // Store note
    setFormData({ title: "", description: "", link: "" }); // Reset form
    setShowModal(false); // Close modal
  };

  // Convert link to embed code
  const generateEmbedCode = (link) => {
    if (link.includes("youtube.com") || link.includes("youtu.be")) {
      const videoId = link.split("v=")[1]?.split("&")[0] || link.split("/").pop();
      return `<iframe width="100%" height="200" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    } else if (link.includes("twitter.com")) {
      return `<blockquote class="twitter-tweet"><a href="${link}"></a></blockquote><script async src="https://platform.twitter.com/widgets.js"></script>`;
    }
    return ""; // Return empty if not supported
  };

  return (
    <div className="p-6">
      <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded">Add Content</button>

      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Content</h2>
            <button onClick={() => setShowModal(false)} >
              <CrossIcon/>
            </button>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="border p-2 rounded"/>
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 rounded"/>
              <input name="link" placeholder="Paste YouTube/Twitter link" value={formData.link} onChange={handleChange} className="border p-2 rounded"/>
              <button type="submit" className="bg-blue-600 text-white p-2 rounded">Submit</button>
            </form>
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note, index) => (
          <div key={index} className="bg-white shadow-lg p-4 rounded">
            <h3 className="text-lg font-bold">
              <div>
                {note.title}
              </div>
              <div> 
                <CrossIcon/>
              </div>
            </h3>
            <p>{note.description}</p>
            
            {note.embedCode && <div dangerouslySetInnerHTML={{ __html: note.embedCode }} />}
          </div>
        ))}
      </div>
    </div>
    
  );
}
