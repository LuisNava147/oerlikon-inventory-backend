import { Laptop, Monitor, Mouse, Keyboard, HardDrive, Smartphone, HelpCircle, Printer, LaptopMinimal, Headset, SquarePower, CircleQuestionMark } from "lucide-react";

export default function PrinterIcon({type}:{type:string}){
    if(!type)return <HelpCircle size={20} className="text-slate-400" />

    const t = type.toLowerCase();

    if(t.includes("printer"))
    return <Printer size={30} className="text-red-600"/>
   
    return <CircleQuestionMark size={30} className="text-red-600"/>
}