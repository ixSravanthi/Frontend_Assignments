const params=new URLSearchParams(window.location.search);
let employee_name=params.get('name');
let employee_role=params.get('role');

document.getElementById('name').innerHTML=`<h1>Welcome ${employee_name}!</h1>`;

const permissions = JSON.parse(localStorage.getItem("permissions"));

document.getElementById("emp_viewReports").checked =
permissions.employee.viewReports;

document.getElementById("emp_editProfile").checked =
permissions.employee.editProfile;

document.getElementById("emp_editTasks").checked =
permissions.employee.editTasks;

document.getElementById("mgr_viewReports").checked =
permissions.manager.viewReports;

document.getElementById("mgr_editProfile").checked =
permissions.manager.editProfile;

document.getElementById("mgr_editTasks").checked =
permissions.manager.editTasks;

document.getElementById("save_permissions").onclick = function(){

    const updatedPermissions = {
        employee:{
            viewReports: document.getElementById("emp_viewReports").checked,
            editProfile: document.getElementById("emp_editProfile").checked,
            editTasks: document.getElementById("emp_editTasks").checked

        },
        manager:{
            viewReports: document.getElementById("mgr_viewReports").checked,
            editProfile: document.getElementById("mgr_editProfile").checked,
            editTasks: document.getElementById("mgr_editTasks").checked

        }
    };

    localStorage.setItem("permissions", JSON.stringify(updatedPermissions));
    alert("Permissions Updated");
};