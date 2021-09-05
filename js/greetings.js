'use strict';

const nameForm = document.querySelector(".login-form");
const nameInput = document.querySelector(".login-input");
const nameContainer = document.querySelector(".name");
const USER_LS = "user";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function onSubmit(event){
    event.preventDefault();
    const currentValue = nameInput.value;
    showName(currentValue);
    saveName(currentValue);
    nameInput.value = '';
}

function showName(text) {
    nameForm.classList.add("login-hide");
    nameContainer.classList.remove("login-hide");
    nameContainer.innerHTML = `Welcome ${text}`;
}

function askForName() {
    nameForm.classList.remove("login-hide");
    nameForm.addEventListener("submit", onSubmit);
}

const userName = localStorage.getItem(USER_LS);
if (userName === null) {
    askForName();
} else {
    showName(userName);
}



