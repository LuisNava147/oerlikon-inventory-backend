"use client"
import { createDepartment } from "@/actions/departments/department-create"
import { Location } from "@/entities"
import { Button, Card, CardBody, CardHeader, Input, Select, SelectItem } from "@heroui/react"
import { BriefcaseBusiness, Building, PlusCircle, Save } from "lucide-react"
import { useEffect, useRef } from "react"
import { useFormState, useFormStatus } from "react-dom"

const initialState = {success: false}

function SubmitButton(){
    const {pending} = useFormStatus()
    return(
        <Button type= "submit" color="primary" className="w-full font-bold shadow-lg shadow-blue-500/30" isLoading={pending}
        startContent={!pending && <Save size={20}/>}>
        {pending ? "Guardando..." : "Guardar Departamento"}
        </Button>
    )
}

export default function CreateDepartment({locations}:{locations: Location[]}){
 const [state, formAction] = useFormState(createDepartment, initialState)
 const formRef = useRef<HTMLFormElement>(null) 
 
 useEffect(()=> {
    if(state?.success && formRef.current){
        formRef.current.reset()
    }
 },[state?.success])

 return(
    <Card className="w-full bg-white border border-slate-200 shadow-md sticky top-6  flex flex-col gap-2">
        <CardHeader className="flex gap-3 pb-0 pt-6 px-6">
            <div className="p-2 bg-red-50 rounded-lg text-red-600">
                <BriefcaseBusiness size={24} />
            </div>
            <p className="text-xl font-bold">Crear Nuevo Departamento</p>
        </CardHeader>
        <CardBody className="px-6 py-6 overflow-hidden">
            <form ref={formRef} action={formAction} className="flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                    <Input isRequired label="Nombre del Departamento" placeholder="Ej. Recursos Humanos" name="departmentName"
                    variant="bordered" labelPlacement="outside" classNames={{inputWrapper: "bg-slate-50 border-slate-200 group-data-[focus=true]:border-red-500",
                label: "text-slate-600 font-medium"}} />

                <Select name="location" label="Ubicación" placeholder="Selecciona una Ubicación" variant="bordered" items={locations} className="bg-white rounded-2xl"
                classNames={{trigger: "bg-slate-50 border-slate-200 group-data-[focus=true]:border-red-500",
                label: "text-slate-600 font-medium"}}>
                        {locations.map((loc)=>(
                            <SelectItem key={loc.locationId} value={loc.locationId}>{loc.locationName}</SelectItem>
                        ))}
                </Select>
                </div>
                {state?.success && (
                    <div className="p-3 bg-green-50 text-green-600 text-sm rounded-lg border border-green-100">
                        Departamento creado correctamente
                    </div>
                )}
                <div className="mt-2">
                    <SubmitButton />
                </div>
            </form>
        </CardBody>
    </Card>
 )
}
