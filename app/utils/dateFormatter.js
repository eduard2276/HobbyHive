import { format } from "date-fns";

const dateFormatter = (date) =>{
    if(date)
    {
        const newDate = new Date(date)
        var formattedDate = format(date, "dd/MM");
        return formattedDate
    }
    return ""
}

export {dateFormatter}