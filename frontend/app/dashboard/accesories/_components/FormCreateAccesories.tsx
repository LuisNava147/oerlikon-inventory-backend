'use client';
import { createAccesories } from "@/actions/accesories/create-accesorie";
import { createDevice } from "@/actions/devices/devices-create";
import { createPrinter } from "@/actions/printers/printer-create";
import { Deparment, Employee, Location } from "@/entities";
import { Autocomplete, AutocompleteItem, Button, ButtonGroup, Divider, Input, ModalFooter, Select, SelectItem } from "@heroui/react";
import { MapPin, Monitor, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const DEVICE_TYPE = [
    {key: "Monitor", label:"Monitor"},
    {key: "Mouse", label:"Mouse"},
    {key: "Teclado", label:"Teclado"},
    {key: "Docking", label:"Docking Station"},
    {key: "Diadema", label: "Diadema"},
    {key: "Token", label: "Token"},
    {key: "Lector de barras", label: "Lector de barras"},
    {key:"Bocina", label: "Bocina"}
]

const initialState = {
    success: false,
    error: null,
  }

  function SubmitButton(){
    const {pending} = useFormStatus()
    return(
        <Button type="submit" color="primary" isLoading={pending} startContent={!pending && <Save size={18}/>} className="font-semibold shadow-md">
            {pending ? "Guardando..." : "Crear Periférico"}
        </Button>
    )
    
}

interface Props {
    locations: Location[],
    employees: Employee[],
    departments: Deparment[],
    onClose: () => void
}

export default function FormCreateAccesories({locations, employees, departments, onClose}:Props){
    const [state, formAction] = useFormState(createAccesories, initialState)
    const [employeeId, setEmployeeId] = useState<string>("")
    const [departmentId, setDepartmentId] = useState<string>("");

    useEffect(() =>{
        if(state.success){
            onClose()
        }
    },[state.success, onClose])

    return(
        <form action={formAction} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-bold">
                <Select name="deviceType" label="Tipo de Dispositivo" placeholder="Selecciona uno" variant="bordered" isRequired items={DEVICE_TYPE} color="primary" classNames={{trigger:'bg-slate-50'}}>
                    {DEVICE_TYPE.map((t)=>(
                        <SelectItem key={t.key} value={t.key}>{t.label}</SelectItem>
                    ))}
                </Select>
            <Input isRequired label="Marca del Dispositivo" placeholder="Ej. logitech" variant="bordered" name="deviceBrand" color="primary" classNames={{inputWrapper:'bg-slate-50'}}/>
            <Input isRequired label="Modelo"  variant="bordered" name="deviceModel" color="primary" classNames={{inputWrapper:'bg-slate-50'}}/>
            <Input isRequired label="Número de Serie(S/N)" variant="bordered" name="deviceSerialTag" color="primary" classNames={{inputWrapper:'bg-slate-50'}}/>
            <Input label="Número de Activo" placeholder="BMX-0000" variant="bordered" name="deviceAssetNumber" color="primary" classNames={{inputWrapper:'bg-slate-50'}}/>
            </div>
           <Divider className="my-3"/>

           <h3 className="text-start text-lg font-bold text-slate-800 flex items-center gap-2 mr-2">
                <div className="p-2 bg-red-100 rounded-lg text-red-600">
                <MapPin size={30} className="text-red-600"/>
                </div> 
                Ubicación y Asignación
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-bold">
                    <Select name="location" label="Ubicación" placeholder="Selecciona una Ubicación" variant="bordered" items={locations} color="primary" classNames={{trigger:'bg-slate-50'}}>
                        {locations.map((loc)=>(
                            <SelectItem key={loc.locationId} value={loc.locationId}>{loc.locationName}</SelectItem>
                        ))}
                    </Select>
                    <input type="hidden" name="employee" value={employeeId} />
                    <Autocomplete name="employee" label= "Selecciona un Empleado" placeholder="Escribe para buscar..." color="primary" className="bg-slate-50 rounded-2xl" defaultItems={employees}variant="bordered"
                    onSelectionChange={(key) => setEmployeeId(key as string)}>
                        {
                            (emp)=>(
                                <AutocompleteItem key={emp.employeeId} textValue={`${emp.employeeName} ${emp.employeeLastName}`}>
                                    <div className="flex flex-col">
                                        <span className="text-small">{emp.employeeName} {emp.employeeLastName}</span>
                                        <span className="text-tiny text-default-400"> | {emp.employeeEmail}</span>
                                    </div>
                                </AutocompleteItem>
                            )
                        }
                    </Autocomplete>

                    <input type="hidden" name="department" value={departmentId} />
                    <Autocomplete name="department" label= "Selecciona un Departamento" placeholder="Escribe para buscar..." color="primary" className="bg-slate-50 rounded-2xl" defaultItems={departments}variant="bordered"
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
