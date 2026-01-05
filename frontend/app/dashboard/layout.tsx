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
    <div className="h-screen w-screen bg-orange-50 flex flex-col overflow-hidden">
    <Header/>
    
    <div className="flex flex-row items-center">
    <Sidebar/>
    {children}
    
    
        <div className="flex flex-col h-full overflow-y-auto pr-2">
            
        
        </div>
        
    
    
         
    </div>
    </div>
);
}