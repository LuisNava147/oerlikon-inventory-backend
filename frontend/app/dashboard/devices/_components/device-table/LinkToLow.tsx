"use client"
import { Tooltip, Button } from "@heroui/react";
import { ArchiveX } from "lucide-react";
import Link from "next/link";


type Category = 'computing' | 'printing' | 'mobile' | 'peripheral'
export const LinkToLow = ({category}:{category: Category}) => {
    return(
        <Tooltip content= "Baja de Equipos">
            <Link href={`/dashboard/devices/baja?category=${category}`}>
                <Button isIconOnly color="primary" variant="light">
                    <ArchiveX size={22}/>
                </Button>
            </Link>
        </Tooltip>
    )
}
