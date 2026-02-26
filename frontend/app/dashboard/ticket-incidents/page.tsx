
import { API_URL } from "@/constants";
import { TicketIncident } from "@/entities";
import { authHeaders } from "@/app/helpers/authHeaders";
import SearchTickets from "./_components/SearchTickets";
import TicketList from "./_components/TicketList";
import CreateTicketIncident from "./_components/CreateTicket";

export default async function TicketPage({searchParams}:{searchParams: {[key:string]: string | string[] | undefined}}){

    let tickets: TicketIncident[] = []
    const query = typeof searchParams?.q === 'string' ? searchParams.q : ""

    const response = await fetch(`${API_URL}/ticket-incidents`, {
        headers:{
            ...authHeaders(),
        },
        cache: 'no-store'
    })

    if(response.ok){
        const data = await response.json()
        const rawDepartments = Array.isArray(data) ? data : [data]

        tickets = rawDepartments.filter((t: TicketIncident) => {
            if(!query) return true
                return t.ticketName.toLowerCase().includes(query.toLowerCase())
        })
    }

    return (
        <div className="w-full h-full flex flex-col gap-8 mt-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                <h1 className="text-3xl font-bold text-slate-800 ml-4">Gestión de Tickets</h1>
                <p className="text-slate-500 ml-4">Administra los tickets activos de la planta ({tickets.length} tickets encontrados) </p>
                </div>
                <div className="rounded-md mt-6 flex md:flex-row gap-3">
                    <CreateTicketIncident />
                </div>
            </div>
            
                
                <SearchTickets />
             
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-2">
                    <TicketList tickets={tickets}/>
                </div>
            
        </div>
    )
}