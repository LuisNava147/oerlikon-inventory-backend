
import { useEffect, useState } from "react";
import { Skeleton } from "@heroui/react";
import { API_URL } from "@/constants";
import EmployeeStats from "./_components/EmployeesStats";
import DashboardActions from "./_components/DashboardActions";
import StockAlert from "./_components/StockAlert";
import { authHeaders } from "../helpers/authHeaders";

export default async function DashboardPage() {
  
  let allDevices: any[] = [];
  try{
    const response = await fetch(`${API_URL}/devices`,{
      headers:{
        ...authHeaders()
      },
      next:{
        tags:["dashboard:devices"]
      },
      cache: 'no-store'
    })
    const devices = await response.json()
    if(Array.isArray(devices)){
      allDevices = devices
    }
  }catch(error){
    console.error("Error calculando stock: error")
  }

  return (
    <div className="flex flex-col gap-8 pb-10 p-2 md:p-4 max-w-7xl mx-auto w-full">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Panel de Control</h1>
        <p className="text-slate-500">Resumen general del inventario de IT Oerlikon</p>
      </div>

      <EmployeeStats devices="global" />
      <DashboardActions />
      <StockAlert available={allDevices} />
    </div>
  );
}