'use strict';

function updateSubTotal() {
    document.getElementById('sumScore').style.backgroundColor = "white";
    var arr = document.getElementsByName('score');
    var tot=0;
    for(var i=0;i<arr.length;i++){
        if(parseInt(arr[i].value))
            tot += parseInt(arr[i].value);
            arr[i].style.backgroundColor = "white";
            if (parseInt(arr[i].value) < 0 || parseInt(arr[i].value) > 100){
                alert(arr[i].id + " RANK IS OUT OF RANGE (0-100)");
                arr[i].style.backgroundColor = "#d9361a";
            }
        }
    document.getElementById('sumScore').innerHTML = tot;
    if (tot>100){
        document.getElementById('sumScore').style.backgroundColor = "#d9361a";
        alert("SUM OF RANK IS OVER 100")
    }
    if (tot<0){
        document.getElementById('sumScore').style.backgroundColor = "#d9361a";
        alert("SUM OF RANK IS UNDER 0")
    }
}
