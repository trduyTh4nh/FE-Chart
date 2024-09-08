
export function convertDate(dateStr) {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString('en-GB'); 
    return formattedDate
}