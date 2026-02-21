
import { Deparment, Device, Employee, Location } from "@/entities"
import { Autocomplete, AutocompleteItem, Button, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Spinner, Tooltip, useDisclosure } from "@heroui/react"
import { CircleQuestionMark, MapPin, Pencil, Save } from "lucide-react"
import { useEffect, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { updatePrinter } from "@/actions/printers/printer-update"


const DEVICE_TYPE = [
    {key:"Printer", label:"Printer"},
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

export default function FormUpdatePrinter({locations=[], departments=[], devices, onClose}:{locations: Location[], departments: Deparment[], devices: Device, onClose: ()=>void}){
    
    const [departmentId, setDepartmentId] = useState<string>("");
    const [departmentInput, setDepartmentInput] = useState("")
    const [locationId, setLocationId] = useState<string>("")
    const [deviceType, setDeviceType] = useState<string>("");

    const deviceId = devices?.deviceId ? String(devices.deviceId) : ""
    const updateWithDeviceId = updatePrinter.bind(null, deviceId)

    const [state, formAction] = useFormState(updateWithDeviceId, initialState)
    useEffect(()=>{
        if(devices){
            if(devices.department?.departmentId){
                setDepartmentId(String(devices.department.departmentId))
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
        if(departments.length > 0 && departmentId){
            const found = departments.find((e)=> String(e.departmentId) === String(departmentId))
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

    if(!devices) return <Spinner />

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
            <Input label="Hostname" placeholder="OE-00000000" variant="bordered" name="deviceHostName" defaultValue={devices?.deviceHostName ?? ""} color="primary" classNames={{inputWrapper: "bg-slate-50"}}/>
            <Input isRequired label="Número de Serie(S/N)" variant="bordered" name="deviceSerialTag" defaultValue={devices?.deviceSerialTag} color="primary" classNames={{inputWrapper: "bg-slate-50"}} />
            <Input label="Número de Activo" placeholder="BMX-0000" variant="bordered" name="deviceAssetNumber" defaultValue={devices?.deviceAssetNumber ?? ""} color="primary" classNames={{inputWrapper: "bg-slate-50"}} />
            <Input label="Dirección IP" placeholder="Ej. 10.52.0.0" variant="bordered" name="ipAddress" defaultValue={devices?.ipAddress} color="primary" classNames={{inputWrapper: "bg-slate-50"}} />
            <Input label="Nombre en SAP" placeholder="Ej. MX90" variant="bordered" name="sapName" defaultValue={devices?.sapName} color="primary" classNames={{inputWrapper: "bg-slate-50"}} />
            <Input label="Dirección MAC" variant="bordered" name="deviceMAC" defaultValue={devices?.deviceMAC} color="primary" classNames={{inputWrapper: "bg-slate-50"}} />
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

                    <Select label="Estatus del Equipo" placeholder="Selecciona el estado" name="deviceStatus" 
                    defaultSelectedKeys={[devices.deviceStatus]} variant="bordered" color="primary" classNames={{trigger:"bg-slate-50"}}
                    startContent={<CircleQuestionMark className="text-gray-400" size={18} />} isRequired>
                    <SelectItem key="Stock" color="success" variant="flat" description="La impresora no tiene un Departamento asignado.">
                        Stock
                    </SelectItem>
                    <SelectItem key="BAJA" color="danger" variant="flat" description="La impresora ya es obsoleta o está dañada.">
                        BAJA
                    </SelectItem>
                    <SelectItem key="Asignado" color="default" variant="flat" description="La impresora ha sido asignada a un Departamento.">
                        Asignado
                    </SelectItem>
                    </Select>
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