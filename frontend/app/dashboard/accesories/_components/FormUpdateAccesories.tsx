import { updateAccesories } from "@/actions/accesories/update-accesorie"
import { Device, Employee, Location } from "@/entities"
import { Autocomplete, AutocompleteItem, Button, Divider, Input, ModalFooter, Select, SelectItem, Spinner } from "@heroui/react"
import { MapPin, Save } from "lucide-react"
import { useEffect, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"

const DEVICE_TYPE = [
    {key: "Monitor", label:"Monitor"},
    {key: "Mouse", label:"Mouse"},
    {key: "Teclado", label:"Teclado"},
    {key: "Docking", label:"Docking Station"},
    {key: "Diadema", label: "Diadema"},
    {key: "Token", label: "Token"}
]

const initialState = {
    success: false,
    error: null,
  }

  function SubmitButton(){
    const {pending} = useFormStatus()
    return(
        <Button type="submit" color="primary" isLoading={pending} startContent={!pending && <Save size={18}/>} className="font-semibold shadow-md">
            {pending ? "Guardando..." : "Editar Periférico"}
        </Button>
    )
    
}

export default function FormUpdateAccesories({locations, employees, devices, onClose}:{locations:Location[], employees:Employee[], devices:Device, onClose:()=>void}){
    const [employeeId, setEmployeeId] = useState<string>("")
    const [employeeInput, setEmployeeInput] = useState("")
    const [locationId, setLocationId] = useState<string>("")
    const [deviceType, setDeviceType] = useState<string>("");

    const deviceId = devices?.deviceId ? String(devices.deviceId) : ""
    const updateWithDeviceId = updateAccesories.bind(null, deviceId)

    const [state, formAction] = useFormState(updateWithDeviceId, initialState)
    useEffect(()=>{
        if(devices){
            if(devices.employee?.employeeId){
                setEmployeeId(devices.employee.employeeId)
            }
            if(devices.location?.locationId){
                setLocationId(String(devices.location.locationId))
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
        <form action={formAction} className="bg-slate-50 p-6 rounded-none flex flex-col gap-4 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="hidden" name="deviceType" value={deviceType} />
                    <Select label="Tipo de Dispositivo" placeholder="Selecciona uno" variant="bordered" isRequired items={DEVICE_TYPE} className="bg-white rounded-3xl"
                    selectedKeys={deviceType ? [deviceType] : []} onSelectionChange={(keys)=> setDeviceType(Array.from(keys)[0] as string)} color="primary">
                    {DEVICE_TYPE.map((item)=>(
                        <SelectItem key={item.key}>
                            {item.label}
                        </SelectItem>
                    ))}
                </Select>
                <Input isRequired label="Marca del Dispositivo" placeholder="Ej. logitech" variant="bordered" name="deviceBrand" defaultValue={devices?.deviceBrand} color="primary" classNames={{inputWrapper:'bg-white'}}/>
                <Input isRequired label="Modelo"  variant="bordered" name="deviceModel" defaultValue={devices?.deviceModel} color="primary" classNames={{inputWrapper:'bg-white'}}/>
                <Input isRequired label="Número de Serie(S/N)" variant="bordered" name="deviceSerialTag" defaultValue={devices?.deviceSerialTag} color="primary" classNames={{inputWrapper:'bg-white'}}/>
                <Input label="Número de Activo" placeholder="BMX-0000" variant="bordered" name="deviceAssetNumber" defaultValue={devices?.deviceAssetNumber} color="primary" classNames={{inputWrapper:'bg-white'}}/>
            </div>

            <Divider className="my-2"/>

            <div className="flex items-center gap-2 mb-4 text-slate-700">
            <MapPin size={24} className="text-red-600"/>
            <h3 className="text-xl font-bold">Ubicación y Asignación</h3>
            </div> 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input type="hidden" name="location" value={locationId} />
            <Select name="location" selectedKeys={locationId ? [locationId] : []} onSelectionChange={(keys)=> setLocationId(Array.from(keys)[0] as string)}
            label="Selecciona una Ubicación" placeholder="Selecciona una Ubicación" variant="bordered" className="bg-white rounded-2xl">
                {locations.map((loc)=>(
                    <SelectItem key={String(loc.locationId)} textValue={loc.locationName}>
                        {loc.locationName}
                    </SelectItem>
                ))}
            </Select>
            
            <input type="hidden" name="employee" defaultValue={employeeId} />
            <Autocomplete name="employee" label= "Selecciona un Empleado" placeholder="Escribe para buscar..." className="flex-1 bg-white rounded-2xl" defaultItems={employees}variant="bordered"
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