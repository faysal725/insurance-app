import { format } from "date-fns";
export default function formateAndAddYear(startDate, yearsToAdd = 1) {
    const endDate = new Date(startDate);
    endDate.setDate(
        endDate.getDate(endDate.setFullYear(endDate.getFullYear() + yearsToAdd)) -
        1
    );
    return format(new Date(endDate), "MM/dd/yyyy");
}
