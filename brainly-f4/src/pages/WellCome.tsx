import { Button2, Button1 } from "../Components/Button";
import { ExtrawalaCard } from "../Components/extrawalaCard";
import { BrainIcon } from "../Icons/BrainIcon";
import { CloudcrackIcon } from "../Icons/CloudcrackIcon";
import { RightarrowIcon } from "../Icons/RightarrowIcon";
import { SamartAiIcon } from "../Icons/smartAiIcon";
import { CrackIcon } from "../Icons/SparkIcon";


export function WellCome(){
    return <div>
            <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <BrainIcon/>
                            <span className="text-xl font-semibold">Second Brain</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <Button1/>
                            <Button2 hidden="hidden  md:block" title={"Get Started"}/>
                        </div>
                    </div>

                </div>
            </nav>
            <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            Your Digital Second Brain for
                            <span className="text-purple-600"> Everything</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"> 
                        Capture, organize, and never lose your valuable content. From tweets to documents, everything in one place.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Button2 title={"Get Started Free"} endIcon={<RightarrowIcon/>}/>
                        </div>
                    </div>
                </div>
                <div className="mt-16 rounded-2xl overflow-hidden z-50 border border-gray-200">
                <img src="https://i.imgur.com/2v3tk6s.png" className="w-full"/> 
            </div>
            </div>
            <div className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" >
                    <div className="text-center mb-16">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Everything you need in one place
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Powerful features to help you capture and organize your digital life.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ExtrawalaCard TopIcon={<SamartAiIcon/>}  about="Automatically categorize and tag your content for easy retrieval." Heading="Smart Organization" />
                        <ExtrawalaCard TopIcon={<CloudcrackIcon/>}  about="Find anything in seconds with Embeddings." Heading="Youtube and Twitter" />
                        <ExtrawalaCard TopIcon={<CrackIcon/>}  about="Save content from anywhere." Heading="Save Anything" />
                    </div>
                </div>
            </div>
            <div className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-purple-600 rounded-2xl p-12 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Ready to organize your digital life?
                        </h2>  
                        <p className="text-indigo-100 mb-8 max-w-2xl mx-auto"> 
                            Join thousands of users who have transformed their productivity with Second Brain.
                        </p> 
                        <Button2 title={"Get Started Now "} endIcon={<RightarrowIcon/>} />
                    </div>
                </div>
            </div>
            <footer className="bg-gray-50 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                        <div className="flex items-center gap-2 mb-4"> 
                            <BrainIcon/>
                            <span className="font-semibold">Second Brain</span>
                        </div>
                        <p className="text-gray-600 text-sm">Your digital life, organized with us!</p>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
                        Designed and Developed by The Vishal Gaikwad
                    </div>
                </div>
            </footer>
        </div>
}

