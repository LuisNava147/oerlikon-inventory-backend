"use client"

import { updateDepartment } from "@/actions/departments/department-update"
import { Deparment } from "@/entities"
import { Button, Input } from "@heroui/react"
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

export default function FormUpdateDepartment({departments, onClose}:{departments:Deparment, onClose:()=>void}){
    const updateWithId = updateDepartment.bind(null, String(departments.departmentId))
    const [state, formAction] = useFormState(updateWithId, {success:false})

    useEffect(()=>{
        if(state.success) onClose()
    },[state.success, onClose])

    return(
        <form action={formAction} className="flex flex-col gap-4">
            <Input label="Nombre del Departamento" name="departmentName" defaultValue={departments?.departmentName} variant="bordered" isRequired />
            <div className="flex justify-end gap-2">
                <Button variant="light" onPress={onClose}>
                    Cancelar
                </Button>
                <SubmitButton />
            </div>
        </form>
    )
}