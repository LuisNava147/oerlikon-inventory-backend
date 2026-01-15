'use client'
import { Card, CardBody } from "@heroui/react";
import { Laptop2, PlusCircle, TriangleAlert, Users } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function QuickAction({icon,title,href,color}:{icon:ReactNode, title: string, href: string, color: string}){
    return(
        <>
        <Link href={href}>
            <Card className={`border border-slate-200 transition-all cursor-pointer shadow-md h-full group ${color}`}>
                <CardBody className="flex flex-col items-center justify-center text-center gap-3 p-6">
                    <div className="transform group-hover: scale-110 transition-transform duration-300">
                        {icon}
                    </div>
                    <span className="font-bold text-sm  text-slate-600 group-hover:text-inherit">
                        {title}
                    </span>
                </CardBody>
            </Card>
        </Link>
        </>
        
    )
}