/** REFERENCES
 * https://developer.mozilla.org/en-US/docs/Web/CSS/display
 * https://stackoverflow.com/questions/66774779/how-do-you-clear-a-list-in-javascript-i-e-delete-all-items-in-a-list-with-one
 * https://www.geeksforgeeks.org/how-to-creating-html-list-from-javascript-array/
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 * https://www.tutorialkart.com/javascript/javascript-convert-map-to-json-string/#:~:text=To%20convert%20a%20map%20to,stringify()%20method.
 * https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
 * https://bobbyhadz.com/blog/javascript-replace-all-commas-in-string#:~:text=Use%20the%20replace()%20method,replaced%20by%20the%20provided%20replacement.&text=Copied!,-const%20str%20%3D%20'
 */

 'use strict';

 /**
  * click loginButton when KEY ENTER is pressed 
  * while cursor is on input box password
  */
//  document.getElementById("password")
//      .addEventListener("keyup", function(event) {
//      event.preventDefault();
//      if (event.keyCode === 13) {
//          document.getElementById("loginButton").click();
//      }
//  })
 
//  /**
//   * click loginButton when KEY ENTER is pressed 
//   * while cursor is on input box WikiName
//   */
//  document.getElementById("WikiName")
//      .addEventListener("keyup", function(event) {
//      event.preventDefault();
//      if (event.keyCode === 13) {
//          document.getElementById("loginButton").click();
//      }
//  })
 /**
  * click SET when KEY ENTER is pressed 
  * while cursor is on input box maxSun
  */

//  window.location.href = "findGroupings.html";

//  document.getElementById("maxSum")
//      .addEventListener("keyup", function(event) {
//      event.preventDefault();
//      if (event.keyCode === 13) {
//          document.getElementById("setButton").click();
//      }
//  })
 /**
  * click SET when KEY ENTER is pressed 
  * while cursor is on input box maxRank
  */
