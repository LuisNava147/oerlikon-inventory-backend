'use client';

import { Tooltip } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { title } from "process";
import { ReactNode } from "react";

interface NavItemProps {
  icon: ReactNode;
  path: string;
  title: string;
  isActive?: boolean
}

export const NavItem = ({ icon, path, title, isActive: externalActive }: NavItemProps) => {
  const pathName = usePathname();
  //si mandan 'isActive' manual, se usa esto, sino se verifica si el pathname empieza con mi path (sub rutas)
  const active = externalActive !== undefined ? externalActive : pathName === path || (path !== '/dashboard' && pathName.startsWith(path));
 
  return (
    <Tooltip content={title} placement="right" color="foreground" closeDelay={0}>
            <Link 
                href={path} 
                className={`p-3 rounded-xl flex justify-center transition-colors ${
                    active ? "bg-white text-red-600 shadow-md" : "text-white hover:bg-red-500"
                }`}
            >
                {icon}
            </Link>
      </Tooltip>
  );
}

export default NavItem;