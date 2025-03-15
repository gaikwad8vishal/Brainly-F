import { JSX, ReactElement } from "react"
import { jsx } from "react/jsx-runtime";





export function Button1(){

    return <a href="/signin" data-discover="true">
        <div className="block md:hidden">
            <button className="bg-purple-600 text-white hover:bg-purple-800 flex items-center justify-center rounded-lg hover:cursor-pointer transition-all duration-100 ease-in-out font-light p-2 px-4 text-sm font-medium">
                <span aria-label="Log in">Log in</span>
            </button>
        </div>
        <div className="hidden md:block">
            <button className="px-4 py-2 cursor-pointer text-purple-600 hover:text-purple-800 font-medium">
                Log in
            </button>
        </div>
    </a>
}



interface Button2props{
    title:String;
    endIcon?: ReactElement;
    startIcon?: ReactElement
    hidden?: string

}

export function Button2( props:Button2props ): JSX.Element {

    return <a href="/signup">
        <div className={props.hidden}>
            <div  className="bg-purple-600 text-white hover:bg-purple-800 flex items-center justify-center rounded-lg hover:cursor-pointer transition-all duration-100 ease-in-out font-light p-2 px-4 text-sm font-medium">
                <span>{props.title}</span>
                {props.endIcon}
            </div>
        </div>
    </a>

}