//  document.getElementById("maxRank")
//      .addEventListener("keyup", function(event) {
//      event.preventDefault();
//      if (event.keyCode === 13) {
//          document.getElementById("setButton").click();
//      }
//  })
 
 /**
  * attepnt to use the Redis Server with inputed password
  * @returns if successful return "" else return with "ERROR"
  */
 const makeRequest = async () => {
     let js_mess = document.getElementById("message").value;
     let js_salt = salt_Password();
     let js_hash = md5(js_salt);
     let data = {"salt" : js_salt, "hash" : js_hash, "message" : js_mess };
     let url = new URL("https://agile.bu.edu/ec500_scripts/redis.php");
     let searchParams = new URLSearchParams(data);
     url.search = searchParams.toString();
     const response = await fetch(url);
     if (response.ok) {
         var text = await response.text();
     } else {
         var text = "HTTP-ERROR: " + response.status;
     }
     text = text.split("Result:");
     const result = text[text.length-1]
     return result
 }
 
 /**
  * check if password is valid
  */
 async function checkLogin() {
     let requestRes = await makeRequest();
     if (!(requestRes.includes("ERROR"))) {
         if (document.getElementById("login_screen").style.display == "contents" && requestRes) {
             document.getElementById("login_screen").style.display = "none";
             document.getElementById("auction_screen").style.display = "contents";
             document.getElementById("displayName").innerHTML = document.getElementById("WikiName").value;
         }
     }
     document.getElementById("fail_login").style.display = "contents";
 }
 
 /**
  * create salt that will be added on to the password
  * @returns salt
  */
 function salt_Password() {
     const n = 32;
     var lettersSetArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", 
                         "r", "s", "t", "u", "v", "w", "x", "y", "z"];
     var passwordArray = [];
 
     for (var i = 0; i < n; i++) {
         var select = Math.round(Math.random() * 2);
         if (select === 0) {
             passwordArray[i] = lettersSetArray[Math.floor(Math.random()*lettersSetArray.length)].toUpperCase();
         }
         else if (select == 1){
             passwordArray[i] = lettersSetArray[Math.floor(Math.random()*lettersSetArray.length)];
         }
         else {
             passwordArray[i] = Math.round(Math.random() * 9);
         }
     }
     let salt = passwordArray.join("");
     return salt;
 };
 
 /**
  * A formatted version of a popular md5 implementation.
  * Original copyright (c) Paul Johnston & Greg Holt.
  * @param {*} salt salt that will be added to the password before encrypted
  * @returns encrypted password
  */
 function md5(salt) {
     var inputString = salt + document.getElementById("password").value;
     var hc="0123456789abcdef";
     function rh(n) {var j,s="";for(j=0;j<=3;j++) s+=hc.charAt((n>>(j*8+4))&0x0F)+hc.charAt((n>>(j*8))&0x0F);return s;}
     function ad(x,y) {var l=(x&0xFFFF)+(y&0xFFFF);var m=(x>>16)+(y>>16)+(l>>16);return (m<<16)|(l&0xFFFF);}
     function rl(n,c)            {return (n<<c)|(n>>>(32-c));}
     function cm(q,a,b,x,s,t)    {return ad(rl(ad(ad(a,q),ad(x,t)),s),b);}
     function ff(a,b,c,d,x,s,t)  {return cm((b&c)|((~b)&d),a,b,x,s,t);}
     function gg(a,b,c,d,x,s,t)  {return cm((b&d)|(c&(~d)),a,b,x,s,t);}
     function hh(a,b,c,d,x,s,t)  {return cm(b^c^d,a,b,x,s,t);}
     function ii(a,b,c,d,x,s,t)  {return cm(c^(b|(~d)),a,b,x,s,t);}
     function sb(x) {
         var i;var nblk=((x.length+8)>>6)+1;var blks=new Array(nblk*16);for(i=0;i<nblk*16;i++) blks[i]=0;
         for(i=0;i<x.length;i++) blks[i>>2]|=x.charCodeAt(i)<<((i%4)*8);
         blks[i>>2]|=0x80<<((i%4)*8);blks[nblk*16-2]=x.length*8;return blks;
     }
     var i,x=sb(inputString),a=1732584193,b=-271733879,c=-1732584194,d=271733878,olda,oldb,oldc,oldd;
     for(i=0;i<x.length;i+=16) {olda=a;oldb=b;oldc=c;oldd=d;
         a=ff(a,b,c,d,x[i+ 0], 7, -680876936);d=ff(d,a,b,c,x[i+ 1],12, -389564586);c=ff(c,d,a,b,x[i+ 2],17,  606105819);
         b=ff(b,c,d,a,x[i+ 3],22,-1044525330);a=ff(a,b,c,d,x[i+ 4], 7, -176418897);d=ff(d,a,b,c,x[i+ 5],12, 1200080426);
         c=ff(c,d,a,b,x[i+ 6],17,-1473231341);b=ff(b,c,d,a,x[i+ 7],22,  -45705983);a=ff(a,b,c,d,x[i+ 8], 7, 1770035416);
         d=ff(d,a,b,c,x[i+ 9],12,-1958414417);c=ff(c,d,a,b,x[i+10],17,     -42063);b=ff(b,c,d,a,x[i+11],22,-1990404162);
         a=ff(a,b,c,d,x[i+12], 7, 1804603682);d=ff(d,a,b,c,x[i+13],12,  -40341101);c=ff(c,d,a,b,x[i+14],17,-1502002290);
         b=ff(b,c,d,a,x[i+15],22, 1236535329);a=gg(a,b,c,d,x[i+ 1], 5, -165796510);d=gg(d,a,b,c,x[i+ 6], 9,-1069501632);
         c=gg(c,d,a,b,x[i+11],14,  643717713);b=gg(b,c,d,a,x[i+ 0],20, -373897302);a=gg(a,b,c,d,x[i+ 5], 5, -701558691);
         d=gg(d,a,b,c,x[i+10], 9,   38016083);c=gg(c,d,a,b,x[i+15],14, -660478335);b=gg(b,c,d,a,x[i+ 4],20, -405537848);
         a=gg(a,b,c,d,x[i+ 9], 5,  568446438);d=gg(d,a,b,c,x[i+14], 9,-1019803690);c=gg(c,d,a,b,x[i+ 3],14, -187363961);
         b=gg(b,c,d,a,x[i+ 8],20, 1163531501);a=gg(a,b,c,d,x[i+13], 5,-1444681467);d=gg(d,a,b,c,x[i+ 2], 9,  -51403784);
         c=gg(c,d,a,b,x[i+ 7],14, 1735328473);b=gg(b,c,d,a,x[i+12],20,-1926607734);a=hh(a,b,c,d,x[i+ 5], 4,    -378558);
         d=hh(d,a,b,c,x[i+ 8],11,-2022574463);c=hh(c,d,a,b,x[i+11],16, 1839030562);b=hh(b,c,d,a,x[i+14],23,  -35309556);
         a=hh(a,b,c,d,x[i+ 1], 4,-1530992060);d=hh(d,a,b,c,x[i+ 4],11, 1272893353);c=hh(c,d,a,b,x[i+ 7],16, -155497632);
         b=hh(b,c,d,a,x[i+10],23,-1094730640);a=hh(a,b,c,d,x[i+13], 4,  681279174);d=hh(d,a,b,c,x[i+ 0],11, -358537222);
         c=hh(c,d,a,b,x[i+ 3],16, -722521979);b=hh(b,c,d,a,x[i+ 6],23,   76029189);a=hh(a,b,c,d,x[i+ 9], 4, -640364487);
         d=hh(d,a,b,c,x[i+12],11, -421815835);c=hh(c,d,a,b,x[i+15],16,  530742520);b=hh(b,c,d,a,x[i+ 2],23, -995338651);
         a=ii(a,b,c,d,x[i+ 0], 6, -198630844);d=ii(d,a,b,c,x[i+ 7],10, 1126891415);c=ii(c,d,a,b,x[i+14],15,-1416354905);
         b=ii(b,c,d,a,x[i+ 5],21,  -57434055);a=ii(a,b,c,d,x[i+12], 6, 1700485571);d=ii(d,a,b,c,x[i+ 3],10,-1894986606);
         c=ii(c,d,a,b,x[i+10],15,   -1051523);b=ii(b,c,d,a,x[i+ 1],21,-2054922799);a=ii(a,b,c,d,x[i+ 8], 6, 1873313359);
         d=ii(d,a,b,c,x[i+15],10,  -30611744);c=ii(c,d,a,b,x[i+ 6],15,-1560198380);b=ii(b,c,d,a,x[i+13],21, 1309151649);
         a=ii(a,b,c,d,x[i+ 4], 6, -145523070);d=ii(d,a,b,c,x[i+11],10,-1120210379);c=ii(c,d,a,b,x[i+ 2],15,  718787259);
         b=ii(b,c,d,a,x[i+ 9],21, -343485551);a=ad(a,olda);b=ad(b,oldb);c=ad(c,oldc);d=ad(d,oldd);
     }
     return rh(a)+rh(b)+rh(c)+rh(d);
 }
 
 /**
  * add the ranks to get the sum
  * if a rank is larger than the set max rank, create alert and make background red
  * if a sum is larger than the set max sum, create alert and make background red
  */
 function updateSubTotal() {
     // document.getElementById('sumScore').style.backgroundColor = "#ffffff00";
    var score_arr = document.getElementsByName("score");
    var tot = 0;
    window.location.href = "findGroupings.html";
    var maxSum = document.getElementById("maxSum").value;
    var numUsers = document.getElementById("numUsers").value;
    window.location.href = "batch_Submissions.html";
    document.getElementById("auction_screen").style.display = "contents";
    var max_alert="", empty_alert="", zero_alert="";

    for (var i=0; i < score_arr.length; i++) {
        tot = 0;
        var row_arr = JSON.parse("[" + score_arr[i].value + "]");
        if (row_arr.length != numUsers) {
            empty_alert += (i+1)+" "
            score_arr[i].style.backgroundColor = "#d9361a";
        }
        for (var j=0; j < row_arr.length; j++) {
            if (j == i && row_arr[j] != 0) {
                zero_alert += (i+1)+" "
                score_arr[i].style.backgroundColor = "#d9361a";
            }
            tot += row_arr[j]; 
        } 
        if (tot != maxSum) {
            max_alert += (i+1)+" "
            score_arr[i].style.backgroundColor = "#d9361a";
        }
    }
    if (max_alert){
        alert(`ERROR: Row must sum up to ${maxSum}\nRow: `+max_alert);
        return;
    }
    if (zero_alert){
        alert(`ERROR: USER MUST RANK THEMSELVES 0\nRow: `+zero_alert);
        return;
    }
    if (empty_alert){
        alert(`ERROR: Row must contain a ranking for every user (${numUsers} users)\nRow: `+empty_alert)
        return;
    }

    genMatrix();
 }

 function sumRank() {
    // document.getElementById('sumScore').style.backgroundColor = "#ffffff00";
   var score_arr = document.getElementsByName("score");
   var maxSum = localStorage.getItem("maxSum");
   var tot;

   for (var i=0; i < score_arr.length; i++) {
       tot = 0;
       var row_arr = JSON.parse("[" + score_arr[i].value + "]");

       for (var j=0; j < row_arr.length; j++) {
        tot += row_arr[j]; 
       }
       document.getElementsByName("sum")[i].innerHTML = tot
       if (tot != maxSum) {
        document.getElementsByName("sum")[i].style.color = "#d9361a";
       } else {
        document.getElementsByName("sum")[i].style.color = "#000000";
       }
    }
}
var map_matrix, matrix;
var row_size, col_size;

