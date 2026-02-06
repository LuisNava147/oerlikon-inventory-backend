import { Laptop, Monitor, Mouse, Keyboard, HardDrive, Smartphone, HelpCircle, Printer, LaptopMinimal, Headset, SquarePower, CircleQuestionMark } from "lucide-react";

export default function AccesoriesIcon({type}:{type:string}){
    if(!type)return <HelpCircle size={20} className="text-slate-400" />

    const t = type.toLowerCase();

    if(t.includes("monitor")|| t.includes("pantalla"))
    return <Monitor size={30} className="text-blue-400"/>
    if(t.includes("mouse")||t.includes("mouses"))
    return <Mouse size={30} className="text-orange-600"/>
    if(t.includes("teclado")||t.includes("teclados")|| t.includes("keyboard"))
    return <Keyboard size={30} className="text-gray-600"/>
    if(t.includes("docking")||t.includes("dockings"))
    return <HardDrive size={30} className="text-green-600"/>
    if(t.includes("diadema"))
    return <Headset size={30} className="text-yellow-600" />
    if(t.includes("token"))
    return <SquarePower size={30} className="text-blue-950" />
    

    return <CircleQuestionMark size={30} className="text-red-600"/>
}