'use strict';

function updateSubTotal() {
    document.getElementById('sumScore').style.backgroundColor = "white";
    var arr = document.getElementsByName('score');
    var tot=0;
    for(var i=0;i<arr.length;i++){
        if(parseInt(arr[i].value))
            tot += parseInt(arr[i].value);
            arr[i].style.backgroundColor = "white";
        }
    document.getElementById('sumScore').innerHTML = tot;
    if (tot>100){
        document.getElementById('sumScore').style.backgroundColor = "#d9361a";
        alert("TOTAL SCORE IS OVER 100")
    }
}