function genMatrix() {
    var table = document.getElementById("rankMatrix");
    table.innerHTML = '';
    // var target = document.getElementById("numUsers").value;
    var target = localStorage.getItem("numUsers");
    // console.log(target)
    var score_arr = document.getElementsByName("score");
    var name_arr = document.getElementsByName("itemName");

    // row_size = target;
    // col_size = target;
    // map_matrix = new Array(row_size); 
    // matrix = new Array(row_size); 
    // for (var i = 0; i < row_size; i++) {
    //     matrix[i] = new Array(col_size); 
    //     map_matrix[i] = new Array(col_size); 
    // }
    
    for (var i = 0; i < target; i++) {
        var inputItem0 = document.createElement('span');
        inputItem0.setAttribute('type', 'text');
        inputItem0.setAttribute('name','userName');
        var name_string = name_arr[i].value.replaceAll(',', ' ');
        inputItem0.innerHTML = name_string;
        var inputItem1 = document.createElement('span');
        inputItem1.setAttribute('type','text');
        inputItem1.setAttribute('name','scores');
        var score_string = score_arr[i].value.replaceAll(',', ' ');
        // var score_mat = score_arr[i].value.replaceAll(',', '');
        // for (var j=0; j<target; j++){
        //     map_matrix[i][j] = 1;
        //     matrix[i][j] = parseInt(score_mat[j])
        // }
        
        inputItem1.innerHTML = ' ' + score_string;

        var row = table.insertRow(-1);
        var cell0 = row.insertCell(0);
        cell0.appendChild(inputItem0);
        var cell1 = row.insertCell(1);
        cell1.appendChild(inputItem1);
    }
 }

 async function storeMatrix() {
    var score_arr = document.getElementsByName("score");
    var name_arr = document.getElementsByName("itemName");
    // var rowMap = {};
    for (var i=0; i < score_arr.length; i++) {
        var name = name_arr[i].value;
        var scoreString = score_arr[i].value;
        // console.log(name, scoreString);
        document.getElementById("message").value = `SET ${name} ${scoreString}`;
        await makeRequest();
    }
    groupUser();
    // window.location.href = "findGroupings.html";
    return;

 }
