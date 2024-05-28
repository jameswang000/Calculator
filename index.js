document.addEventListener("DOMContentLoaded", (e) => {
    console.log("DOM fully loaded and parsed, running script");
    //**************************************************
    let num1 = 0;
    let num2 = null;
    let op = null;
    let currDisplay = 0;
    const DISPLAY_LIMIT = 10 ** 22;

    function operate(num1, op, num2) {
        if (typeof num1 != "number" || 
            typeof num2 != "number") {
            alert("Non-number arguments");
            return undefined;
        }
        let res = undefined;
        switch (op) {
            case "add" :
                res = add(num1, num2);
                break;
            case "subtract" :
                res = subtract(num1, num2);
                break;
            case "multiply" :
                res = multiply(num1, num2);
                break;
            case "divide" : 
                res = divide(num1, num2);
                break;
            default :
                alert("Something broke");
                res = undefined;
                break;
        }
        if(res !== undefined) {
            return Number(res.toFixed(5));
        }
        else {
            return res;
        }
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
            return NaN;
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
        const button = tag.firstElementChild;
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
            console.log(`num1 : ${num1}, op: ${op}, num2 : ${num2}, currDisplay: ${currDisplay}`);
        }
        const body = document.querySelector("body");
        body.addEventListener("click", refreshDisplay)
    }

    function initializeOperators() {
        const operators = {
            "add" : add,
            "subtract" : subtract,
            "multiply" : multiply,
            "divide" : divide,
        }
        
        for (let operator in operators) {
            function operatorClicked(e) {
                let operationFunction = operators[operator];
                /*These are the cases for an operator being pressed
                    1.  The first number is populated and op
                        is currently null.
                        
                        In this case, op should be set based on
                        what operator was pressed. No changes to 
                        display
                    2. num1, num2, and op are all populated. 
                        Run the operation with curr vals, 
                        Change the display based on res,
                        num1 becomes the result
                        op becomes the currOper 
                        num2 becomes null
                    
                    3. only num1 and the op are populated    
                        Set num2 to num1 and execute the second 
                        case
                        
                    For the division case, the res simply becomes undefined
                    and all further operations are undefined*/
                function case1() {
                    op = operator;
                }
                function case2() {
                    let res = operate(num1, op, num2);
                    currDisplay = res;
                    num1 = res;
                    op = operator;
                    num2 = null;
                }
                function case3() {
                    num2 = num1;
                    case2();
                }

                if(num1 !== null && op === null && num2 === null) {
                    case1();
                }
                else if (num1 !== null && op !== null && num2 !== null) {
                    case2();
                }
                else if (num1 !== null && op !== null && num2 === null) {
                    case3();
                }
                else {
                    alert("Something went wrong with the operation");
                }
            }

            let query = ".button-" + operator;
            const button = document.querySelector(query);
            button.addEventListener("click", operatorClicked);
        }
    }

    function initializeEvalButton() {
        function evalClicked(e) {
            /*Cases for eval button being pressed: 
                1. num1, num2, op are all non-null
                    
                    Do the operation. 
                    Update the display
                    Set num1 to the result
                    Set op to null
                    Set num2 to null

                2. only num1 is non-null
                    Do nothing
                3. num1 is non-null, op is non-null
                    Set num2 to num1 
                    Run case 1*/
                function case1() {
                    res = operate(num1, op, num2);
                    currDisplay = res;
                    num1 = res;
                    op = null;
                    num2 = null;
                }
                function case2() {
                    return;
                }
                function case3() {
                    num2 = num1;
                    case1();
                }

                if(num1 !== null && op !== null && num2 !== null) {
                    case1();
                }
                else if (num1 !== null && op === null && num2 === null) {
                    case2();
                }
                else if (num1 !== null && op !== null && num2 === null) {
                    case3();
                }
                else {
                    alert("Something went wrong with the eval");
                }
        }

        let evalButton = document.querySelector(".button-equal");
        evalButton.addEventListener("click", evalClicked);
    }
    
    function initializeClear() {
        const clearButton = document.querySelector(".button-clear");
        clearButton.addEventListener("click", e => {
            num1 = null;
            op = null;
            num2 = null;
            currDisplay = 0;
        })
    }

    makeButtonsSquare();
    initializeNumbers();
    initializeDisplay();
    initializeOperators();
    initializeEvalButton();
    initializeClear();
});
