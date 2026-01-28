import { Laptop, Monitor, Mouse, Keyboard, HardDrive, Smartphone, HelpCircle, Printer, LaptopMinimal, Headset, SquarePower, CircleQuestionMark, Phone, Tablet } from "lucide-react";

export default function MobileIcon({type}:{type:string}){
    if(!type)return <HelpCircle size={20} className="text-slate-400" />

    const t = type.toLowerCase();

    if(t.includes("phone") || t.includes("celular"))
    return <Smartphone size={30} className="text-red-600"/>
    if(t.includes("ipad") || t.includes("tablet"))
    return <Tablet size={30} className="text-red-600" />

    return <CircleQuestionMark size={30} className="text-red-600"/>
}