document.addEventListener("DOMContentLoaded", (e) => {
    console.log("DOM fully loaded and parsed, running script");
    //**************************************************
    let num1 = undefined;
    let num2 = undefined;
    let op = undefined;

    function operate(num1, op, num2) {
        if (typeof num1 != "number" || 
            typeof num2 != "number") {
            alert("Non-number arguments");
            return undefined;
        }
        let res = undefined;
        switch (op) {
            case "+" :
                res = add(num1, num2);
                break;
            case "-" :
                res = subtract(num1, num2);
                break;
            case "*" :
                res = multiply(num1, num2);
                break;
            case "/" : 
                res = divide(num1, num2);
                break;
            default :
                alert("Something broke");
                res = undefined;
                break;
        }
        return Number(res.toFixed(5));
    }

    function add(num1, num2) {
        return num1 + num2;
    }

    function subtract(num1, num2) {
        return num1 - num2;
    }

    function multiply(num1, num2) {
        return num1 * num2;
    }

    function divide(num1, num2) {
        if (num2 === 0) {
            return undefined;
        }
        else {
            return num1 / num2;
        }
    }


    function makeSquare(tag) {
        const computedStyle = getComputedStyle(tag);
        tag.style.height = computedStyle.width;
    }

    function makeRowsSquare(tag) {
        console.log(tag);
        const button = tag.firstElementChild;
        console.log(button);
        const computedStyle = getComputedStyle(button);
        tag.style.height = computedStyle.height;
    }
    function makeButtonsSquare() {
        const buttons = document.querySelectorAll(".buttons-row > div");
        buttons.forEach(makeSquare);

        const rows = document.querySelectorAll(".buttons-row");
        rows.forEach(makeRowsSquare);
    }
    
    makeButtonsSquare();

});
