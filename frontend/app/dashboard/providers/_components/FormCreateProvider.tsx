'use client';
import { createDevice } from "@/actions/devices/devices-create";
import createEmployee from "@/actions/employees/employee-create";
import { createPrinter } from "@/actions/printers/printer-create";
import { createMobile } from "@/actions/smartphones/mobile-create";
import { Deparment, Employee, Location } from "@/entities";
import { Autocomplete, AutocompleteItem, Button, ButtonGroup, Divider, Input, ModalFooter, Select, SelectItem } from "@heroui/react";
import { MapPin, Monitor, Save } from "lucide-react";
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
            {pending ? "Guardando..." : "Crear Empleado"}
        </Button>
    )
}

export default function FormCreateProvider({locations, onClose}:{locations:Location[], onClose: ()=>void}){
    const [state, formAction] = useFormState(createEmployee, initialState)

    useEffect(()=>{
        if(state.success){
            onClose()
        }
    }, [state.success, onClose])

    return(
        <form action={formAction} className="bg-slate-50 p-8 rounded-none flex flex-col gap-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
            <Input isRequired label="Nombre(s) del Proveedor" placeholder="Ej. Konica" variant="bordered" name="providerName" className="mb-3 bg-white rounded-2xl"/>
            <Input isRequired label="Correo Electrónico" placeholder="Ej. firtsname.lastname@provider.com" variant="bordered" name="providerEmail" className="mb-3 bg-white rounded-2xl" />
            <Input label="Número Telefónico" placeholder="Ej. 442XXXXXXX" variant="bordered" name="providerPhoneNumber" className="mb-3 bg-white rounded-2xl" />
            <Input label="Nombre del Técnico"  variant="bordered" name="providerPhoneNumber" className="mb-3 bg-white rounded-2xl" />
            </div>
           <Divider className="my-2"/>

           <div className="flex items-center gap-2 mb-4 text-slate-700">
            <MapPin size={24} className="text-red-600"/>
            <h3 className="text-xl font-bold">Ubicación y Asignación</h3>
            </div> 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Select name="location" label="Ubicación" placeholder="Selecciona una Ubicación" variant="bordered" items={locations} className="bg-white rounded-2xl">
                        {locations.map((loc)=>(
                            <SelectItem key={loc.locationId} value={loc.locationId}>{loc.locationName}</SelectItem>
                        ))}
                    </Select>
        
                    {state.error && (
                        <p className="text-red-600 text-sm">{state.error}</p>
                    )}
            </div>
            <div className="flex justify-end pt-4">
            <ModalFooter className="justify-center">
                    <Button color="secondary" variant="light" onPress={onClose}>
                        Cancelar
                    </Button>   
                    <SubmitButton />
                </ModalFooter>
            </div>
        </form>
    )
}