import { NextRequest, NextResponse } from "next/server"
import { TOKEN_NAME } from "./constants"
//reedirecciona a paginas
export default function Middleware(req:NextRequest){
    const token = req.cookies.get(TOKEN_NAME);
    const {pathname} = req.nextUrl;
    
    const isLogin = pathname === "/login";
    const isDashboard = pathname.startsWith('/dashboard');

    if(!token && isDashboard){
            return NextResponse.redirect(new URL('/login', req.url))//reedirecciona a login si no encuentra cookie
    }
    if(token && isLogin){
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    return NextResponse.next()
}