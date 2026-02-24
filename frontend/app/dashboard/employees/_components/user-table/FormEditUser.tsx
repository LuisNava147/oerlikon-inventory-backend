'use client';

import { deleteAdminUser } from "@/actions/users/delete-user";
import { updateAdminUser } from "@/actions/users/update-user";
import { Employee } from "@/entities";
import { Button, Input, ModalFooter, Divider } from "@heroui/react";
import { Save, Trash2, TriangleAlert } from "lucide-react";
import { useState } from "react";

export default function FormEditUser({employees, onClose}:{employees:Employee, onClose:()=>void}){
    const [formData, setFormData] = useState({password:'', confirmPassword:''})
    const [isLoadingPass, setIsLoadingPass] = useState(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        if(formData.password.length < 8){
            setError("La contraseña debe tener al menos 8 caracteres.")
            return
        }
        if(formData.password !== formData.confirmPassword){
            setError("Las contraseñas no coinciden.")
            return
        }
        setIsLoadingPass(true)

        try{
            const submitData = new FormData()
            submitData.append('employee', employees.employeeId)
            submitData.append('userPassword', formData.password)

            await updateAdminUser(submitData)
            setSuccess("Contraseña actualizada correctamente.")
            onClose()
            setFormData({password:'', confirmPassword:''})
        }catch(error:any){
            setIsLoadingPass(false)
        }
    }

    const handleDeleteUser = async() => {
        const confirmed = confirm("Estás seguro de eliminar los accesos de administrador para este empleado?")
        if(!confirmed) return
        setIsLoadingDelete(true)

        try{
            await deleteAdminUser(employees.employeeId)
            setSuccess("Accesos de administrador eliminados.")
            onClose()
        }catch(error: any){
            setError(`Error: ${error.message}`)
        }finally{
            setIsLoadingDelete(false)
        }
    }

    return(
        <div className="flex flex-col gap-4">
            <div className="text-center pb-2">
                <span className="text-slate-600">Gestionando acceso de: <br/>
                <p className="text-slate-800 text-lg font-bold">{employees.employeeName} {employees.employeeLastName}</p>
                <p className="text-xs text-slate-500 mt-1"><strong>Correo: </strong>{employees.employeeEmail}</p>
                </span>
            </div>
            <Divider/>
            <form onSubmit={handleUpdatePassword} className="flex flex-col gap-4 mt-2">
                <p className="text-sm font-bold text-slate-700">Cambiar Contraseña</p>
                <Input type="password" color="primary" isRequired minLength={8} label="Nueva Contraseña" variant="bordered" placeholder="Ej. Mínimo 8 carácteres"
                classNames={{inputWrapper:'bg-slate-50 font-bold'}} name="userPassword" value={formData.password} onChange={(e)=> setFormData({...formData, password: e.target.value})}/>
                <Input type="password" color="primary" isRequired minLength={8} label="Confirmar nueva Contraseña" variant="bordered" placeholder="Confirma la contraseña"
                classNames={{inputWrapper:'bg-slate-50 font-bold'}} value={formData.confirmPassword} onChange={(e)=> setFormData({...formData, confirmPassword: e.target.value})}/>
                 {error && (
                        <div className="flex items-center justify-center gap-2
                         bg-red-50 border border-red-100 text-red-600 px-3 
                         py-2 rounded-lg w-full mb-4 text-xs font-medium animate-fadeIn">
                            <TriangleAlert size={16} />
                            <span>{error}</span>
                        </div>
                        )}
                <Button type="submit" color="primary" isLoading={isLoadingPass} startContent={!isLoadingPass && <Save size={18}/>} className="font-semibold shadow-md mt-2">
                    {isLoadingPass ? "Actualizando...": "Actualizar Contraseña"}
                </Button>
            </form>
            <Divider/>
            <div className="flex flex-col gap-2">
                <p className="text-sm font-bold text-red-600">Eliminación de Administrador</p>
                <p className="text-xs text-slate-500">Eliminará por completo el acceso del empleado al sistema de Oerlikon Inventory IT</p>
                <Button color="danger" variant="flat" onPress={handleDeleteUser} isLoading={isLoadingDelete} startContent={!isLoadingDelete && <Trash2 size={18}/>}
                className="font-semibold w-full">
                    {isLoadingDelete ? "Eliminando..." : "Eliminar Administrador"}
                </Button>
            </div>
            <div className="flex justify-center">
                <Button color="default" variant="light" onPress={onClose} className="w-full">
                    Cerrar
                </Button>
            </div>
        </div>
    )
}