'use client';
import Image from "next/image";
import Header from "./_components/Header";
import Sidebar from "./_components/_sidebar/Sidebar";
import { usePathname } from "next/navigation";

export default function layoutDashboard({children,locations}: Readonly<{
    children: React.ReactNode;
    locations: React.ReactNode;
   }>){
    const path = usePathname()
return(
    <div className=" fixed inset-0 h-full w-full bg-orange-50 flex flex-col overflow-hidden">
    <Header/>
    
    <div className="flex flex-row flex-1 overflow-hidden items-center">
    <Sidebar/>

    <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
        <div className="max-w-[1920px] mx-auto h-full">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-full">
            <div className="flex flex-col h-full overflow-y-auto pr-2">
            {children}
            {path == "/dashboard" ? locations:null}
        </div>
        <div className="flex flex-col h-full overflow-y-auto pl-2">
            {locations}
        </div>
            </div>
        </div>
        
    </main>
         
    </div>
    </div>
);
}