const params=new URLSearchParams(window.location.search);
let manager_name=params.get('name');
let role=params.get('role');

document.getElementById('name').innerHTML=`<h1>Welcome ${manager_name}!</h1>`;

const permissions =
JSON.parse(localStorage.getItem("permissions"));

const managerPermissions = permissions.manager;

if(managerPermissions.viewReports){
    document.getElementById("reports_section").style.display = "block";
}

if(managerPermissions.editProfile){
    document.getElementById("edit_profile_section").style.display = "block";
}
