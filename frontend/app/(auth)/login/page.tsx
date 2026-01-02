import { Button, Input } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage(){
    return (
        <div className="bg-white px-100 px-20 py-2 rounded-md">
            <Image src="/oe-logo.svg" alt="Logo de Oerlikon" className="my-6 bottom-10" width={200} height={0}/>
            <p className="text-2xl my-4 text-black">Iniciar Sesión</p>
            <div className="flex flex-col gap-3 my-5 items-center">
                <Input label= "Correo" placeholder= "firstname.lastname@oerlikon.com" type="email" isRequired={true} className="text-2xl"/>
                <Input label= "Contraseña" type="password" isRequired={true} size="sm" />
            </div>
        <Button color="primary" variant="solid" className="text-xl" type="submit">Iniciar Sesion</Button>
        <p className="my-6"><Link href="/signup" className="text-red-500 underline">Registrate</Link></p>
        </div>
    )
}