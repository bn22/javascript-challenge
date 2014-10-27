/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict";

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
}

document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('change', function(){
    if (document.getElementById('occupation').value == 'other') {
        document.getElementById('occupationOther').style.display = 'block';
    } else {
        document.getElementById('occupationOther').style.display = 'none';
    }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var exit = document.getElementById('cancelButton');
    exit.addEventListener('click', function () {
        if (window.confirm('Are you really sure you want to leave?')) {
            window.location = "http://www.google.com";
        }
    });
});

function onSubmit(evt) {
    var valid = validateForm(this);
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
} 

function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
    var idx;
    var valid = true;
    for (idx = 0; idx < requiredFields.length; idx++) {
        valid &= validateRequiredField(form.elements[requiredFields[idx]]);
    }
    if (document.getElementById('occupation').value == 'other') {
        var otherInput = document.getElementById('occupationOther').value;
        if (!otherInput.trim().length > 0) {
            document.getElementById('occupationOther').className = 'form-control invalid-field';
            valid = false;
        }
    }
    return valid;
} 

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
                return !valid;
            }
        }
        field.className = 'form-control';
    }
    else {
        field.className = 'form-control invalid-field';
    }
    return valid;
}

document.addEventListener('DOMContentLoaded', onReady);