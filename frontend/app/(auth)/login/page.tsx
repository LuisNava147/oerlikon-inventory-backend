'use client'
import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/constants";
import { useFormStatus } from "react-dom";
import { TriangleAlert } from "lucide-react";

function SubmitButton(){
    const {pending} = useFormStatus()
    return(
        <Button type="submit" color="primary" isLoading={pending} disabled={pending} className="font-semibold shadow-md">
            {pending ? "Enviando..." : "Iniciar Sesión"}
        </Button>
    )
    
}

export default function LoginPage(){
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState("");
    const router = useRouter()

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        setSubmitting(true)
        e.preventDefault()
        setError("")
        const formData = new FormData(e.currentTarget);

        const authData = {
            userEmail: formData.get("userEmail"),
            userPassword: formData.get("userPassword")
        }

        try{
            const response = await fetch(`${API_URL}/auth/login`,{
                method: "POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(authData),
                credentials: 'include'
            });
            if(response.status == 201){
                router.push('/dashboard')
            }else{
                setSubmitting(false)
                setError("Credenciales incorrectas o Error de servidor")
            }

        }catch(e){
            setSubmitting(false)
            setError("Error de conexión")
        }
        return;
    }
    return (
        <div className="flex h-screen w-full items-center justify-center">
        <Card className="w-[420px] bg-white border border-slate-200 shadow-2xl flex flex-col gap-2 p-4">
            <CardHeader className="flex flex-col gap-3 items-center w-full pb-0">
                <Image src="/oe-logo.svg" alt="Logo de Oerlikon" priority className="mb-6" width={200} height={50}/>
            </CardHeader>
                <CardBody className="px-6 py-2 overflow-hidden">
                <h1 className="text-2xl font-bold text-slate-800 text-center mb-6">Iniciar Sesión</h1>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-5 w-full mb-8">
                    <Input label= "Correo" name="userEmail" placeholder= "firstname.lastname@oerlikon.com" type="email" isRequired variant="bordered" radius="sm" 
                   classNames={{inputWrapper: "bg-slate-50 border-slate-200 group-data-[focus=true]:border-red-500",
                   label: "text-slate-600 font-medium"}}/>
                    <Input label= "Contraseña" name="userPassword" type="password" isRequired variant="bordered" radius="sm" 
                    classNames={{inputWrapper: "bg-slate-50 border-slate-200 group-data-[focus=true]:border-red-500",
                    label: "text-slate-600 font-medium"}}/>
                    
                    {error && (
                        <div className="flex items-center justify-center gap-2
                         bg-red-50 border border-red-100 text-red-600 px-3 
                         py-2 rounded-lg w-full mb-4 text-xs font-medium animate-fadeIn">
                            <TriangleAlert size={16} />
                            <span>{error}</span>
                        </div>
                        )}
                </div>
                <Button color="primary" variant="solid" className="w-full font-semibold text-lg shadow-md" type="submit" isLoading={submitting} isDisabled={submitting}>{submitting ? "Validando..." : "Iniciar Sesión"}</Button>
            
            </form>
                </CardBody>
        </Card>
        </div>
    )
}