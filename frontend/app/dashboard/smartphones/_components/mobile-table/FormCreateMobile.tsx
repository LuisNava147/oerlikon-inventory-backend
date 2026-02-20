'use client';
import { createDevice } from "@/actions/devices/devices-create";
import { createPrinter } from "@/actions/printers/printer-create";
import { createMobile } from "@/actions/smartphones/mobile-create";
import { Deparment, Employee, Location } from "@/entities";
import { Autocomplete, AutocompleteItem, Button, ButtonGroup, Divider, Input, ModalFooter, Select, SelectItem } from "@heroui/react";
import { MapPin, Monitor, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const DEVICE_TYPE = [
    {key:"Celular", label:"Celular"},
    {key:"iPad", label:"iPad"},
    {key:"Tablet",label:"Tablet"}
]

const initialState = {
    success: false,
    error: null,
  }
  
function SubmitButton(){
    const {pending} = useFormStatus()
    return(
        <Button type="submit" color="primary" isLoading={pending} startContent={!pending && <Save size={18}/>} className="font-semibold shadow-md">
            {pending ? "Guardando..." : "Crear Dispositivo"}
        </Button>
    )
    
}

interface Props {
    locations: Location[],
    employees: Employee[],
    departments: Deparment[],
    onClose: () => void
}

export default function FormCreateMobile({locations, employees, departments, onClose}:Props){
    const [state, formAction] = useFormState(createMobile, initialState)
    const [employeeId, setEmployeeId] = useState<string>("");
    const [departmentId, setDepartmentId] = useState<string>("");

    useEffect(()=>{
        if(state.success){
            onClose()
        }
    }, [state.success, onClose])
    return(
        <form action={formAction} className="bg-slate-50 p-8 rounded-none flex flex-col gap-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select name="deviceType" label="Tipo de Dispositivo" placeholder="Selecciona uno" variant="bordered" isRequired items={DEVICE_TYPE} className="mb-3 bg-white rounded-2xl">
                    {DEVICE_TYPE.map((t)=>(
                        <SelectItem key={t.key} value={t.key}>{t.label}</SelectItem>
                    ))}
                </Select>
            <Input isRequired label="Marca del Dispositivo" placeholder="Ej.Motorola" variant="bordered" name="deviceBrand" className="mb-3 bg-white rounded-2xl"/>
            <Input isRequired label="Modelo" placeholder="Ej. MOTO G5" variant="bordered" name="deviceModel" className="mb-3 bg-white rounded-2xl"/>
            <Input isRequired label="IMEI" variant="bordered" name="deviceSerialTag" className="mb-3 bg-white rounded-2xl" />
            <Input label="Cuenta de Usuario" placeholder="Ej. firtsname@gmail.com" variant="bordered" name="deviceAccount" className="mb-3 bg-white rounded-2xl" />
            <Input label="Contraseña de Cuenta"  variant="bordered" name="devicePassword" className="mb-3 bg-white rounded-2xl" />
            <Input label="PIN de Bloqueo" placeholder="Ej. 12131415" variant="bordered" name="devicePin" className="mb-3 bg-white rounded-2xl" />
            <Input label="Número de Activo" placeholder="BMX-0000" variant="bordered" name="deviceAssetNumber" className="mb-3 bg-white rounded-2xl" />
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
                    <input type="hidden" name="employee" value={employeeId} />
                    <Autocomplete name="employee" label= "Selecciona un Empleado" placeholder="Escribe para buscar..." className="bg-white rounded-2xl" defaultItems={employees}variant="bordered"
                    onSelectionChange={(key) => setEmployeeId(key as string)}>
                        {
                            (emp)=>(
                                <AutocompleteItem key={emp.employeeId} textValue={`${emp.employeeName} ${emp.employeeLastName}`}>
                                    <div className="flex flex-col">
                                        <span className="text-small">{emp.employeeName} {emp.employeeLastName}</span>
                                        <span className="text-tiny text-default-400"> | {emp.employeePhoneNumber} | {emp.employeeEmail}</span>
                                    </div>
                                </AutocompleteItem>
                            )
                        }
                    </Autocomplete>
                    
                    <input type="hidden" name="department" value={departmentId} />
                    <Autocomplete name="department" label= "Selecciona un Departamento" placeholder="Escribe para buscar..." className="bg-white rounded-2xl" defaultItems={departments}variant="bordered"
                    onSelectionChange={(key) => setDepartmentId(key as string)}>
                        {
                            (dep)=>(
                                <AutocompleteItem key={dep.departmentId} textValue={`${dep.departmentName}`}>
                                    <div className="flex flex-col">
                                        <span className="text-small">{dep.departmentName}</span>
                                        <span className="text-tiny text-default-400"> | {dep.location?.locationName || "Sin Ubicación"}</span>
                                    </div>
                                </AutocompleteItem>
                            )
                        }
                    </Autocomplete>
                    {state.error && (
                        <p className="text-red-600 text-sm">{state.error}</p>
                    )}
            </div>
            <div className="flex justify-end pt-4">
            <ModalFooter className="justify-center">
                    <Button color="danger" variant="light" onPress={onClose}>
                        Cancelar
                    </Button>   
                    <SubmitButton />
                </ModalFooter>
            </div>
        </form>
    )
}