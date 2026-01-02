import Image from "next/image"


export default function AuthLayout({children,
}: Readonly<{
  children: React.ReactNode
}>)
{
return (
<div className="bg-red-600 w-screen h-screen overflow-hidden grid">
    <div className="place-content-center place-self-center place-items-center text-center">
        {children}
    </div>
</div>

)
}
