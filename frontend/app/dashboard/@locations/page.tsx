import { API_URL } from "@/constants";
import { authHeaders } from "@/app/helpers/authHeaders";
import { Location } from "@/entities";
import LocationCard from "./_components/LocationCard";
import SelectLocation from "./_components/SelectLocation";
import FormNewLocation from "./_components/FormNewLocation";
import DeleteLocationButtom from "./_components/DeleteLocationButton";
import UpdateLocation from "./_components/UpdateLocation";
import FormUpdateLocation from "./_components/FormUpdateLocation";


const LocationPage = async({searchParams}:{searchParams: {[key:string]: string | string[] | undefined}}) => {
    const response = await fetch(`${API_URL}/locations`,{
        headers:{
            ...authHeaders()
        },
        next: {
            tags:["dashboard:locations"]
        }
    });
    let data: Location[] = await response.json()

    data= [
        {
            locationId: 0,
            locationName: "Nombre de ubicación",
            locationAddress: "Direccion de ubicación",
            employee: [],
            device: [],
            provider: [],
            access_request: []
        },
        ...data
    ]
    
    return(
        <div className="w-full h-auto flex flex-col gap-6">
            <div className="w-full sticky top-0 z-10 bg-slate-50 pt-2 pb-4 pr-2">
        <SelectLocation locations={data} devices={searchParams?.devices} />
            </div>
            <div className="w-full pr-2">
        <LocationCard devices={searchParams?.devices} />
      </div>

      <div className="w-full pr-2">
        <FormNewLocation devices={searchParams?.devices} />
        
        <div className="flex flex-row gap-4 justify-center">
          <DeleteLocationButtom devices={searchParams?.devices} />
          
          <UpdateLocation devices={searchParams?.devices}>
            <FormUpdateLocation devices={searchParams?.devices} />
          </UpdateLocation>
        </div>
      </div>
        </div>
    )
} 

export default LocationPage