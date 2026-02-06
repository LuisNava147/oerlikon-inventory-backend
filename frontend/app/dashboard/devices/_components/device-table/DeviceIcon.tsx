import { Laptop, Monitor, Mouse, Keyboard, HardDrive, Smartphone, HelpCircle, Printer, LaptopMinimal, Headset, SquarePower, CircleQuestionMark } from "lucide-react";

export default function DeviceIcon({type}:{type:string}){
    if(!type)return <HelpCircle size={20} className="text-slate-400" />

    const t = type.toLowerCase();

    if(t.includes("laptop")||t.includes("laptops"))
    return <Laptop size={30} className="text-purple-600"/>
    if(t.includes("desktop")||t.includes("desktops")|| t.includes("computadora")|| t.includes("pc"))
    return <LaptopMinimal size={30} className="text-red-600"/>

    return <CircleQuestionMark size={30} className="text-red-600"/>
}