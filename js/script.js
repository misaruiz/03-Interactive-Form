// console.log("Test");


//////////////////////////////////////////////////////////////////////////////////
// To focus on first input (name field) on load
//////////////////////////////////////////////////////////////////////////////////
const inputName = document.querySelector('input#name');
inputName.focus();

// To hide the Other Job Role field on load
const inputJobOther = document.querySelector('input#other-job-role');
function inputJobOtherHide() {
    inputJobOther.style.display = "none";
};
inputJobOtherHide();

//////////////////////////////////////////////////////////////////////////////////
// To unhide the Other Job Role field when other is
//////////////////////////////////////////////////////////////////////////////////
const selectJob = document.querySelector('select#title');
const optionJobOther = document.querySelector('option[value=other]');
// const optionJobOtherValue = optionJobOther.value;
selectJob.addEventListener("change", (e) => {
    let optionTarget = e.target;
    // let optionValue = optionTarget.value;
    // console.log(optionValue);
    if (optionTarget.value == optionJobOther.value) {
        inputJobOther.style.display = "block";
    } else {
        inputJobOtherHide();
    }
});

//////////////////////////////////////////////////////////////////////////////////
// To disable color select for tshirt
//////////////////////////////////////////////////////////////////////////////////
const selectColor = document.querySelector('select#color');
// function selectColorDisable() {
//     selectColor.disabled = true;
// }
// selectColorDisable();
selectColor.disabled = true;

//////////////////////////////////////////////////////////////////////////////////
// to display color select for tshirt once design is selected
//////////////////////////////////////////////////////////////////////////////////
const selectDesign = document.querySelector('select#design');

selectDesign.addEventListener('change', (e) => {
    selectColor.disabled = false;

    // Loops through every <option> under <select> Color to check if target value and color data-theme match to hide/unhide correct colors
    for (i=0;i<selectColor.children.length;i++) {
        let designTargetValue = e.target.value;
        let selectColorChildren = selectColor.children[i];
        let dataTheme = selectColorChildren.getAttribute('data-theme');
        
        // console.log(designTargetValue);
        // console.log(dataTheme); 
        if (designTargetValue == dataTheme) {
            selectColorChildren.hidden = false;
            selectColorChildren.removeAttribute('selected');
            selectColor.querySelectorAll('[data-theme="' + dataTheme +'"]')[0].setAttribute('selected', true);

        } else {
            selectColorChildren.hidden = true;
            selectColorChildren.removeAttribute('selected');
            // selectColorChildren.setAttribute('selected', false);
            // selectColor.querySelectorAll('[data-theme="' + designTargetValue +'"]')[0].setAttribute('selected', true);
            // selectColorChildren.setAttribute('select', false);
            // selectColor.querySelector(dataTheme).selected = '';
        }
    }


        
    });


//colors
// const cornflowerBlue = selectColor.querySelector('option[value=cornflowerblue');
// const darkslateGrey = selectColor.querySelector('option[value=darkslategrey');
// const gold = selectColor.querySelector('option[value=gold');
// const tomato = selectColor.querySelector('option[value=tomato');
// const steelBlue = selectColor.querySelector('option[value=steelblue');
// const dimGrey = selectColor.querySelector('option[value=dimgrey');


// // tshirt
// const punsShirt = document.querySelector('option[value=js puns]');
// const punsShirtValue = punsShirt.value[2];
// const heartShirt = document.querySelector('option[value=heart]');
// const heartShirtValue = heartShirt.value[1];

// //color select
// const punsColor = document.querySelector('option[data-theme=puns]');
// const punsColorTheme = punsColor.getAttribute('data-theme');
// const punsColorOptions = dococument.querySelectorAll('option[data-theme=puns]');
// const heartColor = document.querySelector('option[data-theme=heart]'); 
// const heartColorTheme = heartColor.getAttribute('data-theme');
// const heartColorOptions = dococument.querySelectorAll('option[data-theme=heart]');



//////////////////////////////////////////////////////////////////////////////////
// To add up all activites costs
//////////////////////////////////////////////////////////////////////////////////
const fieldsetActivites = document.querySelector('fieldset#activities');
const activitesCostTotalPrint = document.querySelector('#activities-cost');
let activitesCostTotal = 0;
const activities = fieldsetActivites.querySelectorAll('input[type=checkbox]');


