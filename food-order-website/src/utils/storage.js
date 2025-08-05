export const getUsers = () => {
    return JSON.parse(localStorage.getItem("users")) || [];
};

export const saveUser = (user) => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
};


export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("currentUser"));
};

export const setCurrentUser = (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
};

export const logoutUser = () => {
    localStorage.removeItem("currentUser");
};




export const updateUserProfile = (updatedData) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) return;


    const updatedUser = { ...currentUser, ...updatedData };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));


    const updatedUsers = users.map(user =>
        user.email === currentUser.email ? updatedUser : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    return updatedUser;
};



export const getAllUsers = () => {
    return JSON.parse(localStorage.getItem("users")) || [];
};

export const saveUser1 = (newUser) => {
    const users = getAllUsers();
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
};



