
function dateFormating(datastr){
    const date = new Date(datastr);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
}

export { dateFormating }