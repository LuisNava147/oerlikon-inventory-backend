'use client'

import CreateAdminUser from "@/actions/users/create-user"
import { Button, Card, CardBody, Input, Select, SelectItem } from "@heroui/react"
import { useFormStatus } from "react-dom"
import SelectEmployee from "./SelectEmployee"
import { Employee } from "@/entities"

function SubmitButton(){
    const {pending} = useFormStatus()
    return(
        <Button color="primary" type="submit" isLoading={pending} className="mt-4 font-bold w-full">
            {pending ? "Creando..." : "Crear Administrador"}
        </Button>
    )
}

export default function FormCreateUser({employees, employeeId}:{employees: Employee[],  employeeId:string}){
    return(
        <form action={CreateAdminUser} className="flex flex-col gap-6" >
            <Card className="bg-white p-4 shadow-lg">
            <CardBody>
                <SelectEmployee employees={employees} employeeId={employeeId}/>
                <Input type="email" label="Correo Electrónico" name="userEmail" placeholder="firtsname.lastname@oerlikon.com"
                isRequired />
                <Input type="password" label="Contraseña" name="userPassword" 
                isRequired />
                <SubmitButton />
            </CardBody>
        </Card>
        </form>
    )
}