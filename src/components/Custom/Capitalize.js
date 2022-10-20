 export const capitalize = (data) => {
     let temp = data.toLowerCase();
     return (temp.charAt(0).toUpperCase() + temp.slice(1));
 }