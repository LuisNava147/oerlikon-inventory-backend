import { LayoutDashboard, Users, Monitor, Ticket, FileText, Settings, Printer, Smartphone, Laptop, FileStack, Headset, TriangleAlert } from 'lucide-react';
import NavItem from "./NavItem";

export default function Sidebar() {
  return (
    <nav className="w-1/12 h-screen bg-red-600 flex flex-col items-center p-5 overflow-y-auto">
      
      <div className="flex flex-col gap-3 w-full">
        <NavItem icon={<LayoutDashboard size={28} />} path="/dashboard" />
        <NavItem icon={<Laptop size={28} />} path="/dashboard/devices" />
        <NavItem icon={<Printer size={28} />} path="/dashboard/printers" />
        <NavItem icon={<Smartphone size={28} />} path="/dashboard/smartphones" />
        <NavItem icon={<FileText size={28} />} path="/dashboard/assignments" />
        <NavItem icon={<Users size={28} />} path="/dashboard/employees" />
        <NavItem icon={<FileStack size={28} />} path="/dashboard/access-requests" />
        <NavItem icon={<TriangleAlert size={28} />} path="/dashboard/devices-incidents" />
        <NavItem icon={<Ticket size={28} />} path="/dashboard/ticket-incidents" />
        <NavItem icon={<Headset size={28} />} path="/dashboard/providers" />
      </div>

    </nav>
  );
}