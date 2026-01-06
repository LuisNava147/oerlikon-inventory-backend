import deleteLocation from "@/actions/locations/delete";
import { API_URL } from "@/constants";
import { Button } from "@heroui/react";
import { Trash2 } from "lucide-react";

export default function DeleteLocationButtom({devices}:{devices?:string | string[]}){
    if(!devices || devices === "0") return null;

   
    return(
        <form action={deleteLocation} className="">
            <Button type="submit" name="deleteValue" color="danger" value={devices} variant="flat">
                <Trash2 size={20}/>
            </Button>
        </form>
       
    )
}