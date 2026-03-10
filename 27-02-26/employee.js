const params=new URLSearchParams(window.location.search);
let employee_name=params.get('name');
let employee_role=params.get('role');

document.getElementById('name').innerHTML=`<h1>Welcome ${employee_name}!</h1>`;

const permissions =
JSON.parse(localStorage.getItem("permissions"));

const employeePermissions = permissions.employee;

if(employeePermissions.viewReports){
    document.getElementById("reports_section").style.display = "block";
}

if(employeePermissions.editProfile){
    document.getElementById("edit_profile_section").style.display = "block";
}

if(employeePermissions.editTasks){
    document.getElementById("edit_tasks_section").style.display = "block";
}