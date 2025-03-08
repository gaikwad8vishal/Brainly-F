import { ReactElement } from "react";
import { MenuIcon } from "../Icons/menuIcon";
import { AllNotes } from "../Icons/AllNote";
import { TweetIcon } from "../Icons/TweetsIcon";
import { YoutubeIcon } from "../Icons/YoutubIcon";
import { DocumentIcon } from "../Icons/DocumentsIcon";
import { LinkIcon } from "../Icons/LinkIcon";
import { OtherIcon } from "../Icons/OthefileIcon"


export function Nav(){
    return <div className="mt-12 md:mt-4 flex flex-col gap-2">
                            <BarContent startLoglo={<AllNotes/>} indentifier="All Notes" />
                            <BarContent startLoglo={<TweetIcon/>} indentifier="Tweets" />
                            <BarContent startLoglo={<YoutubeIcon/>} indentifier="Youtube" />
                            <BarContent startLoglo={<DocumentIcon/>} indentifier="Documents" />
                            <BarContent startLoglo={<LinkIcon/>} indentifier="Link" />
                            <BarContent startLoglo={<OtherIcon/>} indentifier="Others" />
                        </div>
}




interface BarcontentProps{
    startLoglo : ReactElement;
    indentifier: string;
}


export function BarContent(props:BarcontentProps){

    return <div className="cursor-pointer p-2 rounded-lg">
            <div className="ml-10 flex items-center gap-4 mt-10         cursor-pointer transition-all duration-300 text-gray-400 hover:text-black hover:scale-105">
        {props.startLoglo}
        {props.indentifier}
      </div>
    </div>
}





