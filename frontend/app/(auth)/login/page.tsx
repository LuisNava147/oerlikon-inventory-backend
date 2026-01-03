'use client'
import { Button, Input } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/constants";

export default function LoginPage(){
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter()
    const handleSubmit = async (e:any) => {
        setSubmitting(true)
        e.preventDefault()
        const formData = new FormData(e.target);
        let authData : any = {}
        authData.userEmail = formData.get("userEmail")
        authData.userPassword = formData.get("userPassword")
        try{
            const response = await fetch(`${API_URL}/auth/login`,{
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(authData),
                credentials: 'include'
            });
            if(response.status == 201) router.push('/dashboard');
            setSubmitting(false)    

        }catch(e){
            setSubmitting(false)
        }
        return;
    }
    return (
        <form className="bg-white px-100 px-20 py-2 rounded-md" onSubmit={handleSubmit}>
            <Image src="/oe-logo.svg" alt="Logo de Oerlikon" className="my-6 bottom-10" width={200} height={0}/>
            <p className="text-2xl my-4 text-black">Iniciar Sesión</p>
            <div className="flex flex-col gap-3 my-5 items-center">
                <Input label= "Correo" name="userEmail" placeholder= "firstname.lastname@oerlikon.com" type="email" isRequired={true} className="text-2xl"/>
                <Input label= "Contraseña" name="userPassword" type="password" isRequired={true} size="sm" />
            </div>
        <Button color="primary" variant="solid" className="text-xl" type="submit" disabled={submitting}>{submitting ? "Enviando..." : "Iniciar Sesión"}</Button>
        <p className="my-6"><Link href="/signup" className="text-red-500 underline">Registrate</Link></p>
        </form>
    )
}