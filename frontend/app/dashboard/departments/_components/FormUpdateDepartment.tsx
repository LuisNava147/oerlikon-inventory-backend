"use client"

import { updateDepartment } from "@/actions/departments/department-update"
import { Deparment, Location } from "@/entities"
import { Button, Input, Select, SelectItem, Spinner } from "@heroui/react"
import { Save } from "lucide-react"
import { useEffect, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"

function SubmitButton(){
    const {pending} = useFormStatus()
    return(
        <Button type= "submit" color="primary" className="w-full font-bold shadow-lg shadow-blue-500/30" isLoading={pending}
        startContent={!pending && <Save size={20}/>}>
        {pending ? "Guardando..." : "Editar Departamento"}
        </Button>
    )
}

export default function FormUpdateDepartment({departments, locations=[], onClose}:{departments:Deparment, locations:Location[], onClose:()=>void}){
    const [locationId, setLocationId] = useState<string>("")
    const updateWithId = updateDepartment.bind(null, String(departments.departmentId))
    const [state, formAction] = useFormState(updateWithId, {success:false})

    useEffect(()=>{
        if(departments){
            if(departments.location?.locationId){
                setLocationId(String(departments.location.locationId))
            }
        }
        
    }, [departments])

    useEffect(()=>{
        if(state.success) onClose()
    },[state.success, onClose])

    if(!departments){
        return(
            <div className="flex justify-center items-center h-40">
                <Spinner label="Cargando datos..."/>
            </div>
        )
    }

    return(
        <form action={formAction} className="flex flex-col gap-4">
            <Input label="Nombre del Departamento" name="departmentName" defaultValue={departments?.departmentName} variant="bordered" isRequired />
            <input type="hidden" name="location" value={locationId} />
            <Select name="location" selectedKeys={locationId ? [locationId] : []} onSelectionChange={(keys)=> setLocationId(Array.from(keys)[0] as string)}
            label="Selecciona una Ubicación" placeholder="Selecciona una Ubicación" variant="bordered" className="bg-white rounded-2xl">
                {locations.map((loc)=>(
                    <SelectItem key={String(loc.locationId)} textValue={loc.locationName}>
                        {loc.locationName}
                    </SelectItem>
                ))}
            </Select>
            <div className="flex justify-end gap-2">
                <Button color="danger" variant="light" onPress={onClose}>
                    Cancelar
                </Button>
                <SubmitButton />
            </div>
        </form>
    )
}