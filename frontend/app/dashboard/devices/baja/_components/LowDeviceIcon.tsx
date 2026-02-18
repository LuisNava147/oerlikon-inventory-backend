import { Laptop, Monitor, Mouse, Keyboard, HardDrive, Smartphone, HelpCircle, Printer, LaptopMinimal, Headset, SquarePower, CircleQuestionMark, Tablet, QrCode, MonitorSpeaker } from "lucide-react";

export default function LowDeviceIcon({type}:{type:string}){
    if(!type)return <HelpCircle size={20} className="text-slate-400" />

    const t = type.toLowerCase();

    if(t.includes("laptop")||t.includes("laptops"))
    return <Laptop size={30} className="text-red-600"/>
    if(t.includes("desktop")||t.includes("desktops")|| t.includes("computadora")|| t.includes("pc"))
    return <LaptopMinimal size={30} className="text-red-600"/>
    if(t.includes("printer"))
    return <Printer size={30} className="text-red-600"/>
    if(t.includes("phone") || t.includes("celular"))
    return <Smartphone size={30} className="text-red-600"/>
    if(t.includes("ipad") || t.includes("tablet"))
    return <Tablet size={30} className="text-red-600" />
    if(t.includes("monitor")|| t.includes("pantalla"))
    return <Monitor size={30} className="text-red-600"/>
    if(t.includes("mouse")||t.includes("mouses"))
    return <Mouse size={30} className="text-red-600"/>
    if(t.includes("teclado")||t.includes("teclados")|| t.includes("keyboard"))
    return <Keyboard size={30} className="text-red-600"/>
    if(t.includes("docking")||t.includes("dockings"))
    return <HardDrive size={30} className="text-red-600"/>
    if(t.includes("diadema"))
    return <Headset size={30} className="text-red-600" />
    if(t.includes("token"))
    return <SquarePower size={30} className="text-red-600" />
    if(t.includes("lector de barras"))
    return <QrCode size={30} className="text-red-600"/>
    if(t.includes("bocina"))
    return <MonitorSpeaker size={30} className="text-red-600"/>

    return <CircleQuestionMark size={30} className="text-red-600"/>
}