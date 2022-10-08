// makeRequest 
// var data = {"salt" : "foo", "hash" : "6b42ab06735a817a46e7637577ca543e", "message" : "ping" };
// var url = new URL("https://agile.bu.edu/ec500_scripts/redis.php");
// for (let d in data) {
//     url.searchParams.append(d, data[d])
// }
// fetch(url).then(data => {
//     return data.json();
// })
// .then(json => console.log("RESPONSE FROM SERVER", json));


const makeRequest = async () => {
    var data = {"salt" : "foo", "hash" : "6b42ab06735a817a46e7637577ca543e", "message" : "ping" };
    var url = new URL("https://agile.bu.edu/ec500_scripts/redis.php");
    for (let d in data) {
        url.searchParams.append(d, data[d])
    }
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
}

makeRequest();
// console.log("hi there");

// var printStuff = function(){
//     var myVariable = 5 + 5;
//     console.log(myVariable);
//   }
  
//   printStuff();

//A73397CF210AE

// fetch('https://agile.bu.edu/ec500_scripts/redis.php')


// let http = new XMLHttpRequest();
// http.open("GET", "https://agile.bu.edu/ec500_scripts/redis.php");
// http.send();
// http.onload = () => console.log(http.responseText);


/** REFERENCES:
 * https://code-boxx.com/javascript-fetch-get-query-params/
 * 
 */