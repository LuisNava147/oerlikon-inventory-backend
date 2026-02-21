'use client';

import { createTicketIncident } from "@/actions/tickets/ticket-create";
import { Deparment, Device, Employee, Location } from "@/entities";
import { Autocomplete, AutocompleteItem, Button, ButtonGroup, Divider, Input, ModalFooter, Select, SelectItem, Textarea, form } from "@heroui/react";
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

export default function FormCreateTicket({onClose}:{onClose:()=>void}){
    const [state, formAction] = useFormState(createTicketIncident, initialState)

    useEffect(()=>{
        if(state.success){
            onClose()
        }
    }, [state.success, onClose])

    return(
        <form action={formAction} className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 w-full font-bold">
            <Input color="primary" label="Nombre del Ticket" isRequired variant="bordered" name="ticketName" classNames={{inputWrapper:'bg-slate-50'}}/>
                
                <Textarea color="primary" label="Descripción del Ticket" placeholder="Escriba a detalle el problema relacionado con el Ticket..." 
                isRequired name="ticketDescription" variant="bordered" minRows={5} maxLength={350} classNames={{inputWrapper:'bg-slate-50'}} 
                startContent={<FileText className="text-gray-400 mt-1" size={18}/>}/>

                <Input color="primary" label="Liga del Ticket" isRequired variant="bordered" name="ticketLink" classNames={{inputWrapper:'bg-slate-50'}}/>
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