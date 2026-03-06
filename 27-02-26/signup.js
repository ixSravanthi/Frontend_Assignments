let users = JSON.parse(localStorage.getItem("users")) || [];
const params=new URLSearchParams();
// console.log(users);

let mail=document.getElementById('mail');
let password=document.getElementById('password');
let role=document.getElementById('role')
const signup_button=document.getElementById("signup_button")
signup_button.onclick=addDetails;

function addDetails(){
    const existingUser = users.find(u => u.email === mail.value);
    if(existingUser){
        alert("User already exists");
        return;
    }
    params.set('name',mail.value.split('@',1)[0]);
    params.set('role',role.value);
    users.push({email:mail.value,password:password.value,role:role.value});
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = `${role.value}_dashboard.html?${params.toString()}`;
    console.log(users);
}