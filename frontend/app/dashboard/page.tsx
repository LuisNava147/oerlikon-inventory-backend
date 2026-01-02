'use client';

import { Card, CardBody } from "@heroui/react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="w-full bg-blue-900 rounded-2xl p-8 shadow-xl text-white">
        <h1 className="text-3xl font-bold mb-2">Panel de Control</h1>
        <p className="opacity-80">Bienvenido al sistema de gestión.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tarjetas de ejemplo estilo OXXO Dashboard */}
        <Card className="h-40 bg-white shadow-md border-l-4 border-blue-600">
            <CardBody className="flex items-center justify-center">
                <p className="text-gray-500">Inventario Total</p>
                <p className="text-4xl font-bold text-slate-800">1,240</p>
            </CardBody>
        </Card>
        
        <Card className="h-40 bg-white shadow-md border-l-4 border-green-600">
            <CardBody className="flex items-center justify-center">
                <p className="text-gray-500">Asignaciones Activas</p>
                <p className="text-4xl font-bold text-slate-800">85</p>
            </CardBody>
        </Card>

        <Card className="h-40 bg-white shadow-md border-l-4 border-red-500">
            <CardBody className="flex items-center justify-center">
                <p className="text-gray-500">Incidentes Pendientes</p>
                <p className="text-4xl font-bold text-slate-800">3</p>
            </CardBody>
        </Card>
      </div>
    </div>
  );
}