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

    <main className="flex-1 overflow-y-auto p-6 w-full">
        <div className="max-w-7xl mx-auto">
            {children}
            {path == "/dashboard" ? locations:null}
        </div>
    </main>
         
    </div>
    </div>
);
}