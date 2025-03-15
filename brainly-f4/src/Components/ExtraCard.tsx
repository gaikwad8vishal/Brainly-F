import { ReactElement } from "react";




interface ExtrawalaCardprops{
    TopIcon? : ReactElement;
    Heading?: string;
    about?: string;
}




export function ExtraCard( props:ExtrawalaCardprops){

    return <div className="bg-white p-8 rounded-xl border border-gray-200">
                <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                    {props.TopIcon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2"> 
                    {props.Heading}
                </h3>   
                <p className="text-gray-600">
                    {props.about}
                </p>
            </div>
}