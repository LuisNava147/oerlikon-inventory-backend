'use client';
import { createDevice } from "@/actions/devices/devices-create";
import createEmployee from "@/actions/employees/employee-create";
import { createPrinter } from "@/actions/printers/printer-create";
import { createMobile } from "@/actions/smartphones/mobile-create";
import createAdminUser from "@/actions/users/create-user";
import CreateAdminUser from "@/actions/users/create-user";
import { Deparment, Employee, Location } from "@/entities";
import { Autocomplete, AutocompleteItem, Button, ButtonGroup, Divider, Input, ModalFooter, Select, SelectItem } from "@heroui/react";
import { MapPin, Monitor, Save, ShieldUser, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
    success: false,
    error: null,
  }


export default function FormCreateUser({employee, onClose}:{employee:Employee, onClose:()=>void}){
    const [formData, setFormData] = useState({password:'',confirmPassword:''})
    const [isLoading, setIsLoading] = useState(false)

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()

        if(formData.password.length < 8){
            alert("La contraseña debe tener al menos 8 caracteres")
            return
        }
        if(formData.password !== formData.confirmPassword){
            alert("Las contraseñas no coinciden")
            return;
        }
        setIsLoading(true)
        try{
            const submitData = new FormData()
            submitData.append('employee',employee.employeeId)
            submitData.append('userEmail',employee.employeeEmail)
            submitData.append('userPassword',formData.password)

            await createAdminUser(submitData)
            onClose()
            setFormData({password:'',confirmPassword:''})
        }catch(error: any){
            console.error(error)
            alert(`Error: ${error.message}`)
        }finally{
            setIsLoading(false)
        }
    }
    return(
        <>
            
                <form onSubmit={handleSave} className="bg-slate-50 p-8 rounded-none flex flex-col gap-2">
                    <div className="flex items-center justify-center p-3 font-semibold">
                    <span className="text-slate-600">Creando Usuario Administrador para: <br/>
                    <p className="text-center font-bold text-red-600">{employee.employeeName} {employee.employeeLastName} <br/></p>
                    <p className="text-xs text-center text-slate-500 mt-1"><strong>Correo: </strong>{employee.employeeEmail}</p>
                    </span>
                    </div>
                <div className="flex flex-col gap-5 px-2">
                    <Input type="password" isRequired minLength={8} label="Contraseña de acceso" variant="bordered" name="userPassword" value={formData.password} 
                    className="mb-3 bg-white rounded-2xl" placeholder="Ej. Mínimo 8 caracteres" onChange={(e)=> setFormData({...formData, password: e.target.value})}/>
                    <Input type="password" isRequired minLength={8} label="Confirmar contraseña" variant="bordered" value={formData.confirmPassword} placeholder="Ej. Confirmar Contraseña"
                     onChange={(e)=> setFormData({...formData, confirmPassword: e.target.value})}/>
                </div>
                <div className="flex justify-end pt-4">
                    <ModalFooter className="justify-center">
                        <Button color="danger" variant="light" onPress={onClose}>
                            Cancelar
                        </Button>   
                        <Button 
                        type="submit" 
                        color="primary" 
                        isLoading={isLoading} 
                        startContent={!isLoading && <Save size={18}/>} 
                        className="font-semibold shadow-md"
                    >
                        {isLoading ? "Guardando..." : "Crear Usuario Admin"}
                    </Button>
                    </ModalFooter>
                </div>
         
                </form>
        </>
        
    )
}