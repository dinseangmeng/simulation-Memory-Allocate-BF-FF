export default (obj) =>{
    let sum=0;
    obj.forEach(element => {
        sum+=element.size;
    });
    return sum;
}


