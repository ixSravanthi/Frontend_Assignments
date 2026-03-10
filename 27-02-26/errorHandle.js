if(!localStorage.getItem("permissions")){
    const permissions = {
        employee: {
            viewReports: false,
            editProfile: false,
            editTasks: false
        },
        manager: {
            viewReports: false,
            editProfile: false,
            editTasks: false
        }
    };

    localStorage.setItem("permissions", JSON.stringify(permissions));
}