'use client';

import { Card, CardHeader, CardBody, Divider } from "@heroui/react";
import { Users, Monitor, ShieldAlert } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-800">Resumen Operativo</h2>
      
      {/* Cards de Información */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard 
          title="Empleados" 
          count="342" 
          icon={<Users className="text-blue-600" />} 
          desc="Activos en planta"
        />
        <InfoCard 
          title="Dispositivos" 
          count="1,204" 
          icon={<Monitor className="text-purple-600" />} 
          desc="Asignados y en stock"
        />
        <InfoCard 
          title="Incidentes" 
          count="5" 
          icon={<ShieldAlert className="text-red-500" />} 
          desc="Requieren atención"
        />
      </div>

      {/* Tabla Resumen (Ejemplo) */}
      <Card className="flex-1 shadow-sm border border-gray-200">
        <CardHeader className="font-bold text-slate-700">Últimos Movimientos</CardHeader>
        <Divider/>
        <CardBody>
          <p className="text-gray-400 text-sm">No hay movimientos recientes hoy.</p>
        </CardBody>
      </Card>
    </div>
  );
}

function InfoCard({ title, count, icon, desc }: any) {
  return (
    <Card className="shadow-sm border border-gray-100">
      <CardBody className="flex gap-4 items-center">
        <div className="p-3 bg-gray-50 rounded-lg">{icon}</div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-slate-800">{count}</p>
          <p className="text-xs text-green-600">{desc}</p>
        </div>
      </CardBody>
    </Card>
  )
}