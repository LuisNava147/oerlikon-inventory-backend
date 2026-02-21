import { updateDevice } from "@/actions/devices/devices-update"
import updateEmployee from "@/actions/employees/employee-update"
import { Deparment, Device, Employee, Location } from "@/entities"
import { Autocomplete, AutocompleteItem, Button, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Spinner, Tooltip, useDisclosure } from "@heroui/react"
import { MapPin, Pencil, Save } from "lucide-react"
import { useEffect, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"

const initialState = {
    success: false,
    error: null,
  }

function SubmitButton(){
    const {pending} = useFormStatus()
    return(
        <Button type="submit" color="primary" isLoading={pending} startContent={!pending && <Save size={18}/>} className="font-semibold shadow-md">
            {pending ? "Guardando..." : "Editar Empleado"}
        </Button>
    )
}

interface Props {
    locations:Location[]
    employees:Employee
    departments: Deparment[]
    onClose:()=>void
}

export default function FormUpdateEmployee({locations=[], departments=[], employees, onClose}:Props){
    const [locationId, setLocationId] = useState<string>("")
    const [departmentId, setDepartmentId] = useState<string>("")
    const [departmentInput, setDepartmentInput] = useState("")
    const employeeId = employees?.employeeId ? String(employees.employeeId) : ""
    const updateWithEmployeeId = updateEmployee.bind(null, employeeId)
    const [state, formAction] = useFormState(updateWithEmployeeId, initialState)

    useEffect(()=>{
        if(employees){
            if(employees.location?.locationId){
                setLocationId(String(employees.location.locationId))
            }
            if(employees.department?.departmentId){
                setDepartmentId(String(employees.department.departmentId))
            }
        }
    },[employees])

    useEffect(()=>{
        if(departments.length > 0 && departmentId){
            const found = departments.find((d)=> String(d.departmentId) === String(departmentId))
            if(found){
                setDepartmentInput(`${found.departmentName}`)
            }
        }
    }, [departmentId, departments])
    
    useEffect(()=> {
        if(state.success){
            onClose()
        }
    },[state.success, onClose])

    if(!employees){
        return(
            <div className="flex justify-center items-center h-40">
            <Spinner label="Cargando datos..."/>
        </div>
        )
    }

    return(
        <form action={formAction} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-bold">
                
            <Input isRequired label="Nombre(s) de Empleado" variant="bordered" name="employeeName" defaultValue={employees?.employeeName} color="primary" classNames={{inputWrapper: "bg-slate-50"}}/>
            <Input isRequired label="Apellido(s) de Empleado" variant="bordered" name="employeeLastName" defaultValue={employees?.employeeLastName} color="primary" classNames={{inputWrapper: "bg-slate-50"}}/>
            <Input isRequired label="Correo Electrónico" placeholder="Ej. firtsname.lastname@oerlikon.com" defaultValue={employees?.employeeEmail} variant="bordered" name="employeeEmail" color="primary" classNames={{inputWrapper: "bg-slate-50"}} />
            <Input label="Número Telefónico" placeholder="Ej. 442XXXXXXX" variant="bordered" name="employeePhoneNumber" defaultValue={employees?.employeePhoneNumber} color="primary" classNames={{inputWrapper: "bg-slate-50"}} />
            </div>
           <Divider className="my-3"/>

            <h3 className="text-start text-lg font-bold text-slate-800 flex items-center gap-2 mr-2">
                <div className="p-2 bg-red-100 rounded-lg text-red-600">
                <MapPin size={30} className="text-red-600"/>
                </div> 
                Ubicación y Asignación
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-bold">
            <input type="hidden" name="location" value={locationId} />
            <Select name="location" selectedKeys={locationId ? [locationId] : []} onSelectionChange={(keys)=> setLocationId(Array.from(keys)[0] as string)}
            label="Selecciona una Ubicación" placeholder="Selecciona una Ubicación" variant="bordered" color="primary" classNames={{trigger:"bg-slate-50"}}>
                {locations.map((loc)=>(
                    <SelectItem key={String(loc.locationId)} textValue={loc.locationName}>
                        {loc.locationName}
                    </SelectItem>
                ))}
            </Select>
        
            <input type="hidden" name="department" defaultValue={departmentId} />
                    <Autocomplete name="department" label= "Selecciona un Departamento" placeholder="Escribe para buscar..." color="primary" className="flex-1 bg-slate-50 rounded-2xl" defaultItems={departments} variant="bordered"
                        selectedKey={departmentId || null} onSelectionChange={(key) => setDepartmentId(key as string)} inputValue={departmentInput} onInputChange={setDepartmentInput}>
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