//To validate that at least one activity has been selected
function activitiesValidate(eTarget) {
    if (activitesCostTotal == 0) {
        eTarget.preventDefault();
        fieldsetActivites.classList.remove('valid');
        fieldsetActivites.classList.add('not-valid');
        fieldsetActivites.querySelector('.hint').style.display = "block";
    } else {
        fieldsetActivites.classList.remove('not-valid');
        fieldsetActivites.classList.add('valid');
        fieldsetActivites.querySelector('.hint').style.display = "none";
    }
}


// to listen for any changes in the Activities fielset

fieldsetActivites.addEventListener('change', (e) => {
    const activityCost = parseInt(e.target.getAttribute('data-cost'));
    // function formatCost() {
    //     const regExActivitiesCost = /^([^0-9]*)([0-9].*)$/;
    //     const activitesCostTotalPrintText = activitesCostTotalPrint.innerHTML;
    //     console.log(activitesCostTotal);
    //     return activitesCostTotalPrintText.replace(regExActivitiesCost, '$1 + activitesCostTotal');
    //     // activitesCostTotalPrint.innerHTML = activitesCostTotal;
    // }
    
    if (e.target.checked) {
        activitesCostTotal += activityCost;
        for (i=0;i<activities.length;i++) {
            // Hides overlapping activities
            if (activities[i].getAttribute('data-day-and-time') == e.target.getAttribute('data-day-and-time')) {
                activities[i].parentElement.classList.add('disabled');
                activities[i].disabled = true;
                e.target.parentElement.classList.remove('disabled');
                e.target.disabled = false;
            }
        }
    } else if (e.target.checked == false) {
        activitesCostTotal -= activityCost;
        // Unhides overlpapping activities
        for (i=0;i<activities.length;i++) {
            if (activities[i].getAttribute('data-day-and-time') == e.target.getAttribute('data-day-and-time')) {
                activities[i].parentElement.classList.remove('disabled');
                activities[i].disabled = false;
            }
        }
    }
    // formatCost();
    activitesCostTotalPrint.innerHTML = `Total: $${activitesCostTotal}`;
      
    activitiesValidate(e);

});

//////////////////////////////////////////////////////////////////////////////////
// To display the selected Payment info
//////////////////////////////////////////////////////////////////////////////////
const payMethod = document.querySelector('select#payment');
const payCredit = document.querySelector('div#credit-card');
const payPaypal = document.querySelector('div#paypal');
const payBitcoin = document.querySelector('div#bitcoin');

payPaypal.hidden = true;
payBitcoin.hidden = true;

payMethod.children[1].setAttribute('selected', '');

// this is where the magice happens. I feel there's a shorter way to do this but it works
payMethod.addEventListener('change', (e) => {
    if (e.target.value == payPaypal.getAttribute('id')) {
        payPaypal.hidden = false;
        payBitcoin.hidden = true;
        payCredit.hidden = true;
    } else if (e.target.value == payBitcoin.getAttribute('id')) {
        payPaypal.hidden = true;
        payBitcoin.hidden = false;
        payCredit.hidden = true;
    } else if (e.target.value == payCredit.getAttribute('id')) {
        payPaypal.hidden = true;
        payBitcoin.hidden = true;
        payCredit.hidden = false;
    }
}
);


//////////////////////////////////////////////////////////////////////////////////
// To validate the form
//////////////////////////////////////////////////////////////////////////////////


const inputEmail = document.querySelector('input#email');
const inputCardNumber = document.querySelector('input#cc-num');
const inputZip = document.querySelector('input#zip');
const inputCVV = document.querySelector('input#cvv');
const form = document.querySelector('form');

const nameRegex = /\w+/;
const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]+$/;
// const emailEmptyRegex = /^\s*$/;
const cardRegex= /^[0-9]{13,16}$/;
const zipRegex = /^[0-9]{5}$/;
const cVVRegex = /^[0-9]{3}$/;

const emailCorrectFormMsg = inputEmail.parentElement.querySelector('.hint').innerHTML;


// Validate function
function errorTrue(input, eTarget) {
    eTarget.preventDefault();
    input.parentElement.classList.add("not-valid");
    input.parentElement.classList.remove("valid");
    // input.parentElement.lastElementChild.style.display = "block";
    input.parentElement.querySelector('.hint').style.display = "block";      
}

function errorFalse(input) {
    input.parentElement.classList.remove("not-valid");
    input.parentElement.classList.add("valid");
    // input.parentElement.lastElementChild.style.display = "none";
    input.parentElement.querySelector('.hint').style.display = "none";
}

