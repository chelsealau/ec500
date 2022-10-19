/** REFERENCES
 * https://javascript.plainenglish.io/unit-test-front-end-javascript-code-without-a-framework-8f00c63eb7d4
 * https://www.w3schools.com/jsref/met_html_click.asp
 */

/**
 * @brief Function to test whether function executes successfully
 * @param {string} desc 
 * @param {function} fxn 
 */
function it(desc, fxn) {
    try {
        fxn();
        // change color of text in console and add check symbol unicode
        console.log('\x1b[32m%s\x1b[0m', '\u2714 ' + desc)
    } catch (error) {
        console.log('\n');
        console.log('\x1b[31m%s\x1b[0m', '\u2718 ' + desc)
    }
}

function assert(isTrue) {
    if (!isTrue) {
        throw new Error();
    }
}

// Unit test for updateSubTotal
it('should update sum of scores', function() {
    var sumValue = document.getElementById("sumScore");
    var inputCell = document.getElementsByName("score")[0];
    inputCell.value = '25';
    updateSubTotal();
    assert(sumValue.innerHTML == '25');
});

// Unit test for saveRanks and setDetails
it('should save and retrieve the auction inputs', function() {
    var maxSum = document.getElementById("maxSum");
    var maxRank = document.getElementById("maxRank");
    var nameCell = document.getElementsByName("itemName")[0];
    var valueCell = document.getElementsByName("score")[0];
    maxSum.value = '100';
    maxRank.value = '99';
    document.getElementById("setButton").click();
    nameCell.value = 'testVal';
    valueCell.value = '25';
    document.getElementById("saveRanks").click();
    document.getElementById("login_screen").style.display = "none";
    document.getElementById("setDetails").style.display = "none";
});

// Unit test for setDetails checks
it('should return NaN if input values are not valid', function() {
    document.getElementById("Results").style.display = "none";
    var maxSum = document.getElementById("maxSum");
    var maxRank = document.getElementById("maxRank");
    maxSum.value = '';
    maxRank.value = '';
    returnVal = setDetail();
    assert(returnVal == "SET_ERROR");
    maxSum.value = '10';
    maxRank.value = '12';
    assert(returnVal == "SET_ERROR");
    maxSum.value = '10';
    maxRank.value = '-12';
    assert(returnVal == "SET_ERROR");
}) 

