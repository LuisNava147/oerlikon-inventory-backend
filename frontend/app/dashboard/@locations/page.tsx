import { API_URL } from "@/constants";
import { authHeaders } from "@/app/helpers/authHeaders";
import { Location } from "@/entities";
import LocationCard from "./_components/LocationCard";
import SelectLocation from "./_components/SelectLocation";
import FormNewLocation from "./_components/FormNewLocation";
import DeleteLocationButtom from "./_components/DeleteLocationButton";
import UpdateLocation from "./_components/UpdateLocation";
import FormUpdateLocation from "./_components/FormUpdateLocation";
import LocationStats from "./_components/LocationStats";


const LocationPage = async({searchParams}:{searchParams: {[key:string]: string | string[] | undefined}}) => {
    const response = await fetch(`${API_URL}/locations`,{
        headers:{
            ...authHeaders()
        },
        next: {
            tags:["dashboard:locations"]
        }
    });
    let locations: Location[] = await response.json()

    locations= [
        {
            locationId: 0,
            locationName: "Nombre de ubicación",
            locationAddress: "Direccion de ubicación",
            employee: [],
            device: [],
            access_request: []
        },
        ...locations
    ]
    const selectedLocationId = searchParams?.devices;
    const selectedLocation = locations.find(loc => String(loc.locationId) === String(selectedLocationId));

    return(
        <div className="w-full h-auto flex flex-col gap-6">
             <div className="mt-4">
        <h1 className="text-3xl font-bold text-slate-800">Ubicaciones</h1>
        <p className="text-slate-500">Resumen, creación, actualización y eliminación de ubicaciones plantas Oerlikon México</p>
      </div>
            <div className="w-full sticky top-0 z-10 bg-slate-50 pt-2 pb-4 pr-2">
        <SelectLocation locations={locations} devices={searchParams?.devices} />
            </div>
            <div className="w-full pr-2">
        <LocationCard devices={searchParams?.devices} />
        <LocationStats devices={searchParams?.devices} />
      </div>

      <div className="w-full pr-2">
        <FormNewLocation devices={searchParams?.devices} />
        
        <div className="flex flex-row gap-4 justify-center">
          {selectedLocation && (
            <>
            <DeleteLocationButtom locations={selectedLocation} />
            <UpdateLocation locations={selectedLocation} />
            </>
          )}
        </div>
       
      </div>
        </div>
    )
} 

export default LocationPage