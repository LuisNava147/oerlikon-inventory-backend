'use client';
import { createDevice } from "@/actions/devices/devices-create";
import { Employee, Location } from "@/entities";
import { Autocomplete, AutocompleteItem, Button, ButtonGroup, Divider, Input, Select, SelectItem } from "@heroui/react";
import { MapPin, Monitor, Save } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";

const DEVICE_TYPE = [
    {key: "Laptop", label:"Laptop"},
    {key: "Desktop", label:"Desktop/PC"},
    {key: "Monitor", label:"Monitor"},
    {key: "Mouse", label:"Mouse"},
    {key: "Keyboard", label:"Teclado"},
    {key: "Docking", label:"Docking Station"},
]

function SubmitButton(){
    const {pending} = useFormStatus()
    return(
        <Button type="submit" color="primary" isLoading={pending} startContent={!pending && <Save size={18}/>} className="font-semibold shadow-md">
            {pending ? "Guardando..." : "Crear Equipo"}
        </Button>
    )
    
}


export default function FormCreateDevice({locations, employees}:{locations: Location[], employees: Employee[]}){
    const [employeeId, setEmployeeId] = useState<string>("");
    return(
        <form action={createDevice} className="bg-slate-50 p-8 rounded-3xl flex flex-col gap-4">
            
            <div className="flex items-start gap-2 text-slate-700">
                <Monitor size={30} className="text-red-600"/>
                <h1 className="text-2xl text-center font-bold">Registrar nuevo Equipo</h1>
            </div>
            <div className="grig grid-cols-1 md:grid-cols-3 gap-5">
                <Select name="deviceType" label="Tipo de Dispositivo" placeholder="Selecciona uno" variant="bordered" isRequired items={DEVICE_TYPE} className="mb-3">
                    {DEVICE_TYPE.map((t)=>(
                        <SelectItem key={t.key} value={t.key}>{t.label}</SelectItem>
                    ))}
                </Select>
            <Input isRequired label="Marca del Dispositivo" placeholder="Ej. DELL" variant="bordered" name="deviceBrand" className="mb-3"/>
            <Input isRequired label="Modelo" placeholder="Ej. Latitude 5420" variant="bordered" name="deviceModel" className="mb-3"/>
            <Input label="Hostname" placeholder="OE-00000000" variant="bordered" name="deviceHostName" className="mb-3" />
            <Input isRequired label="Número de Serie(S/N)" variant="bordered" name="deviceSerialTag" className="mb-3" />
            <Input label="Número de Activo" placeholder="BMX-0000" variant="bordered" name="deviceAssetNumber" className="mb-3" />
            </div>
           <Divider />
           <div className="flex items-center gap-2 mb-4 text-slate-700">
            <MapPin size={30} className="text-red-600"/>
            <h3 className="text-2xl text-center font-bold">Ubicación y Asignación</h3>
            </div> 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Select name="location" label="Ubicación" placeholder="Selecciona una Ubicación" variant="bordered" items={locations}>
                        {locations.map((loc)=>(
                            <SelectItem key={loc.locationId} value={loc.locationId}>{loc.locationName}</SelectItem>
                        ))}
                    </Select>
                    <input type="hidden" name="employee" value={employeeId} />
                    <Autocomplete name="employee" label= "Selecciona un Empleado" placeholder="Escribe para buscar..." className="flex-1" defaultItems={employees}variant="bordered"
                    onSelectionChange={(key) => setEmployeeId(key as string)}>
                        {
                            (emp)=>(
                                <AutocompleteItem key={emp.employeeId} textValue={`${emp.employeeName} ${emp.employeeLastName}`}>
                                    <div className="fñex fñex-col">
                                        <span className="text-small">{emp.employeeName} {emp.employeeLastName}</span>
                                        <span className="text-tiny text-default-400"> | {emp.employeeEmail}</span>
                                    </div>
                                </AutocompleteItem>
                            )
                        }
                    </Autocomplete>
            </div>
            <div className="flex justify-end pt-4">
                <SubmitButton />
            </div>
        </form>
    )
}