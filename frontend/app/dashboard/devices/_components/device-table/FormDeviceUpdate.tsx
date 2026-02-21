
import { updateDevice } from "@/actions/devices/devices-update"
import { Deparment, Device, Employee, Location } from "@/entities"
import { Autocomplete, AutocompleteItem, Button, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Spinner, Tooltip, useDisclosure } from "@heroui/react"
import { CircleQuestionMark, MapPin, Pencil, Save } from "lucide-react"
import { useEffect, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { authHeaders } from "@/app/helpers/authHeaders"
import { API_URL } from "@/constants"
import SelectLocation from "@/app/dashboard/@locations/_components/SelectLocation"


const DEVICE_TYPE = [
    {key: "Laptop", label:"Laptop"},
    {key: "Desktop", label:"Desktop/PC"},
    {key: "Monitor", label:"Monitor"},
    {key: "Mouse", label:"Mouse"},
    {key: "Teclado", label:"Teclado"},
    {key: "Docking", label:"Docking Station"},
    {key: "Diadema", label: "Diadema"},
    {key: "Token", label: "Token"},
]

const initialState = {
    success: false,
    error: null,
  }

function SubmitButton(){
    const {pending} = useFormStatus()
    return(
        <Button type="submit" color="primary" isLoading={pending} startContent={!pending && <Save size={18}/>} className="font-semibold shadow-md">
            {pending ? "Guardando..." : "Editar Equipo"}
        </Button>
    )
}

interface Props {
    locations: Location[],
    employees: Employee[],
    departments: Deparment[],
    devices: Device,
    onClose:()=>void
}

export default function FormUpdateDevice({locations=[], employees=[], departments=[], devices, onClose}:Props){
    
    const [employeeId, setEmployeeId] = useState<string>("");
    const [employeeInput, setEmployeeInput] = useState("")
    const [locationId, setLocationId] = useState<string>("")
    const [deviceType, setDeviceType] = useState<string>("");
    const [departmentId, setDepartmentId] = useState<string>("");
    const [departmentInput, setDepartmentInput] = useState("")

    const deviceId = devices?.deviceId ? String(devices.deviceId) : ""
    const updateWithDeviceId = updateDevice.bind(null, deviceId)
    const [state, formAction] = useFormState(updateWithDeviceId, initialState)
    useEffect(()=>{
        if(devices){
            if(devices.employee?.employeeId){
                setEmployeeId(devices.employee.employeeId)
            }
            if(devices.location?.locationId){
                setLocationId(String(devices.location.locationId))
            }
            if(devices.department?.departmentId){
                setDepartmentId(String(devices.department.departmentId))
            }
            if(devices.deviceType){
                setDeviceType(devices.deviceType)
            }
        }
        
    }, [devices])

    useEffect(()=>{
        if(employees.length > 0 && employeeId){
            const found = employees.find((e)=> String(e.employeeId) === String(employeeId))
            if(found){
                setEmployeeInput(`${found.employeeName} ${found.employeeLastName}`)
            }
        }
    }, [employeeId, employees])

    useEffect(()=>{
        if(departments.length > 0 && departmentId){
            const found = departments.find((d)=> String(d.departmentId) === String(departmentId))
            if(found){
                setDepartmentInput(`${found.departmentName}`)
            }
        }
    }, [departmentId, departments])

    useEffect(()=>{
        if(state.success){
        onClose()
        }
    }, [state.success, onClose])

      if(!devices){
        return(
            <div className="flex justify-center items-center h-40">
                <Spinner label="Cargando datos..."/>
            </div>
        )
    }

    return(
        <>    
                <form action={formAction} className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-bold">
                    <input type="hidden" name="deviceType" value={deviceType} />
                    <Select label="Tipo de Dispositivo" placeholder="Selecciona uno" variant="bordered" isRequired items={DEVICE_TYPE} color="primary" classNames={{trigger:"bg-slate-50"}}
                    selectedKeys={deviceType ? [deviceType] : []} onSelectionChange={(keys)=> setDeviceType(Array.from(keys)[0] as string)}>
                    {DEVICE_TYPE.map((item)=>(
                        <SelectItem key={item.key}>
                            {item.label}
                        </SelectItem>
                    ))}
                </Select>
            <Input isRequired label="Marca del Dispositivo" placeholder="Ej. DELL" variant="bordered" name="deviceBrand"  defaultValue={devices?.deviceBrand} color="primary" classNames={{inputWrapper: "bg-slate-50"}}/>
            <Input isRequired label="Modelo" placeholder="Ej. Latitude 5420" variant="bordered" name="deviceModel" defaultValue={devices?.deviceModel} color="primary" classNames={{inputWrapper: "bg-slate-50"}} />
            <Input label="Hostname" placeholder="OE-00000000" variant="bordered" name="deviceHostName" defaultValue={devices?.deviceHostName ?? ""} color="primary" classNames={{inputWrapper: "bg-slate-50"}} />
            <Input isRequired label="Número de Serie(S/N)" variant="bordered" name="deviceSerialTag" defaultValue={devices?.deviceSerialTag} color="primary" classNames={{inputWrapper: "bg-slate-50"}} />
            <Input label="Número de Activo" placeholder="BMX-0000" variant="bordered" name="deviceAssetNumber" defaultValue={devices?.deviceAssetNumber ?? ""} color="primary" classNames={{inputWrapper: "bg-slate-50"}} />
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
            
            <input type="hidden" name="employee" defaultValue={employeeId} />
            <Autocomplete name="employee" label= "Selecciona un Empleado" placeholder="Escribe para buscar..." color="primary" className="flex-1 bg-slate-50 rounded-2xl" defaultItems={employees}variant="bordered"
                 selectedKey={employeeId || null} onSelectionChange={(key) => setEmployeeId(key as string)} inputValue={employeeInput} onInputChange={setEmployeeInput}>
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
                
                    <Select label="Estatus del Equipo" placeholder="Selecciona el estado" name="deviceStatus"
                    defaultSelectedKeys={[devices.deviceStatus]} variant="bordered" color="primary" classNames={{trigger:"bg-slate-50"}}
                    startContent={<CircleQuestionMark className="text-gray-400" size={18} />} isRequired selectionMode="single" 
                    disallowEmptySelection={true}>
                    <SelectItem key="Stock" color="success" variant="flat" description="El equipo no tiene un Empleado asignado.">
                        Stock
                    </SelectItem>
                    <SelectItem key="BAJA" color="danger" variant="flat" description="El Equipo ya es obsoleto.">
                        BAJA
                    </SelectItem>
                    <SelectItem key="Asignado" color="default" variant="flat" description="El Equipo ha sido asignado a un Empleado.">
                        Asignado
                    </SelectItem>
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
        </>
    )
}