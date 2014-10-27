/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict";

/*  onReady()
This is called when the DOM is loaded and ready to be manipulated. This populates the state dropdown 
menu from the us-states.js file. In addition, it also adds an event listener so the signupForm 
can be submitted.
*/
function onReady() {
    var signupForm = document.getElementById('signup');
    var stateList = signupForm.elements['state'];
    var option;
    var idx;
    var stateName;
    for (idx = 0; idx < usStates.length; idx++) {
        option = document.createElement('option')
        stateName = usStates[idx]
        option.value = stateName.code;
        option.innerHTML = stateName.name;
        stateList.appendChild(option);
    }
    signupForm.addEventListener('submit', onSubmit);
} //onReady()

/* change()
Thks is called when the DOM is loaded and ready to be manipulated. This checks the value of the occupation form. If the value
is equal to 'other', then a new input form should appear.
*/
function change() {
   document.addEventListener('change', function(){
        if (document.getElementById('occupation').value == 'other') {
            document.getElementById('occupationOther').style.display = 'block';
        } else {
            document.getElementById('occupationOther').style.display = 'none';
        }
    });  
} //change()

/* onExit()
This is called when the DOM is loaded and ready to be manipulated. When the user clicks on the "No Thanks" button, a window should
appear to ask the user if they want to leave this page. If they answer 'Ok', then it will redirect them to google.com
*/
function onExit() {
   var exit = document.getElementById('cancelButton');
    exit.addEventListener('click', function () {
        if (window.confirm('Are you really sure you want to leave?')) {
            window.location = "http://www.google.com";
        }
    }); 
} //onExit()

/* onSubmit()
This is called when the user attempts to submit the sign up form. This looks at the parameter
passed by the browswer to see if the form is invalid. If the form is invalid, the form will not
submit and an error message will appear.
*/
function onSubmit(evt) {
    try {
        var valid = validateForm(this);
    }
    catch(exception) {
        valid = false;
    }
    if (!valid) {
         var errMsg = document.getElementById('error-message');
         errMsg.innerHTML = 'Please provide values for the required fields!';
         errMsg.style.display = 'block';
     }
    if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }
    evt.returnValue = valid;
    return valid;
}  //onSubmt()

/* validateForm()
This function will attempt to validate the form by looking at its information. If the information inside the form is invalid,
then it will return false. The parameter 'form' comes from the individual form that needs to be validated.
*/
function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
    var idx;
    var valid = true;
    for (idx = 0; idx < requiredFields.length; idx++) {
        valid &= validateRequiredField(form.elements[requiredFields[idx]]);
    }
    if (document.getElementById('occupation').value == 'other') {
        var otherInput = document.getElementById('occupationOther').value;
        otherInput = otherInput.trim();
        if (!otherInput.length > 0) {
            document.getElementById('occupationOther').className = 'form-control invalid-field';
            valid = false;
        } else {
            document.getElementById('occupationOther').className = 'form-control'
        }
    }
    return valid;
}  //validateForm()

/* validateRequriedField()
This function is called when the validateForm function reaches a field that is required. 
This function checks if the required field by looking at its value. If the value if empty
or doesn't match a specific required field's requirements, then it will return false.
*/

function validateRequiredField(field) {
    var value = field.value;
    value = value.trim();
    var valid = value.length > 0;
    if (valid) {
        if (field.name == 'zip') {
            var zipInput = field.value;
            var zipRegExp = new RegExp('^\\d{5}$');
            var validZip = zipRegExp.test(zipInput)
            if (!validZip) {
                field.className = 'form-control invalid-field';
                return !valid;
            }
        }
        if (field.name == 'birthdate') {
            var birthDateInput = new Date(field.value);
            var today = new Date();
            var yearDiff = today.getFullYear() - birthDateInput.getUTCFullYear();
            var monthDiff = today.getMonth() - birthDateInput.getUTCMonth();
            var dayDiff = today.getDate() - birthDateInput.getUTCDate();
            if(monthDiff < 0 || (0 == monthdiff && dayDiff < 0)) {
                yearDiff--;
            }
            if (yearDiff < 13) {
                field.className = 'form-control invalid-field';
                var birthDateMsg = document.getElementById('birthdateMessage');
                birthDateMsg.innerHTML = 'User is only ' + yearDiff + ' years old! Must be 13 to signup.';
                birthDateMsg.style.display = 'block';
                return !valid;
            }
        }
        field.className = 'form-control';
    }
    else {
        field.className = 'form-control invalid-field';
    }
    return valid;
} //validateRequiredField

//calls the functions onReady() when the DOMContentLoaded is raised
document.addEventListener('DOMContentLoaded', onReady);
//calls the functions change() when the DOMContentLoaded is raised
document.addEventListener('DOMContentLoaded', change);
//calls the functions onExit() when the DOMContentLoaded is raised
document.addEventListener('DOMContentLoaded', onExit);
