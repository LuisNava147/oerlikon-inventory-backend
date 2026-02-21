'use client';

import updateTicketIncident from "@/actions/tickets/ticket-update";
import { Deparment, Device, Employee, Incident, Location, TicketIncident } from "@/entities";
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
            {pending ? "Guardando..." : "Actualizar Ticket"}
        </Button>
    )
}   
    export default function FormUpdateTicket({tickets, onClose}:{tickets:TicketIncident, onClose:()=>void}){
        const ticketId = tickets?.ticketIncidentId ? String(tickets.ticketIncidentId) : ""
        const updateWithTicketId = updateTicketIncident.bind(null, ticketId)
        const [state, formAction] = useFormState(updateWithTicketId, initialState)

        useEffect(()=>{
            if(state.success){
            onClose()
            }
        }, [state.success, onClose])
    
        if(!tickets){
            return(
                <div className="flex justify-center items-center h-40">
                    <Spinner label="Cargando datos..."/>
                </div>
            )
        }

        return(
            <form action={formAction} className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 w-full font-bold">
                    <Textarea label="Descripción del Ticket" placeholder="Escriba a detalle el problema relacionado con el Ticket..." 
                    variant="bordered" minRows={5} maxLength={350} name="ticketDescription" color="primary" classNames={{inputWrapper: "bg-slate-50"}}
                    startContent={<FileText className="text-gray-400 mt-1" size={18} />} defaultValue={tickets?.ticketDescription ?? ""}/>
    
                    <Select label="Estatus del Ticket" placeholder="Selecciona el estado" name="status" 
                        defaultSelectedKeys={[tickets.status || "PENDIENTE"]} variant="bordered" color="primary" classNames={{trigger:"bg-slate-50"}}
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