// var map_matrix, matrix;
// var row_size, col_size;
async function groupUser(){
    let maxMap = []
    // var groupNum = document.getElementById("groupSize").value;
    var groupNum = localStorage.getItem("groupSize");
    var numUsers = localStorage.getItem("numUsers");
    var name_arr = document.getElementsByName("itemName");
    var useridx = []
    var comb = [];
    var tmp = [];
    makeCombiUtil(comb, tmp, numUsers-1, 0, groupNum);
    
    row_size = numUsers;
    var map_matrix = []; 
    var matrix = []; 
    // console.log("original",matrix)
    for (var i = 0; i < row_size; i++) {
        matrix.push([]); 
        map_matrix.push([]); 
    }
    // Add the transpose values e.g. matrix[0][1] + matrix[1][]
    // console.log(matrix)
    // var target = document.getElementById("numUsers").value;
    // var name_arr = localStorage.getItem("name_arr");
    // console.log("original",matrix)
    // console.log("map_matrix",map_matrix)
    for (var i=0; i<name_arr.length; i++) {;
        var userName = name_arr[i].value;
        // console.log(userName);
        document.getElementById("message").value = `GET ${userName}`;
        var retrievedScoreString = await makeRequest();
        var repString = retrievedScoreString.replaceAll(',', '')
        // console.log("repString",repString)
        for (var j=2; j<repString.length; j++){
            // console.log(repString[j])
            map_matrix[i].push(1);
            matrix[i].push(parseInt(repString[j]))
        }
    }
    console.log("original",matrix)
    for (var i=0; i<row_size; i++){
        for (var j=i+1; j<row_size; j++){
            // console.log(i,j,"->",matrix[i][j],"+", matrix[j][i])
            matrix[i][j] += matrix[j][i];
        }
        useridx.push(i);
    }
    console.log("useridx",useridx)
    for (var i=0; i<comb.length;i++){
        let s_comb = comb[i]
        var sum = 0
        var ptr1 = 0, ptr2=1;
        while (ptr1 < s_comb.length-1){
            // console.log(s_comb[ptr1], s_comb[ptr2], matrix[s_comb[ptr1]][s_comb[ptr2]])
            sum += matrix[s_comb[ptr1]][s_comb[ptr2]]
            ptr2++
            if (ptr2 == s_comb.length){
                ptr1++
                ptr2 = ptr1+1
            }
        }
        let data = [s_comb, sum];
        // console.log(data)
        maxMap.push(data)
    }
    console.log("transpose:",matrix)
    maxMap.sort(compareNumbers)
    // maxMap2.sort(compareNumbers)
    console.log('maxMap',maxMap)
    // console.log("new:",maxMap2)
    var group = 0
    
    const mat_len = maxMap.length;
    for (var i=0; i<mat_len; i++) {
        let data = maxMap.pop();
        console.log("start process on : ", data)
        var flag = 1, k;
        for (var j=0; j<groupNum; j++){
            k = j+1;
            if (k==groupNum) k = 0;
            console.log(data[0][j], data[0][k], map_matrix[data[0][j]][data[0][k]])
            if (map_matrix[data[0][j]][data[0][k]] == 0){
                flag = 0;
                break;
            }
        }
        console.log("flag: ", flag)
        if (flag == 1){
            for (var j=0; j<groupNum; j++){
                for (var k=0; k<row_size; k++){
                    console.log(data[0][j], k, map_matrix[data[0][j]][k])
                    map_matrix[data[0][j]][k] = 0
                    map_matrix[k][data[0][j]] = 0
                }
                console.log("map_matrix",map_matrix)
                let idx = useridx.indexOf(data[0][j])
                delete useridx[idx]
                if (useridx.length < numUsers){
                    break;
                }
            }
            var table = document.getElementById("groupTable");
            var inputItem0 = document.createElement('span');
            inputItem0.setAttribute('type', 'text');
            inputItem0.setAttribute('name','groupnumber');
            var inputItem1 = document.createElement('span');
            inputItem1.setAttribute('type', 'text');
            inputItem1.setAttribute('name','users');
            inputItem0.innerHTML = group;
            for (var k =0; k<groupNum; k++){
                inputItem1.innerHTML += name_arr[data[0][k]].value+" "
            }
            var row = table.insertRow(-1);
            var cell0 = row.insertCell(0);
            cell0.appendChild(inputItem0);
            var cell1 = row.insertCell(1);
            cell1.appendChild(inputItem1);
            console.log("group", group," : ",data[0])
            group++
            
        } else{
            console.log(data[0], "not picked")
        }
    }
    if (useridx.length%groupNum != 0){
        console.log("useridx", useridx)
        console.log("useridx.leght", useridx.length)
        var table = document.getElementById("groupTable");
        var inputItem0 = document.createElement('span');
        inputItem0.setAttribute('type', 'text');
        inputItem0.setAttribute('name','groupnumber');
        var inputItem1 = document.createElement('span');
        inputItem1.setAttribute('type', 'text');
        inputItem1.setAttribute('name','users');
        inputItem0.innerHTML = group;
        for (var k =0; k<useridx.length; k++){
            if (useridx[k]){
                inputItem1.innerHTML += name_arr[useridx[k]].value + " "
            }
        }
        var row = table.insertRow(-1);
        var cell0 = row.insertCell(0);
        cell0.appendChild(inputItem0);
        var cell1 = row.insertCell(1);
        cell1.appendChild(inputItem1);
    }
}

