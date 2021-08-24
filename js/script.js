// console.log("Test");


//////////////////////////////////////////////////////////////////////////////////
// To focus on first input (name field) on load
//////////////////////////////////////////////////////////////////////////////////
// const inputName = document.querySelector('input#name');
// inputName.focus();
document.querySelector('input#name').focus();

// To hide the Other Job Role field on load
const inputJobOther = document.querySelector('input#other-job-role');
function inputJobOtherHide() {
    inputJobOther.style.display = 'none';
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
    if (optionValue.value == optionJobOther.value) {
        inputJobOther.style.display = 'block';
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
        console.log(designTargetValue);
        console.log(dataTheme); 
        if (designTargetValue == dataTheme) {
            selectColorChildren.hidden = false;
            selectColorChildren.setAttribute('select', true);
        } else {
            selectColorChildren.hidden = true;
            selectColorChildren.setAttribute('select', false);
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
    } else if (e.target.checked == false) {
        activitesCostTotal -= activityCost;
    }
    // formatCost();
    activitesCostTotalPrint.innerHTML = `Total: $${activitesCostTotal}`;
});