/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use strict";

document.addEventListener('DOMContentLoaded', function() {

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
});

document.addEventListener('DOMContentLoaded', function() {
	if (document.getElementById('occupation').value == 'other') {
		document.getElementById('occupationOther').style = 'block';
	}
});

