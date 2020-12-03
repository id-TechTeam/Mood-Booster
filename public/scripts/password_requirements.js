var pwinput = document.getElementById("password"),
    usernameInput = document.getElementById("username"),
    registerButton = document.getElementById("register"),
    req_minLength = document.getElementById("pw_req_min_length").firstChild,
    req_maxLength = document.getElementById("pw_req_max_length").firstChild,
    req_lowercase = document.getElementById("pw_req_lowercase").firstChild,
    req_uppercase = document.getElementById("pw_req_uppercase").firstChild,
    req_number = document.getElementById("pw_req_number").firstChild,
    req_notUsername = document.getElementById("pw_req_notUsername").firstChild,
    req_notAscendDescend = document.getElementById("pw_req_notAscendDescend").firstChild;

var bools = {
    minLength: false,
    maxLength: false,
    lowercase: false,
    uppercase: false,
    number: false,
    notUsername: false,
    notAscendDescend: false,
}

console.log(registerButton);

pwinput.addEventListener("input", function () {
    var string = this.value;
    var username = usernameInput.value;
    checkMinLength(string)
    checkMaxLength(string)
    checkLowercase(string)
    checkUppercase(string)
    checkNumber(string)
    checkNotUsername(string, username)
    checkNotAscendDescend(string)
    updateSubmitButton(bools);
})

function checkMinLength(str) {
    if (str.length >= 8) {
        checkmarkIcon(req_minLength);
        bools.minLength = true;
    } else {
        timesIcon(req_minLength);
        bools.minLength = false;
    }
}

function checkMaxLength(str) {
    if (str.length <= 32) {
        checkmarkIcon(req_maxLength);
        bools.maxLength = true;
    } else {
        timesIcon(req_maxLength);
        bools.maxLength = false;
    }
}

function checkLowercase(str) {
    if (str.toUpperCase() != str) {
        checkmarkIcon(req_lowercase);
        bools.lowercase = true;
    } else {
        timesIcon(req_lowercase);
        bools.lowercase = false;
    }
}

function checkUppercase(str) {
    if (str.toUpperCase() != str) {
        checkmarkIcon(req_uppercase);
        bools.uppercase = true;
    } else {
        timesIcon(req_uppercase);
        bools.uppercase = false;
    }
}

function checkNumber(str) {
    if (/\d/.test(str)) {
        checkmarkIcon(req_number);
        bools.number = true;
    } else {
        timesIcon(req_number);
        bools.number = false;
    }
}

function checkNotUsername(pw, un) {
    if (!un.includes(pw) && !pw.includes(un)) {
        checkmarkIcon(req_notUsername);
        bools.notUsername = true;
    } else {
        timesIcon(req_notUsername);
        bools.notUsername = false;
    }
}

function checkNotAscendDescend(str) {
    let passValid = true;
    for (i = 0; i < str.length - 2; i++) {
        let currentChar = str.charCodeAt(i),
            oneCharLater = str.charCodeAt(i + 1),
            twoCharLater = str.charCodeAt(i + 2);

        if ((currentChar + 1 === oneCharLater && currentChar + 2 === twoCharLater) || (currentChar - 1 === oneCharLater && currentChar - 2 === twoCharLater)) {
            passValid = false;
            timesIcon(req_notAscendDescend);
            bools.notAscendDescend = false;
            break;
        }
    }
    if (passValid) {
        checkmarkIcon(req_notAscendDescend);
        bools.notAscendDescend = true;
    }
}

function checkmarkIcon(_icon) {
    _icon.classList.remove("far", "fas", "fa-circle", "fa-times");
    _icon.classList.add("fas", "fa-check");
}

function timesIcon(_icon) {
    _icon.classList.remove("far", "fas", "fa-circle", "fa-check");
    _icon.classList.add("fas", "fa-times");
}

function updateSubmitButton(obj) {
    for (var o in obj) {
        if (!obj[o]) {

            registerButton.setAttribute("disabled", "");
            return
        };

        registerButton.removeAttribute("disabled");
    }
}