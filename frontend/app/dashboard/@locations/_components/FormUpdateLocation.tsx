"use client"
import { updateLocation } from "@/actions/locations/update";
import { API_URL } from "@/constants";
import { Button, Input, Skeleton } from "@heroui/react";
import { Save } from "lucide-react";
import { authHeaders } from "@/app/helpers/authHeaders";
import { Location } from "@/entities";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";

function SubmitButton(){
  const {pending} = useFormStatus()
  return(
      <Button type= "submit" color="primary" className="w-full font-bold shadow-lg shadow-blue-500/30" isLoading={pending}
      startContent={!pending && <Save size={20}/>}>
      {pending ? "Guardando..." : "Guardar Ubicación"}
      </Button>
  )
}

const initialState = { success: false, error: null };

export default function FormUpdateLocation({locations, onClose}:{locations:Location, onClose:()=>void}){
    const locationId = String(locations?.locationId)
    const updateWithId = updateLocation.bind(null, locationId)
    const [state, formAction] = useFormState(updateWithId, initialState)

    useEffect(()=>{
      if(state.success) onClose()
  },[state.success, onClose])
    
  return (
    <form action={formAction} className="flex flex-col gap-4">
      <Input isRequired defaultValue={locations?.locationName} label="Nombre de la ubicación" name="locationName" 
      variant="bordered" color="primary" classNames={{inputWrapper: "bg-slate-50"}}/>
      <Input isRequired defaultValue={locations?.locationAddress} label="Dirección de la ubicación" name="locationAddress" 
      variant="bordered" color="primary" classNames={{inputWrapper: "bg-slate-50"}}/> 
      <div className="flex justify-end gap-2">
                <Button color="danger" variant="light" onPress={onClose}>
                    Cancelar
                </Button>
                <SubmitButton />
            </div>
    </form>
  )    
}