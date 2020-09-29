function getElement(elementClass) {
    let element = document.querySelector(elementClass);
    return element;
}

// hide the notifications
let notifyError = getElement(".notify-section p:first-child");
let notifySuccess = getElement(".notify-section p:nth-child(2)");
let notifyPin = getElement(".notify-section p:nth-child(3)");
let notifyUserPin = getElement(".notify-section p:nth-child(4)");


// Hide that Elements
function toggleElement(element, hide = true) {
    if (hide === true) {
        element.style.display = "none";
    } else {
        element.style.display = "block";
    }
}

toggleElement(notifyError);
toggleElement(notifySuccess);


// Get that Elements
let generatedPin = document.getElementsByClassName("form-control")[0];
let userPin = document.getElementsByClassName("form-control")[1];
let buttonGenerate = getElement(".generate-btn");
let userPinValue = "";


// Event Listner to Pin genaratopr
buttonGenerate.addEventListener('click', function () {
    let randomNumber = Math.random();
    let randomString = randomNumber.toString();
    let randomFixed = randomString.substring(2, 6);
    generatedPin.value = randomFixed;
})

// Event listner to all buttons
const keys = document.querySelectorAll(".calc-body .button");
keys.forEach(function (key) {
    key.addEventListener('click', e => {
        const action = e.target.dataset.action;
        if (action == "clear") {
            userPinValue = "";
            userPin.value = userPinValue;
        } else if (action == "back") {
            userPinValue = userPinValue.substring(0, userPinValue.length - 1);
            userPin.value = userPinValue;

        } else if (e.target.className == "button") {
            userPinValue += e.target.innerHTML;
            userPin.value = userPinValue;

        }
    })

})

//Matching  4 digit number & Functionality with submit button
let pattern = /^\d{4}$/;

let submitButton = getElement(".submit-btn");
let totalTry = 0;
let alert = getElement(".action-left");
submitButton.addEventListener('click', function () {

    userPinValue = userPin.value;
    totalTry += 1;

    if (totalTry <= 3) {
        alert.innerHTML = (3 - totalTry) + " try left";
        if (generatedPin.value == userPinValue && 
            generatedPin.value != "") {
            toggleElement(notifySuccess, hide = false);
            toggleElement(notifyError);
            toggleElement(notifyPin);
            toggleElement(notifyUserPin);
            submitButton.disabled = true;
        }

        else
            if (generatedPin.value.toString().length != 4) {
                toggleElement(notifySuccess);
                toggleElement(notifyError);
                toggleElement(notifyPin, hide = false);
                toggleElement(notifyUserPin);

            }
            else if (userPinValue.match(pattern) == null) {
                toggleElement(notifySuccess);
                toggleElement(notifyError);
                toggleElement(notifyPin);
                toggleElement(notifyUserPin, hide = false);
            }
            else if (generatedPin.value != userPinValue) {
                toggleElement(notifySuccess);
                toggleElement(notifyError, hide = false);
                toggleElement(notifyPin);
                toggleElement(notifyUserPin);
            }


    } else {
        submitButton.disabled = true;
    }

})


















