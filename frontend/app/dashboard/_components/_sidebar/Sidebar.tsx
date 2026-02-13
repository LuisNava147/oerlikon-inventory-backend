import { LayoutDashboard, Users, Monitor, Ticket, FileText, Settings, Printer, Smartphone, Laptop, FileStack, Headset, TriangleAlert, Keyboard, BriefcaseBusiness } from 'lucide-react';
import NavItem from "./NavItem";

export default function Sidebar() {
  return (
    <nav className="w-1/12 h-screen bg-red-600 flex flex-col items-center p-5 overflow-y-auto">
      
      <div className="flex flex-col gap-3 w-full">
        <NavItem icon={<LayoutDashboard size={28} />} path="/dashboard" title="Dashboard" />
        <NavItem icon={<Laptop size={28} />} path="/dashboard/devices" title="Equipos" />
        <NavItem icon={<Printer size={28} />} path="/dashboard/printers" title="Impresoras"/>
        <NavItem icon={<Smartphone size={28} />} path="/dashboard/smartphones" title="Dispositivos" />
        <NavItem icon={<Keyboard size={28} />} path="/dashboard/accesories" title="Accesorios/Periféricos" />
        <NavItem icon={<Users size={28} />} path="/dashboard/employees" title="Empleados" />
        <NavItem icon={<FileText size={28} />} path="/dashboard/assignments" title="Responsivas" />
        <NavItem icon={<FileStack size={28} />} path="/dashboard/access-requests" title="Acceso a Proveedor" />
        <NavItem icon={<TriangleAlert size={28} />} path="/dashboard/incidents" title="Reporte de Incidencias" />
        <NavItem icon={<Ticket size={28} />} path="/dashboard/ticket-incidents" title="Reporte de Tickets" />
      </div>

    </nav>
  );
}