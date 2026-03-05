const params=new URLSearchParams(window.location.search);
let employee_name=params.get('name');
let employee_role=params.get('role');

document.getElementById('name').innerHTML=`<h1>${employee_name}</h1>`;
document