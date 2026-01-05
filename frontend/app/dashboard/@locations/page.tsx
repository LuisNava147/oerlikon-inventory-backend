'use client';

import { Card, CardHeader, CardBody, Button, Input, Divider } from "@heroui/react";
import { MapPin, Plus, Trash2, Edit, Search } from "lucide-react";
import { useState } from "react";

const initialLocations = [
    { id: 1, name: "Planta Principal", manager: "Carlos Ruiz", code: "P-01" },
    { id: 2, name: "Almacén B", manager: "Ana Lopez", code: "W-02" },
    { id: 3, name: "Oficinas Administrativas", manager: "Luis Navas", code: "O-05" },
  ];
const LocationPage = () => {
    const [locations, setLocations] = useState(initialLocations);
    <div className="h-full flex flex-col gap-6">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-bond text-slate-800 flex items-center gap-2">
                <MapPin className="text-red-600">
                    Gestion de ubicaciones
                </MapPin>
                <Button type="submit" color="primary" size="md" startContent={<Plus size = {16}/>}>
                    Nueva Ubicacion
                </Button>
            </h2>
        </div>
    </div>  
} 

export default LocationPage