/*
application script for javascript challenge
 */

"use strict";

document.addEventListener("DOMContentLoaded", function() {
	var option;
	var idx;
	var stateForm = document.getElementById('signup').elements['state'];
	var jobOption = document.getElementById('occupation');
	var other = document.getElementById('signup').elements['occupationOther'];
	var noThanks = document.getElementById('cancelButton');
	var signupForm = document.getElementById('signup');

    //creates the states list
	for (idx = 0; idx < usStates.length; idx++) {
		option = document.createElement('option');
		option.innerHTML = usStates[idx].name;
		option.value = usStates[idx].code;
		stateForm.appendChild(option);
	}

    //if the user chooses other as a job option,
    //what that other job is, will be asked
	jobOption.addEventListener('change', function() {
		if (jobOption.value === 'other') {
			other.style.display ='block';
		} else {
			other.style.display = 'none';
		}
	});

    //if the user does not want to stay on the page
    //they can opt out and go to google.com
	noThanks.addEventListener('click', function() {
		if(window.confirm('Are you sure you want to leave?')) {
			window.location = 'http://www.google.com';
		}
	});

    //when the user tries to submit the form
    //will submit if all required fields are filled out
    signupForm.addEventListener('submit', onSubmit);
	
});

/*
 *called when the user tries to submit the form
 * if the user is less than 13 or they do not input
 * the zip code as 5 digits or if they do not
 * fill out all the blanks the form will not submit
 *
 * parameter: information related to the event, passed in by the browser
 */
function onSubmit(eventClick) {
    var dob = this.elements['birthdate'].value;
    var zipCode = this.elements['zip'].value;

    eventClick.returnValue = validateForm(this);

    //calculates if user is more than 13, if not form
    //will not submit
    try {
        calculateAge(dob);
        cancelMessage();
    } catch(exception) {
        displayError('You must be 13 or older to sign up');
        eventClick.returnValue = false;
    }

    try {
        testZip(zipCode);
    } catch(exception) {
        this.elements['zip'].className = 'form-control invalid-field';
        eventClick.returnValue = false;
    }

    if (!eventClick.returnValue && eventClick.preventDefault) {
        eventClick.preventDefault();
    }
    return eventClick.returnValue;
}

/*
 *Checks to see if all the required fields are filled out
 * if they are not, then the form will not submit
 *
 * parameter: looks to see what the user has input
 */
function validateForm(form) {
    var fieldsRequired = ['firstName', 'lastName', 'address1',
        'city', 'state', 'zip', 'birthdate'];
    var idx;
    var occupation1 = 'occupationOther';
    var formsValid = true;
    for (idx = 0; idx < fieldsRequired.length; idx++) {
        formsValid &= validateField(form.elements[fieldsRequired[idx]]);
    }
    if (document.getElementById('occupation').value === 'other') {
        formsValid &= validateField(form.elements[occupation1]);
    }

    return formsValid;
}



/*
 *Checks to see if the fields are filled out and without any blank spaces
 * parameter: the field that is going to be checked
 */
function validateField(field) {
    var value = field.value.trim();
    var valid = value.length > 0;
    if (valid) {
        field.className = 'form-control';
    } else {
        field.className = 'form-control invalid-field';
    }
    return valid;
}

/*Calculates the age and if the user is less than 13 years old
 *will throw error if they are not
 * parameters: the user's date of birth to calculate with today's date
 */
function calculateAge(dob) {
    var today = new Date();
    dob = new Date(dob);
    var yearsDiff = today.getFullYear() - dob.getUTCFullYear();
    var monthDiff = today.getMonth() - dob.getUTCMonth();
    var daysDiff = today.getDate() - dob.getUTCDate();
    if (monthDiff < 0 ||(0 === monthDiff && daysDiff < 0 )) {
        yearsDiff--;
    }
    if (yearsDiff < 13) {
        throw new Error();
    }
}

/*
 *Looks to see if the zip code is 5 digits
 * parameter: the zip code to be checked
 */
function testZip(zip) {
    var zipRegExp = new RegExp('^\\d{5}$');
    if (!zipRegExp.test(zip)) {
        throw new Error();
    }
}

/*
 *displays a message if there is an error
 * parameter: the error that is going to be displayed
 */
function displayError(error) {
    displayMessage(error, true);

}

/*
 *displays the error in the birthdate
 * parameters: the message that is going to be displayed
 *             an isError boolean, to see if there actually is an error
 */
function displayMessage(message, isError) {
    var msgElem = document.getElementById('birthdateMessage');
    msgElem.innerHTML = message;
    msgElem.className = isError ? 'alert alert-danger' : 'alert alert-success';
    msgElem.style.display = 'block';
}

/*
 *gets rid of the error message if there is no more errors
 */
function cancelMessage() {
    var msgElem2 = document.getElementById('birthdateMessage');
    msgElem2.style.display = 'none';
}