function validateField(input, inputValid, eTarget) {
    
    if (inputValid == false) {
        // let emptyEmail = emailEmptyRegex.test(inputEmail);
        if (inputEmail.value === '') {
            inputEmail.parentElement.querySelector('.hint').innerHTML = "Please enter an email address.";
        } else {
            inputEmail.parentElement.querySelector('.hint').innerHTML = emailCorrectFormMsg;
        }
    errorTrue(input, eTarget);
    } else {
    errorFalse(input, eTarget);
    }
}



form.addEventListener('submit', (e) => {
    // e.preventDefault()
    // let inputNameValue = inputName.value;
    // let inputEmailValue = inputEmail.value;
    // let inputCardValue = inputCardNumber.value;
    // let inputZipValue = inputZip.value;
    // let inputCVVValue = inputCVV.value;
    let nameValid = nameRegex.test(inputName.value);
    let emailValid = emailRegex.test(inputEmail.value);
    let cardValid = cardRegex.test(inputCardNumber.value);
    let zipValid = zipRegex.test(inputZip.value);
    let cVVValid = cVVRegex.test(inputCVV.value);

    // Validate name all
    // if (!nameValid || !emailValid || !cardValid || !zipValid || !cVVValid) {
    //     e.preventDefault();
    //     console.log(`name is valid? ${nameValid}`);
    //     console.log(`email is valid? ${emailValid}`);
    //     console.log(`card is valid? ${cardValid}`);
    //     console.log(`zip is valid? ${zipValid}`);
    //     console.log(`CVV is valid? ${cVVValid}`);
    //     console.log(`CVV is valid? ${cVVValid}`);
    // }


    validateField(inputName, nameValid, e);
    validateField(inputEmail, emailValid, e);
    //if credit card info is hidden don't validate credit card
    if (!payCredit.hidden) {    
        validateField(inputCardNumber, cardValid, e);
        validateField(inputZip, zipValid, e);
        validateField(inputCVV, cVVValid, e);
    }



    // Validate email
    // console.log(`email is valid? ${emailValid}`);

    // if (emailValid == false) {
    //     errorTrue(inputEmail);
    // } else {
    //     errorFalse(inputEmail);
    // }

    // Validate Credi Card
    // console.log(`card is valid? ${cardValid}`);

    // if (cardValid == false) {
    //     errorTrue(inputCardNumber);
    // } else {
    //     errorFalse(inputCardNumber);
    // }

    // Validate zip
    // console.log(`zip is valid? ${zipValid}`);

    // if (zipValid == false) {
    //     errorTrue(inputZip);
    // } else {
    //     errorFalse(inputZip);
    // }

    // Validate CVV
    // console.log(`CVV is valid? ${cVVValid}`);

    // if (cVVValid == false) {
    //     errorTrue(inputCVV);
    // } else {
    //     errorFalse(inputCVV);
    // }

    // //To validate that at least one activity has been selected
    // if (activitesCostTotal == 0) {
    //     fieldsetActivites.classList.add('not-valid')
    // } else {
    //     fieldsetActivites.classList.add('valid')
    // }

    activitiesValidate(e);

})



//////////////////////////////////////////////////////////////////////////////////
// To inprove accesibility
//////////////////////////////////////////////////////////////////////////////////

for (i=0;i<activities.length;i++) {

    // to listen for activities focus
    activities[i].addEventListener('focus', (e) => {
        e.target.parentElement.classList.add("focus");
    } )
    //to listen for activities blue
    activities[i].addEventListener('blur', (e) => {
        e.target.parentElement.classList.remove("focus");
    } )
}


//////////////////////////////////////////////////////////////////////////////////
// For realtime error message
//////////////////////////////////////////////////////////////////////////////////
inputEmail.addEventListener('keyup', (e) => {
    validateField(inputEmail, emailRegex.test(inputEmail.value), e);
})

inputEmail.addEventListener('focusout', (e) => {
    validateField(inputEmail, emailRegex.test(inputEmail.value), e);
})

inputName.addEventListener('blur', (e) => {
    validateField(inputName, nameRegex.test(inputName.value), e);
})

inputZip.addEventListener('keyup', (e) => {
    validateField(inputZip, zipRegex.test(inputZip.value), e);
})

inputCardNumber.addEventListener('keyup', (e) => {
    validateField(inputCardNumber, cardRegex.test(inputCardNumber.value), e);
})

inputCVV.addEventListener('keyup', (e) => {
    validateField(inputCVV, cVVRegex.test(inputCVV.value), e);
})