function compareNumbers(a, b) {
    return a[1]-b[1];
}

// var comb = [];
// var tmp = [];
function makeCombiUtil(comb, tmp, n, left, k)
{
    // console.log("comb",tmp,n, left,k)
    // Pushing this vector to a vector of vector
    if (k == 0) {
        let cp_tmp = [...tmp]
        comb.push(cp_tmp);
        // console.log(comb)
        return comb;
    }

    // i iterates from left to n. First time
    // left will be 1
    for (let i = left; i <= n; ++i)
    {
        tmp.push(i);
        comb = makeCombiUtil(comb, tmp, n, i + 1, k - 1);
        // Popping out last inserted element
        // from the vector
        tmp.pop();
    }
    return comb;
}

 /**
  * check for invalid name or rank in input box
  * send input data to Redis Server
  * retrive data from Redis Server to be presented 
  * @returns if invalid Name or Rank in input box
  */
 async function saveRanks() {
     let res_map = new Map();
     document.getElementById('resultSum').innerHTML = document.getElementById('sumScore').innerHTML;
     let score_arr = document.getElementsByName('score');
     let name_arr = document.getElementsByName('itemName');
     var noName = "";
     var noRank = "";
     for (var i=0; i < score_arr.length; i++) {
         if (name_arr[i].value==""){
             noName = noName+(i+1)+" ";
         } 
         if (score_arr[i].value=="") {
             noRank = noRank+(i+1)+" ";
         }
         res_map.set(name_arr[i].value, score_arr[i].value);
     }
 
     if (noName!=""&&noRank!=""){
         alert("No Name in choices: "+noName+"\nNo Rank in choices: "+noRank);
         return NaN;
     }
     else if (noName!=""){
         alert("No Name in choices: "+noName);
         return NaN;
     }
     else if (noRank!=""){
         alert("No Rank in choices: "+noRank);
         return NaN;
     } else if (document.getElementById('sumScore').innerHTML<parseInt(document.getElementById('maxSum').value)) {
         var status = confirm("WARNING: SUM OF RANK DOES NOT ADD UP TO SUM");
         if (!status){
             return;
         }
     }
     document.getElementById('Auction_screen').style.display = "none";
 
     document.getElementById('Results').style.display = "contents";
     let obj = Object.fromEntries(res_map);
     let jsonString = JSON.stringify(obj);
     let name = document.getElementById("WikiName").value;
     document.getElementById("message").value = `SET ${name} ${jsonString}`;
     makeRequest();
     document.getElementById("message").value = `GET ${name}`;
     const requestRes = await makeRequest();
     try {
         var jsObject = JSON.parse(requestRes);
         var resultString = '';
         for (var key in jsObject) {
             resultString += key + ' ' + jsObject[key] + "<br />";
         }
     } catch(error) {
         return;
     }
     document.getElementById("results").innerHTML = resultString;
 }
 

 
 /**
  * set max sum of ranks and max value of each individual rank
  * if not inputed, create alert and stay on page
  */
 function setDetail(){
     let maxSum = document.getElementById("maxSum").value;
     let maxRank = document.getElementById("maxRank").value;
     let numUsers = document.getElementById("numUsers").value;
     let groupSize = document.getElementById("groupSize").value;

     if ((maxSum == "")&&(maxRank == "")){
         alert("ERROR: No Max Sum and Rank")
         return "SET_ERROR";
     } else if (maxSum == "") {
         alert("ERROR: No Max Sum")
         return "SET_ERROR";
     } else if (maxRank == "") {
         alert("ERROR: No Max Rank")
         return "SET_ERROR";
     } else if (parseInt(maxRank, 10) > parseInt(maxSum, 10)) {
         alert("ERROR: Max Rank cannot be greater than Max Sum")
         return "SET_ERROR";
     } else if ((parseInt(maxRank, 10) <= 0) || (parseInt(maxSum, 10)) <= 0) {
         alert("ERROR: Values cannot be zero or negative")
         return "SET_ERROR";
     }
     else {
         var status = confirm("Are you ok with the settings?")
         if (status){
            //  document.getElementById("setDetails").style.display = "none";
            //  window.location.href = `batch_Submissions.html?maxSum=${maxSum}&maxRank=${maxRank}&numUsers=${numUsers}`;
            localStorage.setItem("numUsers", numUsers);
            localStorage.setItem("maxSum", maxSum);
            localStorage.setItem("maxRank", maxRank);
            localStorage.setItem("groupSize", groupSize);
            window.location.href = 'batch_Submissions.html';
            return false;
            //  document.getElementById("auction_screen").style.display = "contents";
            //  console.log("ADD ROW REACHED");
            //  document.getElementById("auction_screen").style.display = "contents";
             
            }
            
     }
 }
 
 /**
  * add row to table in order to insert new choices and their
  */
 function addRow() {
    // var target = document.getElementById("numUsers").value;
    // console.log(window.location.href.search);
    // var urlParams = new URLSearchParams(window.location.href.search);
    // var params = window.location.search.slice(1).split('&');
    var target = localStorage.getItem("numUsers");
    // console.log(target);
    // console.log(params.get('maxSum'));
    // var target = urlParams.get('maxSum');
    // console.log(urlParams.get("maxSum"));
    // console.log(window.location, document.location);
    var table = document.getElementById("itemTable");
    table.innerHTML = '';
    // var num_rows = document.getElementById("itemTable").rows.length;
    
     for (var i = 0; i < target; i++) {
        var inputItem0 = document.createElement('input');
        inputItem0.setAttribute('name','itemName')
        inputItem0.setAttribute('placeholder','Enter Name')
        var inputItem1 = document.createElement('input');
         inputItem1.setAttribute('name','score')
        inputItem1.setAttribute('placeholder','Enter Rank')
        inputItem1.setAttribute('type','text')
        inputItem1.onchange = function(){
            sumRank();
        }
        var inputItem2 = document.createElement('span');
        inputItem2.setAttribute('name','sum')
        inputItem2.setAttribute('type','text')
        inputItem2.innerHTML = 0

        var row = table.insertRow(-1);
        var cell0 = row.insertCell(0);
        cell0.appendChild(inputItem0);
        var cell1 = row.insertCell(1);
        cell1.appendChild(inputItem1);
        var cell2 = row.insertCell(2);
        cell2.appendChild(inputItem2);
      }
     
 }
 
 /**
  * remove unnecessary row from table
  */
//  function removeRow(btn) {
//      var row = btn.parentNode.parentNode;
//      row.parentNode.removeChild(row);
//  }
 
 
 /**
  * logout from website to go to login page
  */
 // FIX THIS
 function logout(){ 
     document.getElementById("login_screen").style.display = "contents"
     document.getElementById("fail_login").style.display = "none";
     document.getElementById("WikiName").value = ""
     document.getElementById("password").value = ""
     document.getElementById('setDetails').style.display = "none";
     document.getElementById('Auction_screen').style.display = "none";
     document.getElementById('Results').style.display = "none";
     document.getElementById('history_screen').style.display = "none";
 }


 