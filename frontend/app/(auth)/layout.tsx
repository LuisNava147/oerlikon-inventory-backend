

export default function AuthLayout({children,
}: Readonly<{
  children: React.ReactNode
}>)
{
return <div className="bg-red-300 w-screen h-screen overflow-hidden grid">{children}</div>
}
