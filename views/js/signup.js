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



// Check User id exists or not.

async function checkUserId(event) {
    // My Code Here...
    console.log(event.target.value);

    if (!event.target.value) {
        document.getElementById("userid_check").style.display = "none";
        return;
    }

    const response = await fetch(`/user/checkUserId/${event.target.value}`, {
        method: "GET"
    });

    const data = await response.json();

    if (data.status) {
        document.getElementById("userid_check").innerHTML = data.message;
        document.getElementById("userid_check").style.color = "green";
        document.getElementById("userid_check").style.display = "block";
    } else {
        document.getElementById("userid_check").style.color = "red";
        document.getElementById("userid_check").innerHTML = data.message;
        document.getElementById("userid_check").style.display = "block";
    }
}

document.getElementById("userid").addEventListener("keyup", (event)=> {
    checkUserId(event);
});