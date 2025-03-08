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





export function Dashboard(){


    const [isOpen, setIsOpen] = useState(true);
    const [visible, invisible] = useState(true);

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

                    </div>
                    <div className="mt-12 md:mt-4 flex flex-col gap-2">
                        <BarContent startLoglo={<AllNotes/>} indentifier="All Notes" />
                        <BarContent startLoglo={<TweetIcon/>} indentifier="Tweets" />
                        <BarContent startLoglo={<YoutubeIcon/>} indentifier="Youtube" />
                        <BarContent startLoglo={<DocumentIcon/>} indentifier="Documents" />
                        <BarContent startLoglo={<LinkIcon/>} indentifier="Link" />
                        <BarContent startLoglo={<OtherIcon/>} indentifier="Others" />
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
                           < Button2 title={"share"} />
                           < Button2 title={"Add"}/>
                        </div>
                    </div>
                    <div className=" hidden md:block">
                        <div className="flex gap-3 mb-12">
                            <Button2 title={"Add Content"}/>
                            <Button2 title={"Share Brain"}/>
                        </div>
                    </div>
                </div>

                <div></div>



            </div> 
        </div>
}


interface BarcontentProps{
    startLoglo : ReactElement;
    indentifier: string;
}


function BarContent(props:BarcontentProps){

    return <div className="cursor-pointer p-2 rounded-lg">
            <div className="ml-10 flex items-center gap-4 mt-10         cursor-pointer transition-all duration-300 text-gray-400 hover:text-black hover:scale-105">
        {props.startLoglo}
        {props.indentifier}
      </div>
    </div>
}