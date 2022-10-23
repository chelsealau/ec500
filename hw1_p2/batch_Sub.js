/** REFERENCES
 * https://developer.mozilla.org/en-US/docs/Web/CSS/display
 * https://stackoverflow.com/questions/66774779/how-do-you-clear-a-list-in-javascript-i-e-delete-all-items-in-a-list-with-one
 * https://www.geeksforgeeks.org/how-to-creating-html-list-from-javascript-array/
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 * https://www.tutorialkart.com/javascript/javascript-convert-map-to-json-string/#:~:text=To%20convert%20a%20map%20to,stringify()%20method.
 * https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
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
 document.getElementById("maxSum")
     .addEventListener("keyup", function(event) {
     event.preventDefault();
     if (event.keyCode === 13) {
         document.getElementById("setButton").click();
     }
 })
 /**
  * click SET when KEY ENTER is pressed 
  * while cursor is on input box maxRank
  */
 document.getElementById("maxRank")
     .addEventListener("keyup", function(event) {
     event.preventDefault();
     if (event.keyCode === 13) {
         document.getElementById("setButton").click();
     }
 })
 
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
     var inputString = salt + document.getElementById("password").value 
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
    var maxSum = document.getElementById("maxSum").value;
    var numUsers = document.getElementById("numUsers").value;
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
    }
    if (zero_alert){
        alert(`ERROR: USER MUST RANK THEMSELVES 0\nRow: `+zero_alert);
    }
    if (empty_alert){
        alert(`ERROR: Row must contain a ranking for every user (${numUsers} users)\nRow: `+empty_alert)
    }
 }
 function sumRank() {
    // document.getElementById('sumScore').style.backgroundColor = "#ffffff00";
   var score_arr = document.getElementsByName("score");
   var maxSum = document.getElementById("maxSum").value;
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

 async function storeMatrix() {
    var score_arr = document.getElementsByName("score");
    var name_arr = document.getElementsByName("itemName");
    // var rowMap = {};
    for (var i=0; i < score_arr.length; i++) {
        document.getElementById("message").value = `SET ${name} ${jsonString}`;
        makeRequest();
    }
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
 
 async function navHistory() {
     let name = document.getElementById("WikiName").value;
     document.getElementById("menu_screen").style.display = "none";
     document.getElementById("message").value = `GET ${name}`;
     const requestRes = await makeRequest();
     
     try {
         var jsObject = JSON.parse(requestRes);
         var resultString = '';
         for (var key in jsObject) {
         resultString += key + ' ' + jsObject[key] + "<br />";
         }
         document.getElementById("history").innerHTML = resultString;
     } catch (error) {
         document.getElementById("history").innerHTML = "NO PREVIOUS SUBMISSION";
     }
     document.getElementById("history_screen").style.display = "contents";
 }
 
 function navDetails() {
     document.getElementById("menu_screen").style.display = "none";
     document.getElementById("history_screen").style.display = "none";
     document.getElementById("setDetails").style.display = "contents";
 }
 
 /**
  * set max sum of ranks and max value of each individual rank
  * if not inputed, create alert and stay on page
  */
 function setDetail(){
     let maxSum = document.getElementById("maxSum").value;
     let maxRank = document.getElementById("maxRank").value;
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
             document.getElementById("setDetails").style.display = "none";
             addRow();
             document.getElementById("auction_screen").style.display = "contents";
         }
     }
 }
 
 /**
  * add row to table in order to insert new choices and their
  */
 function addRow() {
    var target = document.getElementById("numUsers").value;
    console.log(target)
    var table = document.getElementById("itemTable");
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
 /**
  * display Auction_screen page and hide Results page
  */
  function resultsBack() {
     document.getElementById('Auction_screen').style.display = "contents";
     document.getElementById('Results').style.display = "none";
     document.getElementById('history_screen').style.display = "none";
 }
 /**
  * display setDetails page and hide Auction_screen page
  */
 function auctionBack() {
     document.getElementById('Auction_screen').style.display = "none";
     document.getElementById("history_screen").style.display = "none";
     document.getElementById('setDetails').style.display = "contents";
 }
 