'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavItemProps {
  icon: ReactNode;
  path: string;
}

export const NavItem = ({ icon, path }: NavItemProps) => {
  const pathName = usePathname();
  // Verificamos si la ruta actual coincide exactamente o empieza con el path (para subrutas)
  const isActive = pathName === path || (path !== '/dashboard' && pathName.startsWith(path));

  return (
    <Link href={path} className="w-full flex justify-center">
      <span 
        className={isActive 
          ? "bg-white w-full flex justify-center rounded-md transition-all py-3 shadow-lg shadow-red-800/50 text-red-600" 
          : "w-full py-3 flex justify-center text-gray-300 hover:text-white hover:bg-red-800 rounded-md transition-colors"
        }
      >
        {icon}
      </span>
    </Link>
  );
}

export default NavItem;