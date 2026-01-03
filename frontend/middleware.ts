import { NextRequest, NextResponse } from "next/server"
import { TOKEN_NAME } from "./constants"
//reedirecciona a paginas
export default function Middleware(req:NextRequest){
    const token = req.cookies.get(TOKEN_NAME)?.value;
    if(req.nextUrl.pathname.startsWith('/dasboard')){
        if(!token){
            return NextResponse.redirect(new URL('/login',req.url))//reedirecciona a login si no encuentra cookie
        }
    }
    if(req.nextUrl.pathname == '/'){
        return NextResponse.redirect(new URL('/dasboard', req.url))
    }
    return NextResponse.next()
}