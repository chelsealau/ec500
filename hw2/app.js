'use strict';

function updateSubTotal() {
    var arr = document.getElementsByName('score');
    var tot=0;
    for(var i=0;i<arr.length;i++){
        if(parseInt(arr[i].value))
            tot += parseInt(arr[i].value);
    console.log(tot)
    }
    document.getElementById('sumScore').innerHTML = tot;
}