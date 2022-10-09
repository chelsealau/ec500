'use strict';

const makeRequest = async () => {
    var mess = document.getElementById("message").outerHTML;
    console.log(mess.valueOf());
    var data = {"salt" : "foo", "hash" : "6b42ab06735a817a46e7637577ca543e", "message" : mess };
    var url = new URL("https://agile.bu.edu/ec500_scripts/redis.php");
    var searchParams = new URLSearchParams(data);
    url.search = searchParams.toString();
    const response = await fetch(url);
    if (response.ok) {
        let text = await response.text();
        console.log(url);
        document.getElementById("response").innerHTML = text;
    } else {
        alert("HTTP-ERROR: " + response.status);
    }
}

// const makeRequest = async () => {
//     var url = new URL("https://agile.bu.edu/ec500_scripts/redis.php");
//     const response = await fetch(url, {
//         'method': "GET",
//         "headers": {
//             'salt':'foo',
//             'hash':'6b42ab06735a817a46e7637577ca543e',
//             'message':'ping'
//         }
//     });
//     if (response.ok) {
//         console.log(response);
//         // let json = await response.json();
//         // console.log(json);
//         // console.log("SHOULD HAVE RESPONSE");
//     } else {
//         alert("HTTP-ERROR: " + response.status);
//     }
// }


// makeRequest();

//A73397CF210AE

// fetch('https://agile.bu.edu/ec500_scripts/redis.php')


// let http = new XMLHttpRequest();
// http.open("GET", "https://agile.bu.edu/ec500_scripts/redis.php");
// http.send();
// http.onload = () => console.log(http.responseText);


/** REFERENCES:
 * https://code-boxx.com/javascript-fetch-get-query-params/
 * https://stackoverflow.com/questions/61240305/reactjs-typeerror-failed-to-execute-fetch-on-window-invalid-name
 */