import { format, differenceInDays, nextDay, differenceInCalendarDays } from "date-fns";
export default function formateAndAddYear(startDate, yearsToAdd = 1) {
    const today = new Date()
    // const endDate = new Date(startDate);
    let endDate = new Date(startDate);
    const time = new Date().getHours();
    const diff = differenceInCalendarDays(endDate, today)
    // console.log(diff, time)

    
    if (diff == 0) {
        if (time > 18) {        
            const nxtDate = nextDay(new Date(today), -2);
            console.log(nxtDate)
            let endDate =new Date(nxtDate)
            endDate.setDate(
                endDate.getDate(endDate.setFullYear(endDate.getFullYear() + yearsToAdd)) -
                1
            );
            return format(new Date(endDate), "dd/MM/yyyy");
            
        } else if(time <= 18){
            endDate.setDate(
                endDate.getDate(endDate.setFullYear(endDate.getFullYear() + yearsToAdd)) -
                1
            );
            return format(new Date(endDate), "dd/MM/yyyy");
        }


    }
    else if(diff > 0){
        endDate.setDate(
            endDate.getDate(endDate.setFullYear(endDate.getFullYear() + yearsToAdd)) -
            1);
            return format(new Date(endDate), "dd/MM/yyyy");
    }
    
    else{
        
        return format(new Date(today), "dd/MM/yyyy");
    };


    // const endDate = new Date(startDate);
    // endDate.setDate(
    //     endDate.getDate(endDate.setFullYear(endDate.getFullYear() + yearsToAdd)) -
    //     1
    // );
    // return format(new Date(endDate), "MM/dd/yyyy");
}
