
function hasUpperCase(str) {
    if (str.toLowerCase() != str) {
        return true
    } else {
        throw 'Needs at least one uppercase letter'
    }
}
function hasLowerCase(str) {
    if (str.toUpperCase() != str) {
        return true
    } else {
        throw 'Needs at least one lowercase letter'
    }
}
function hasNumber(myString) {
    if (/\d/.test(myString)) {
        return true
    } else {
        throw 'Needs at least one number'
    }
}
function meetsMaxReq(myString) {
    if (myString.length <= 32) {
        return true
    } else {
        throw 'Needs a maximum length of 32'
    }
}

function meetsMinReq(myString) {
    if (myString.length >= 8) {
        return true
    } else {
        throw 'Needs a minimum length of 8'
    }
}

function notContainUsername(myString, username) {
    if (!myString.includes(username) && !username.includes(myString)) {
        return true
    } else {
        throw 'Password needs to be different than username'
    }
}

function notDescendOrAscend(string) {
    let passValid = true;
    for (i = 0; i < string.length - 2; i++) {
        let currentChar = string.charCodeAt(i),
            oneCharLater = string.charCodeAt(i + 1),
            twoCharLater = string.charCodeAt(i + 2);

        if ((currentChar + 1 === oneCharLater && currentChar + 2 === twoCharLater) || (currentChar - 1 === oneCharLater && currentChar - 2 === twoCharLater)) {
            passValid = false;
            throw "Must not contain 3 or more ascending or descending numbers or letters"
            break;
        }
    }
    if (passValid) {
        return true;
    }
}


module.exports = {
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    meetsMinReq,
    meetsMaxReq,
    notContainUsername,
    notDescendOrAscend
}