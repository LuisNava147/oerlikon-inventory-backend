'use client';

import { Location } from "@/entities";
import { Select, SelectItem } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SelectLocation({locations, devices}:{locations: Location[], devices: string | string[] | undefined}){
    const router = useRouter();
    const selectedValue = devices ? String(devices) : "";
    return(
        <Select placeholder="Selecciona una sede" label="Ubicación" classNames={{mainWrapper: "hover:ring-2 ring-red-300 rounded-xl transition-all"}}
        selectedKeys={selectedValue ? [selectedValue] : []} onChange={((e)=>{
            if(e.target.value == "0"){
                router.push('/dashboard')
            }else{
                router.push(`/dashboard?devices=${e.target.value}`)
            }
        })}
        >
            {locations.map((loc)=>{
                return(
                    <SelectItem key={String(loc.locationId)} textValue={loc.locationName}>
                        {loc.locationName}
                    </SelectItem>
                )
            })}
        </Select>
    )
}