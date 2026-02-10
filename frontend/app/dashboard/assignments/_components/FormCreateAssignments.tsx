"use client";

import { createAssignment } from "@/actions/assignments/assignment-create";
import { Device, Employee } from "@/entities";
import { Autocomplete, AutocompleteItem, Button, Input, ModalFooter, ScrollShadow } from "@heroui/react";
import { Calendar, Save, User, Monitor, Plus, X } from "lucide-react";
import { useEffect, useState, Key, useMemo } from "react";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton({ isDisabled }: { isDisabled: boolean }) {
    const { pending } = useFormStatus();
    return (
      <Button 
        type="submit" 
        color="primary" 
        isLoading={pending} 
        isDisabled={isDisabled || pending} 
        startContent={!pending && <Save size={18} />} 
        className="font-semibold shadow-md"
      >
        {pending ? "Guardando..." : "Generar Responsiva"}
      </Button>
    );
}

interface Props {
  employees: Employee[];
  devices: Device[];
  onClose: () => void;
}

export default function FormCreateAssignment({ employees, devices, onClose }: Props) {
  const [state, formAction] = useFormState(createAssignment, { success: false, error: null });

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");
  const [selectedDevices, setSelectedDevices] = useState<Device[]>([]);
  
  //Permitimos null | undefined para evitar el error rojo de TS
  const [currentDeviceKey, setCurrentDeviceKey] = useState<Key | null | undefined>(null);

  // Filtramos: Mostramos solo equipos que NO hayan sido seleccionados aún
  const filteredDevices = useMemo(() => {
    // 1. Si no hay empleado seleccionado, no mostramos nada (o podrías mostrar los 'Disponibles' si quisieras)
    if (!selectedEmployeeId) return [];

    return devices.filter((d) => {
        // 2. Condición 1: Que el equipo pertenezca al usuario seleccionado
        const isAssignedToUser = d.employee?.employeeId === selectedEmployeeId || d.employee?.employeeId === selectedEmployeeId;

        // 3. Condición 2: Que no lo hayamos agregado ya a la lista visual de abajo
        const isNotSelectedYet = !selectedDevices.find((sd) => sd.deviceId === d.deviceId);

        return isAssignedToUser && isNotSelectedYet;
    });
  }, [devices, selectedEmployeeId, selectedDevices]);

  // Agregar equipo a la lista visual
  const handleAddDevice = () => {
    if (!currentDeviceKey) return;
    
    const deviceToAdd = devices.find((d) => d.deviceId === currentDeviceKey);
    
    if (deviceToAdd) {
      setSelectedDevices([...selectedDevices, deviceToAdd]);
      setCurrentDeviceKey(null); // Limpiamos el select
    }
  };

  // Quitar equipo de la lista visual
  const handleRemoveDevice = (idToRemove: string) => {
    setSelectedDevices(selectedDevices.filter((d) => d.deviceId !== idToRemove));
  };

  // Cerrar modal si fue exitoso
  useEffect(() => {
    if (state?.success) onClose();
  }, [state?.success, onClose]);

  useEffect(() => {
    setSelectedDevices([]);
    setCurrentDeviceKey(null);
  }, [selectedEmployeeId]);

    return (
        <form action={formAction} className="flex flex-col gap-4">
          
          <input type="hidden" name="employee" value={selectedEmployeeId} />
    
          <Autocomplete
            label="Empleado"
            placeholder="Buscar empleado..."
            variant="bordered"
            isRequired
            defaultItems={employees}
            onSelectionChange={(key) => setSelectedEmployeeId(key as string)}
            startContent={<User className="text-gray-400" size={18} />}
            inputProps={{ classNames: { inputWrapper: "bg-white" } }}
            color="primary"
          >
            {(item) => (
              <AutocompleteItem key={item.employeeId} textValue={`${item.employeeName} ${item.employeeLastName}`}>
                <div className="flex flex-col">
                  <span className="text-small font-bold">{item.employeeName} {item.employeeLastName}</span>
                  <span className="text-tiny text-default-400">{item.employeeEmail}</span>
                </div>
              </AutocompleteItem>
            )}
          </Autocomplete>
    
          <Input
            type="date"
            label="Fecha de Asignación"
            name="assignmentDate"
            variant="bordered"
            isRequired
            defaultValue={new Date().toISOString().split('T')[0]}
            classNames={{ inputWrapper: "bg-white" }}
            startContent={<Calendar className="text-gray-400" size={18} />}
            color="primary"
          />
    
          <div className="border-t border-gray-200 my-1"></div>
    
          <div className="flex gap-2 items-top">
            <Autocomplete
              label="Agregar Dispositivo"
              // Cambiamos el placeholder dinámicamente
              placeholder={selectedEmployeeId ? "Seleccione equipos del usuario..." : "Primero seleccione un empleado"}
              variant="bordered"
              defaultItems={filteredDevices} 
              key={selectedEmployeeId} 
              selectedKey={currentDeviceKey}
              onSelectionChange={setCurrentDeviceKey}
              isDisabled={!selectedEmployeeId} // Bloqueamos si no hay empleado
              startContent={<Monitor className="text-gray-400" size={18} />}
              inputProps={{ classNames: { inputWrapper: "bg-white" } }}
              className="flex-1"
              color="primary"
            >
              {(item) => (
                <AutocompleteItem key={item.deviceId} textValue={`${item.deviceType} - ${item.deviceSerialTag}`}>
                   <div className="flex flex-col">
                    <span className="text-small font-bold">{item.deviceType} {item.deviceBrand}</span>
                    <span className="text-tiny text-default-500">{item.deviceModel} (SN: {item.deviceSerialTag})</span>
                  </div>
                </AutocompleteItem>
              )}
            </Autocomplete>
            
            <Button 
                isIconOnly 
                color="primary" 
                variant="flat" 
                className="h-[56px] w-[56px]" 
                onPress={handleAddDevice} 
                isDisabled={!currentDeviceKey}
            >
                <Plus size={24}/>
            </Button>
          </div>
    
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200 min-h-[100px]">
            {selectedDevices.length === 0 ? (
                 <div className="text-center text-gray-400 text-sm py-4 italic">
                    {selectedEmployeeId 
                        ? "Seleccione los equipos a incluir en la responsiva." 
                        : "Seleccione un empleado para ver sus equipos."}
                 </div>
            ) : (
                <ScrollShadow className="max-h-[150px]">
                    <div className="flex flex-col gap-2">
                        {selectedDevices.map(dev => (
                            <div key={dev.deviceId} className="flex justify-between items-center bg-white p-2 rounded shadow-sm border border-gray-100">
                                <div className="flex flex-col">
                                    <span className="text-sm font-semibold text-gray-700">
                                        {dev.deviceType} {dev.deviceBrand}
                                    </span>
                                    <span className="text-[10px] text-gray-400">
                                        SN: {dev.deviceSerialTag}
                                    </span>
                                </div>
                                <button 
                                    type="button" 
                                    onClick={() => handleRemoveDevice(dev.deviceId)} 
                                    className="text-red-400 hover:text-red-600 transition-colors p-1"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </ScrollShadow>
            )}
          </div>
    
          <input type="hidden" name="deviceIds" value={selectedDevices.map(d => d.deviceId).join(',')} />
    
          {state?.error && (
            <p className="text-red-600 text-sm text-center bg-red-50 p-2 rounded border border-red-100">
                {state.error}
            </p>
          )}
    
          <ModalFooter className="px-0 pt-2">
            <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
            </Button>
            <SubmitButton isDisabled={selectedDevices.length === 0 || !selectedEmployeeId} />
          </ModalFooter>
        </form>
      );
}