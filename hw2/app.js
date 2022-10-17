/** REFERENCES
 * https://developer.mozilla.org/en-US/docs/Web/CSS/display
 * https://stackoverflow.com/questions/66774779/how-do-you-clear-a-list-in-javascript-i-e-delete-all-items-in-a-list-with-one
 * https://www.geeksforgeeks.org/how-to-creating-html-list-from-javascript-array/
 * 
 */

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

function saveRanks() {
    document.getElementById('Action_screen').style.display = "none";
    document.getElementById('Results').style.display = "list-item";
    document.getElementById('resultSum').innerHTML = document.getElementById('sumScore').innerHTML;
    let res_list = document.getElementById('results_list');
    res_list.innerHTML = "";
    let score_arr = document.getElementsByName('score');
    // need to convert gitIDs to an element before I can retrieve 
    score_arr.forEach((item) => {
        // console.log(item.value);
        let li = document.createElement("li");
        li.innerHTML = item.value;
        res_list.appendChild(li);
    });
    
}

function goBack() {
    document.getElementById('Action_screen').style.display = "contents";
    document.getElementById('Results').style.display = "none";
}
