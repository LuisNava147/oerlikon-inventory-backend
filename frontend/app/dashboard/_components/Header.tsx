
import { Button, User } from "@heroui/react";
import { LogOut, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";

export default function Header() {

  return (
    <div className="h-[10vh] bg-red-600 flex flex-row items-center justify-between px-10">
     <Image src="/oe-logo-w.svg" alt="Logo de Oerlikon" className="my-6 bottom-10" width={200} height={0} draggable={false}/>
      
    </div>
  )
}