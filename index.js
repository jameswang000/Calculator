document.addEventListener("DOMContentLoaded", (e) => {
    console.log("DOM fully loaded and parsed, running script");
    //**************************************************
    let num1 = null;
    let num2 = null;
    let op = null;
    let currDisplay = "";
    const DISPLAY_LIMIT = 10 ** 22;

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

    

    function initializeNumbers() {
        for(let i = 0; i < 10; i++) {

            function numberClicked(e) {
                /*When a number is clicked:
                 1. If there is no operator on display, add another digit to num1
                    Nothing else needs to be done in this case
                 2. If there is a operator on display add another digit to num2
                    Should also signal the calculator to display num2 rather
                    than num1*/ 
                if(op === null) {
                    /*
                    if (num1 < DISPLAY_LIMIT) {
                        num1 = num1 * 10 + i;
                        currDisplay = num1;
                    }
                    */
                    num1 = num1 * 10 + i;
                    currDisplay = num1;
                }
                else {
                    /*
                    if (num2 < DISPLAY_LIMIT) {
                        num2 = num2 * 10 + i;
                        currDisplay = num2;
                    }
                    */
                    num2 = num2 * 10 + i;
                    currDisplay = num2;
                }
                console.log(`num1 : ${num1}, num2 : ${num2}`);
            }
            //Get the name of the corresponding tag query
            let query = ".button-" + i;
            const button = document.querySelector(query);
            button.addEventListener("click", numberClicked);
        }
    }
    
    function initializeDisplay() {
        function refreshDisplay(e) {
            const displayNumbers = document.querySelector(".display-numbers");
            displayNumbers.textContent = currDisplay;
        }
        const body = document.querySelector("body");
        body.addEventListener("click", refreshDisplay)
    }
    

    makeButtonsSquare();
    initializeNumbers();
    initializeDisplay();
    initializeOperators();
    initializeEvalButton();
    initializeClear();

});
