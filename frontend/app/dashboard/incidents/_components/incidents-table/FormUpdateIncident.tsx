'use client';
import { createDeviceIncident } from "@/actions/devices-incidents/incident-create";
import updateDeviceIncident from "@/actions/devices-incidents/incident-update";
import { createDevice } from "@/actions/devices/devices-create";
import createEmployee from "@/actions/employees/employee-create";
import { createPrinter } from "@/actions/printers/printer-create";
import { createMobile } from "@/actions/smartphones/mobile-create";
import { Deparment, Device, Employee, Incident, Location } from "@/entities";
import { Autocomplete, AutocompleteItem, Button, ButtonGroup, Divider, Input, ModalFooter, Select, SelectItem, Spinner, Textarea } from "@heroui/react";
import { Activity, CircleQuestionMark, FileText, MapPin, Monitor, Save, Search } from "lucide-react";
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
            {pending ? "Guardando..." : "Actualizar Reporte"}
        </Button>
    )
    
}

export default function FormUpdateDeviceIncident({incidents, onClose}:{incidents:Incident, onClose:()=>void}){
    const incidentId = incidents?.incidentId ? String(incidents.incidentId) : ""
    const updateWithIncidentId = updateDeviceIncident.bind(null,incidentId)
    const [state, formAction] = useFormState(updateWithIncidentId, initialState)

    useEffect(()=>{
        if(state.success){
        onClose()
        }
    }, [state.success, onClose])

    if(!incidents){
        return(
            <div className="flex justify-center items-center h-40">
                <Spinner label="Cargando datos..."/>
            </div>
        )
    }

    return(
        <form action={formAction} className="bg-slate-50 p-6 rounded-none flex flex-col gap-4 w-full">
            {incidents?.device?.deviceId && (
                <input type="hidden" name="device" value={incidents.device.deviceId} />
            )}

            <div className="w-full text-center pb-2 border-b border-slate-200 mb-2">
            <p className="text-slate-500 text-sm">Equipo afectado:</p>
                <h3 className="text-slate-800 font-bold text-lg">
                    {incidents?.device?.deviceType} {incidents?.device?.deviceBrand} {incidents?.device?.deviceModel}
                </h3>
            </div>

            <div className="flex flex-col gap-4 w-full font-semibold">
               
                <Textarea color="primary" label="Notas Técnicas (opcional)" placeholder="Observaciones adicionales, descripción de resolución."
                variant="bordered" minRows={5} maxLength={350} name="incidentNote" classNames={{inputWrapper: "bg-white"}}
                startContent={<FileText className="text-gray-400 mt-1" size={18} />} defaultValue={incidents?.incidentNote ?? ""}/>

                <Select label="Estatus del Reporte" placeholder="Selecciona el estado" name="status" 
                    defaultSelectedKeys={[incidents.status || "PENDIENTE"]} variant="bordered" classNames={{trigger:"bg-white"}}
                    startContent={<CircleQuestionMark className="text-gray-400" size={18} />} isRequired>
                    <SelectItem key="PENDIENTE" color="danger" variant="flat" description="El reporte sigue abierto bajo revisión.">
                        PENDIENTE
                    </SelectItem>
                    <SelectItem key="RESUELTO" color="success" variant="flat" description="El problema se solucionó y se cerrará el ticket.">
                        RESUELTO
                    </SelectItem>
                </Select>
                {state.error && (
                        <p className="text-red-600 text-sm">{state.error}</p>
                    )}
            </div>
            <div className="flex justify-end pt-2">
            <ModalFooter className="justify-center w-full gap-4">
                    <Button color="danger" variant="light" onPress={onClose}>
                        Cancelar
                    </Button>   
                    <SubmitButton />
                </ModalFooter>
            </div>
        </form>
    )
}