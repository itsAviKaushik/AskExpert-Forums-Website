console.log("Linked");

let passwordInput = document.getElementById("password");
let cpasswordInput = document.getElementById("cpassword");
let password_validation = document.getElementById("password_validation");

function matchPassword(event) {
    let password = passwordInput.value;
    let cpassword = cpasswordInput.value;
    if (password === cpassword) {
        password_validation.style.display = "block";
        password_validation.style.color = "#198754";
        password_validation.innerHTML = "Password Match";
    } else {
        password_validation.style.color = "#ff0000";
        password_validation.innerHTML = "Password doesn't Match";
        password_validation.style.display = "block";
    }

}

passwordInput.addEventListener("keyup", matchPassword);
cpasswordInput.addEventListener("keyup", matchPassword);