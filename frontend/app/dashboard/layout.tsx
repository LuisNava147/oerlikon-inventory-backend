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
    const isDashboardHome = path === '/dashboard'
return(
    <div className="flex flex-col h-screen w-full bg-orange-50 lg:overflow-hidden overflow-auto">
    <Header/>
    
    <div className="flex flex-1 lg:overflow-hidden overflow-visible">
    <Sidebar/>

    <main className="flex-1 p-4 md:p-6 bg-slate-50 lg:overflow-hidden overflow-visible">
        <div className="max-w-[1920px] m-auto h-full">
            <div className={
                isDashboardHome ? "grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-full"
                : "flex flex-col h-full w-full"
            }>
                <div className={`flex flex-col h-full overflow-y-auto no-scrollbar pb-10 
                ${isDashboardHome ? "pr-0 lg:pr-2": "w-full"}`}>
                    {children}
                </div>
                {isDashboardHome && (
                    <div className="flex flex-col h-full overflow-y-auto pl-0 lg:pl-2 no-scrollbar pb-24 lg:pb-10">
                    {locations}
                </div>
                )}
                
            </div>
        </div>
    </main>
    
    </div>
    </div>
);
}