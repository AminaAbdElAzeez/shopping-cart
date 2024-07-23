// Register User
let username = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let registerBtn = document.querySelector("#sign-up");

let nameLabel = document.querySelector("#name-label");
let passLabel = document.querySelector("#pass-label");
let emailLabel = document.querySelector("#email-label");

username.addEventListener("click", () => {
    nameLabel.style.top = "-20px"
})
email.addEventListener("click", () => {
    emailLabel.style.top = "-20px"
})
password.addEventListener("click", () => {
    passLabel.style.top = "-20px"
})

registerBtn.addEventListener("click", register);

function register(e) {
    e.preventDefault();
    if (username.value === "" || email.value === "" || password.value === "") {
        alert("Please Fill Data");
    } else {
        localStorage.setItem("username", username.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("password", password.value);        

        setTimeout(() => {
        window.location = "signin.html";
        }, 100);
    }
}
