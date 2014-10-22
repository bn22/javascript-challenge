/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
document.addEventListener('DOMContentLoaded', function(usStates){
    var signUp = document.getElementsById('signup');
    var stateList = signUp.elements['state'];
    var idx;
    var option;
    var stateName;
    for (idx = 0; idx < usStates.length(); idx++) {
        option = document.createElement('option');
        stateName = usStates[idx];
        option.value = stateName.code;
        option.innerHTML = stateName.displayTest;
        stateList.appendChild(option);
    }
});