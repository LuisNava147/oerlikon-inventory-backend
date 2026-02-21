'use client';
import { createDeviceIncident } from "@/actions/devices-incidents/incident-create";
import { createDevice } from "@/actions/devices/devices-create";
import createEmployee from "@/actions/employees/employee-create";
import { createPrinter } from "@/actions/printers/printer-create";
import { createMobile } from "@/actions/smartphones/mobile-create";
import { Deparment, Device, Employee, Location } from "@/entities";
import { Autocomplete, AutocompleteItem, Button, ButtonGroup, Divider, Input, ModalFooter, Select, SelectItem, Textarea } from "@heroui/react";
import { FileText, MapPin, Monitor, Save, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
    success: false,
    error: null,
  }

function SubmitButton(){
    const {pending} = useFormStatus()
    return(
        <Button type="submit" color="primary" isLoading={pending} startContent={!pending && <Save size={18}/>} className="font-semibold shadow-md">
            {pending ? "Guardando..." : "Crear Reporte"}
        </Button>
    )
    
}

export default function FormCreateIncident({devices, onClose}:{devices:Device[], onClose:()=>void}){
    const [state, formAction] = useFormState(createDeviceIncident, initialState)
    const [deviceId, setDeviceId] = useState<string>("");

    useEffect(()=>{
        if(state.success){
            onClose()
        }
    }, [state.success, onClose])

    return(
        <form action={formAction} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-bold">
                <div className="animate-in fade-in slide-in-from-top-2 duaration-300">
                    <input type="hidden" name="device" value={deviceId}/>
                    <Autocomplete color="primary" label="Buscar Equipo Dañado" placeholder="Escriba Marca, modelo o S/N..." isRequired
                    name="device" variant="bordered" defaultItems={devices} startContent={<Search className="text-gray-400" size={18}/>}
                    onSelectionChange={(key) => setDeviceId(key as string)} className="bg-slate-50 rounded-2xl">
                        {
                            (dev)=>(
                                <AutocompleteItem key={dev.deviceId} 
                                textValue={`${dev.deviceBrand} ${dev.deviceModel} ${dev.deviceSerialTag}`}>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-small text-slate-700">
                                            {dev.deviceBrand} {dev.deviceModel}
                                        </span>
                                    <div className="flex items-center gap-2 text-tiny text-slate-500">
                                        <span className="bg-slate-100 px-1 rounded border ">
                                            S/N: {dev.deviceSerialTag}
                                        </span>
                                        {dev.location && (
                                            <span>{dev.location?.locationName || "Sin Ubicación"}</span>
                                        )}
                                        {dev.department && (
                                            <span>| {dev.department.departmentName}</span>
                                        )}
                                    </div>
                                    </div>
                                </AutocompleteItem>
                            )
                        }
                    </Autocomplete>
                    <p className="text-xs text-slate-400 mt-1 pl-1">
                    * Puede buscar por número de serie para mayor precisión.
                    </p>
                </div>

                <Input color="primary" isRequired label="Número de Reporte #" placeholder="Ej. #1234" variant="bordered" name="reportNumber" classNames={{inputWrapper: "bg-slate-50"}}/>
                <Textarea color="primary" isRequired label="Descripción del problema" placeholder="Describa detalladamente la falla o error del equipo."
                variant="bordered" minRows={4} maxLength={350} name="incidentDescription" className="mb-3 bg-slate-50 rounded-2xl"/>
                <Textarea color="primary" label="Notas Técnicas (opcional)" placeholder="Observaciones adicionales, descripción de resolución."
                variant="bordered" minRows={4} maxLength={350} name="incidentNote" className="mb-3 bg-slate-50 rounded-2xl"
                startContent={<FileText className="text-gray-400 mt-1" size={18} />}/>
                
                {state.error && (
                        <p className="text-red-600 text-sm">{state.error}</p>
                    )}
            </div>
            <div className="flex justify-end ml-6">
            <ModalFooter className="justify-end items-end">
                    <Button color="danger" variant="light" onPress={onClose}>
                        Cancelar
                    </Button>   
                    <SubmitButton />
                </ModalFooter>
            </div>
        </form>
    )
}
