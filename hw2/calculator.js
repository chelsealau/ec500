function calc() {
    var param1 = document.getElementById("param1").value;
    var param2 = document.getElementById("param2").value;
    var op = document.getElementById("op").value;
    try {
      parseInt(param1);
      parseInt(param2);
    } catch(error) {
      alert("Parameters must be numbers");
      return;
    }
    if (param1 == '0'|| param2 == '0') {
        alert("Parameters cannot be zero");
        return;
    }
    if (param1 == 'NaN' || param2 == 'NaN') {
      alert("Parameters cannot be NaN");
      return;
    }
    // if (param1.includes("") || param2.includes("")) {
    //   alert("Parameters must be numbers");
    //   return;
    // }
    try {
      document.getElementById("result").value = eval(param1 + op + param2);
    } catch (error) {
      alert("I'm afraid I do not understand:  "+error);
    }
  }