// var btn=document.getElementById("button");
var hexValue=[1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
// btn.addEventListener('click',HexUpdate)
export default () => {
    var hexColor='#';
    for (let i=0;i<6;i++){
        var index=Math.floor(Math.random()*hexValue.length);
        hexColor+=hexValue[index];
        
    }
    return hexColor;
}