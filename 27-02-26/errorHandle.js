if(!localStorage.getItem("permissions")){
    const permissions = {
        employee: {
            viewReports: false,
            editProfile: false
        },
        manager: {
            viewReports: true,
            editProfile: true
        }
    };

    localStorage.setItem("permissions", JSON.stringify(permissions));
}