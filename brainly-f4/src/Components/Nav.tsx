import { ReactElement, useState } from "react";

interface BarcontentProps {
  items: { id: string; icon: ReactElement; label: string }[];

}



export function Sidebar({ items }: BarcontentProps) {
  const [activeItem, setActiveItem] = useState<string>("all-notes");



  const handleClick = (id: string) => {
    setActiveItem(id); // Sirf ek item active hoga
  };





  return (
    <div className="space-y-12 ml-8 mt-16">
      {items.map((item) => (
        <div
          key={item.id}
          className={`cursor-pointer p-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
            activeItem === item.id ? "text-black scale-105" : "text-gray-400"
          }`}
          onClick={() => handleClick(item.id)}
        >
          {item.icon}
          {item.label}
        </div>
      ))}
    </div>
  );
}
