import { Laptop, Monitor, Mouse, Keyboard, HardDrive, Smartphone, HelpCircle, Printer, LaptopMinimal } from "lucide-react";

export default function DeviceIcon({type}:{type:string}){
    if(!type)return <HelpCircle size={20} className="text-slate-400" />

    const t = type.toLowerCase();

    if(t.includes("laptop")||t.includes("laptops"))
    return <Laptop size={20} className="text-red-600"/>
    if(t.includes("desktop")||t.includes("desktops")|| t.includes("computadora")|| t.includes("pc"))
    return <LaptopMinimal size={20} className="text-red-600"/>
    if(t.includes("monitor")|| t.includes("pantalla"))
    return <Monitor size={20} className="text-red-600"/>
    if(t.includes("mouse")||t.includes("mouses"))
    return <Mouse size={20} className="text-red-600"/>
    if(t.includes("teclado")||t.includes("teclados")|| t.includes("keyboard"))
    return <Keyboard size={20} className="text-red-600"/>
    if(t.includes("docking")||t.includes("dockings"))
    return <HardDrive size={20} className="text-red-600"/>

    return <Monitor size={20} className="text-red-600"/>
}