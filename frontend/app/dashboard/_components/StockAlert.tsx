
import { Card, CardBody } from "@heroui/react";
import { Laptop, Smartphone, XCircle } from "lucide-react";

const isPrinter= (type:string)=>{
    if(!type)return false
    const t = type.toLowerCase();
    return t.includes("printer") || t.includes("impresora")
}

const isMobile= (type:string)=>{
    if(!type)return false
    const t = type.toLowerCase();
    return t.includes("celular") || t.includes("ipad") || t.includes("tablet")
}

const isAccesorie= (type:string)=>{
    if(!type)return false
    const t = type.toLowerCase();
    return t.includes("token") || t.includes("mouse") || t.includes("teclado") 
    || t.includes("docking") || t.includes("diadema") || t.includes("bocina") || t.includes("monitor")
}

const isComputer = (type: string) => {
    if(!type) return false;
    const t = type.toLowerCase();
    // Filtramos explícitamente solo lo que consideramos "Equipo IT" principal
    return t.includes("laptop") || t.includes("desktop") || t.includes("pc") || t.includes("computadora");
}

const isBaja= (type: string)=>{
    if(!type)return false
    const t = type.toLowerCase()
    return t.includes("baja")
}

export default function StockAlert({available}:{available:any[]}){
    if(!available || !Array.isArray(available))return null
   
    const availableCount = available.filter((d: any) => isComputer(d.deviceType) && !isBaja(d.deviceStatus) && (!d.employee && !d.employeeId)).length
    //console.log("Total Dispositivos Recibidos:", available.length);
    //console.log("Dispositivos Disponibles (Filtrados):", availableCount);
    if(availableCount === 0){
        return(
            <Card className="bg-red-200 shadow-sm rounded-r-xl">
            <CardBody className="flex flex-row items-center gap-4 p-4">
                <div className="p-2 bg-red-500 rounded-full text-white">
                    <XCircle size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-red-800 text-sm">Stock Agotado</h4>
                    <p className="text-xs text-red-700">
                        No hay equipos disponibles. <strong>Es necesario adquirir unidades.</strong>
                    </p>
                </div>
            </CardBody>
        </Card>
        )
    }else if(availableCount <= 5){
        return(
            <Card className= "bg-amber-100 shadow-md">
            <CardBody className="flex flex-row items-center gap-4 p-4">
                <div className="p-2 bg-amber-200 rounded-full text-amber-600">
                    <Laptop size={20}/>
                </div>
                <div>
                    <h4 className="font-bold text-amber-800 text-sm">Stock Bajo</h4>
                    <p className="text-xs text-amber-700">Solo quedan <strong>{availableCount}</strong> Dispositivos sin asignar. Considera adquirir nuevas unidades.</p>
                </div>
            </CardBody>
        </Card>
        )
    }else{
        return(
            <Card className= "bg-emerald-100 shadow-md">
                <CardBody className="flex flex-row items-center gap-4 p-4">
                    <div className="p-2 bg-emerald-500 rounded-full text-white">
                        <Laptop size={20}/>
                    </div>
                    <div>
                        <h4 className="font-bold text-emerald-800 text-sm">Stock Suficiente</h4>
                        <p className="text-xs text-emerald-700">Tienes <strong>{availableCount}</strong> Dispositivos sin asignar. Todo en orden.</p>
                    </div>
                </CardBody>
            </Card>
        )
    }


    
}