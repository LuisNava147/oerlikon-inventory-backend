'use client';

import { Tooltip } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { title } from "process";
import { ReactNode } from "react";

interface NavItemProps {
  icon: ReactNode;
  path: string;
  title: string
}

export const NavItem = ({ icon, path, title }: NavItemProps) => {
  const pathName = usePathname();
  // Verificamos si la ruta actual coincide exactamente o empieza con el path (para subrutas)
  const isActive = pathName === path || (path !== '/dashboard' && pathName.startsWith(path));

  return (
    <Tooltip content={title} placement="right" color="foreground" closeDelay={0}>
            <Link 
                href={path} 
                className={`p-3 rounded-xl flex justify-center transition-colors ${
                    isActive ? "bg-white text-red-600 shadow-md" : "text-white hover:bg-red-500"
                }`}
            >
                {icon}
            </Link>
      </Tooltip>
  );
}

export default NavItem;