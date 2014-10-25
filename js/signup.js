"use strict";

document.addEventListener("DOMContentLoaded", function() {
	var option;
	var idx;
	var stateForm = document.getElementById('signup').elements['state'];
	var jobOption = document.getElementById('occupation');
	var other = document.getElementById('signup').elements['occupationOther'];
	var noThanks = document.getElementById('cancelButton');
	var signupForm = document.getElementById('signup');

	for (idx = 0; idx < usStates.length; idx++) {
		option = document.createElement('option');
		option.innerHTML = usStates[idx].name;
		option.value = usStates[idx].code;
		stateForm.appendChild(option);
	}

	jobOption.addEventListener('change', function() {
		if (jobOption.value === 'other') {
			other.style.display ='block';
		} else {
			other.style.display = 'none';
		}
	});

	noThanks.addEventListener('click', function() {
		if(window.confirm('Are you sure you want to leave?')) {
			window.location = 'http://www.google.com';
		}

	});
	signup.addEventListener('submit', onSubmit);
});	

function onSubmit(evt) {
    evt.returnValue = validateForm(this);
    if (!evt.returnValue && evt.preventDefault) {
        evt.preventDefault();
    }
    return evt.returnValue;
}

function validateForm(form) {
    if (jobOption.value === 'other') {
    	var fieldsRequired = ['firstName', 'lastName', 'address1', 
    	'city', 'state', 'zip', 'birthdate', 'occupationOther'];
    } else {
    	var fieldsRequired = ['firstName', 'lastName', 'address1', 
    	'city', 'state', 'zip', 'birthdate'];
    }
    var idx;
    var form = true;
    for (idx = 0; idx < fieldsRequired.length; idx++) {
        form &= validatingField(form.elements[requiredFields[idx]]);
    }

    return form;
}

function validatingFields(field) {
	var required = field.value.trim();
	var valid = required.length > 0;
	if (valid) {
		field.className = 'form-control';
	} else {
		field.className = 'form-control invalid-field';
	}
	return valid;
}
function calculateAge(dob) {
    if (!dob) {
        throw new Error('Please tell me when you were born!');
    }
    var today = new Date();
    dob = new Date(dob);
    var yearsDiff = today.getFullYear() - dob.getUTCFullYear();
    var monthDiff = today.getMonth() - dob.getUTCMonth();
    var daysDiff = today.getDate() - dob.getUTCDate();

    if (monthDiff < 0 ||(0 === monthDiff && daysDiff < 0 )) {
        yearsDiff--;
    }

    return yearsDiff;
}

function testZip(zip) {
    var zipRegExp = new RegExp('^\\d{5}$');
    if (!zipRegEx.test(name)) {
        throw new Error();
    }
}