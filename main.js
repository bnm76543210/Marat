$(document).ready(function()
{   
    fillHTML();
    var prevEntry = null;
    var operation = null;
    var currentEntry = '0';

    $('.btn').on('click', function(evt)
    {
        var buttonPressed = $(this).html();
        console.log(buttonPressed);

        if (buttonPressed == "AC")
        {
            result = 0;
            currentEntry = '0';
        }
        else if (buttonPressed == "CE")
        {
            currentEntry = '0';
        }
        else if (buttonPressed == "back")
        {
            currentEntry = currentEntry.slice(0, -1);
        }
        else if (buttonPressed == "+/-")
        {
            currentEntry *= -1;
        }
        else if (buttonPressed == ".")
        {
            if ($('.screen').html().includes('.'))
                console.log("too many dots...");
            else
                currentEntry += ".";
        }
        else if (isNumber(buttonPressed))
        {
            if (currentEntry === '0')
                currentEntry = buttonPressed;
            else
                currentEntry += buttonPressed;
        }
        else if (isOperator(buttonPressed))
        {
            prevEntry = parseFloat(currentEntry);
            operation = buttonPressed;
            currentEntry = '';
        }
        else if (buttonPressed == '%')
        {
            currentEntry = currentEntry / 100;
        }
        else if (buttonPressed == 'sqrt')
        {
            currentEntry = Math.sqrt(currentEntry);
        }
        else if (buttonPressed == '𝝅')
        {
            currentEntry = Math.PI;
        }
        else if (buttonPressed == '=')
        {
            if (prevEntry != null && currentEntry != null && operation != null)
            {
                currentEntry = operate(prevEntry, currentEntry, operation);
                operation = null;
            }
        }

        updateScreen(currentEntry);
    });
})

fillHTML = function() 
{
    $("body").css('background','blueviolet')
    $("body").css('user-select','none')
    var calcBody = $('<div class="calc"></div>');
    $("body").append(calcBody);
    $(".calc").append('<div class="calc-row"><div class="screen">0</div></div>')
    var buttons = ['AC', 'CE', 'back', '+/-', '%'];
    addCalcButtons(buttons, false);
    buttons = ['7', '8', '9', '/', 'sqrt'];
    addCalcButtons(buttons, false);
    buttons = ['4', '5', '6', '*', '^'];
    addCalcButtons(buttons, false);
    buttons = ['1', '2', '3', '-', '𝝅'];
    addCalcButtons(buttons, false);
    buttons = ['0', '.', '+', '='];
    addCalcButtons(buttons, true);
}

addCalcButtons = function(elementsInnerTextArray, trg)
{
    var calcRow = $('<div class="calc-row"></div>');
    if (trg == true)
        calcRow.append('<div class="empty"></div>');
    for (var i = 0; i < elementsInnerTextArray.length; i++) {
        var calcButton = $('<div class="btn"></div>');
        calcButton.text(elementsInnerTextArray[i]);
        console.log(calcButton.text());
        calcRow.append(calcButton);
    }
    $(".calc").append(calcRow);
}

updateScreen = function(displayValue)
{
    var displayValue = displayValue.toString();
    $('.screen').html(displayValue.substring(0, 15));
};

isNumber = function(value)
{
    return !isNaN(value);
}

isOperator = function(value)
{
    return value == '/' || value == '*' || value == '+' || value == '-' || value === '^';
}

operate = function(a, b, operation)
{
    a = parseFloat(a);
    b = parseFloat(b);
    console.log(a, b, operation);

    if (operation === '+') {
        return a + b;
    }

    if (operation === '-') {
        return a - b;
    }

    if (operation === '*') {
        return a * b;
    }

    if (operation === '/') {
        if(b === 0) {
            alert('деление на ноль.');
            result = 0;
            prevEntry = 0;
            operation = null;
            currentEntry = '0';
        }
        else {
            return a / b;
        }

    }

    if(operation === '^') {
        return Math.pow(a, b);
      }
}
