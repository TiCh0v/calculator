document.addEventListener('DOMContentLoaded', function(){
    const keys = document.querySelectorAll('.key');
    const display_input = document.querySelector('.display .input');
    const display_output = document.querySelector('.display .output');
    let input = "";

    for (let key of keys) {
        const value = key.dataset.key;
        key.addEventListener('click', () => {
            if (value == "clear") {
                input = "";
                display_input.innerHTML = "";
                display_output.innerHTML = "";
            } else if (value == "backspace") {
                input = input.slice(0, -1);
                display_input.innerHTML = fineInp(input);
            } else if (value == "=") {
                let result = eval(prepInput(input));

                display_output.innerHTML = fineOutput(result);
            } else if (value == "brackets") {
                if (
                    input.indexOf("(") == -1 || 
                    input.indexOf("(") != -1 && 
                    input.indexOf(")") != -1 && 
                    input.lastIndexOf("(") < input.lastIndexOf(")")
                ) {
                    input += "(";
                } else if (
                    input.indexOf("(") != -1 && 
                    input.indexOf(")") == -1 || 
                    input.indexOf("(") != -1 &&
                    input.indexOf(")") != -1 &&
                    input.lastIndexOf("(") > input.lastIndexOf(")")
                ) {
                    input += ")";
                }

                display_input.innerHTML = fineInp(input);
            } else {
                if (valInput(value)) {
                    input += value;
                    display_input.innerHTML = fineInp(input);
                }
            }
        })
    }
    function fineInp(input) {
        let input_array = input.split("");
        let input_array_length = input_array.length;
        for (let i = 0; i < input_array_length; i++) {
            if (input_array[i] == "*") {
                input_array[i] = ` <span class="operator">x</span> `;
            } else if (input_array[i] == "/") {
                input_array[i] = ` <span class="operator">÷</span> `;
            } else if (input_array[i] == "+") {
                input_array[i] = ` <span class="operator">+</span> `;
            } else if (input_array[i] == "-") {
                input_array[i] = ` <span class="operator">-</span> `;
            } else if (input_array[i] == "(") {
                input_array[i] = `<span class="brackets">(</span>`;
            } else if (input_array[i] == ")") {
                input_array[i] = `<span class="brackets">)</span>`;
            } else if (input_array[i] == "%") {
                input_array[i] = `<span class="percent">%</span>`;
            }
        }
        return input_array.join("");
    }
    function fineOutput (output) {
        let output_string = output.toString();
        let decimal = output_string.split(".")[1];
        output_string = output_string.split(".")[0];

        let output_array = output_string.split("");

        if (output_array.length > 3) {
            for (let i = output_array.length - 3; i > 0; i -= 3) {
                output_array.splice(i, 0, ",");
            }
        }

        if (decimal) {
            output_array.push(".");
            output_array.push(decimal);
        }

        return output_array.join("");
    }
    function valInput (value) {
        let last_input = input.slice(-1);
        let operators = ["+", "-", "*", "/"];
        if (value == "." && last_input == ".") {
            return false;
        }
        if (operators.includes(value)) {
            if (operators.includes(last_input)) {
                return false;
            } else {return true;}
        }
        return true;
    }
    function prepInput (input) {
        let input_array = input.split("");
        for (let i = 0; i < input_array.length; i++) {
            if (input_array[i] == "%") {
                input_array[i] = "/100";
            }
        }
        return input_array.join("");
    }

    



    // стилизация
    const _switch = document.getElementById('switcher');
    const body = document.querySelector('body');
    const display = document.getElementById('display');
    const calc = document.getElementById('calculator');
    const keypad = document.getElementById('keypad');
    const letter = document.querySelectorAll('span.key-basic');
    const actionButtons = document.querySelectorAll('span.action');


    _switch.addEventListener('click', function(){
        _switch.classList.toggle('bi-lightbulb');
        if(_switch.classList.toggle('bi-lightbulb-fill')){
            body.style.background = 'white';
            body.style.color = 'black';
            display.style.color = "rgb(56, 55, 55)";
            calc.style.backgroundColor = '#f1f1f1';
            keypad.style.background = '#dddddd';
            
            
            keypad.style.transition = '2s';
            calc.style.transition = '2s';
            display.style.transition = '2s';
            body.style.transition = '2s';

            //white mode


            

            letter.forEach(element =>{
                element.style.color = '#222222';
                element.style.transition = '2s';
            });
            actionButtons.forEach(element =>{
                element.style.color = '#747474';
                element.style.transition = '2s';
            })


        }
        else{
            body.style.background = '#212636';
            body.style.color = 'white';
            display.style.color = "white";
            keypad.style.background = '#5b5d66';
            keypad.style.transition = '2s';
            calc.style.backgroundColor = '#45474e';
            calc.style.transition = '2s';
            display.style.transition = '2s';
            body.style.transition = '2s';
            

            //black mode



            letter.forEach(element =>{
                element.style.color = 'white';
                element.style.transition = '2s';
            });
            actionButtons.forEach(element =>{
                element.style.color = '#c4c2c2';
                element.style.transition = '2s';
            });
        }
    });
});