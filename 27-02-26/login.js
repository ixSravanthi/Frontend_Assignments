const params=new URLSearchParams();

let mail=document.getElementById('mail');
let password=document.getElementById('password');
let login_button=document.getElementById('login_button');
login_button.onclick=values;

function values(){
    const users = JSON.parse(localStorage.getItem("users")) || [];
    console.log(users);
    const user=users.find((m)=>
        m.email===mail.value && m.password===password.value);
    if(user){
        params.set('name',mail.value.split('@',1)[0]);
        params.set('role',user.role);
        window.location.href=`${user.role}_dashboard.html?${params.toString()}`;
    }
    console.log(user);
    console.log(mail.value,password.value,user.role);
}