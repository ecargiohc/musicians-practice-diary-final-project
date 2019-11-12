const API_ROOT = `http://localhost:3000/api/v1`;
const token = localStorage.getItem('token');
const headers = {
    'Content-Type': 'application/json', 
    Accepts: 'application/json', 
    Authorization: 'Bearer ' + token
};

const getUserTasks = () => {
    return fetch(`${API_ROOT}/user_tasks/` , {headers: headers}).then(res => res.json())
};

const getTaskNotes = () => {
    return fetch(`${API_ROOT}/task_notes/`, {headers: headers}).then(res => res.json())
};

const getSubTasks = () => {
    return fetch(`${API_ROOT}/sub_tasks/`, {headers: headers}).then(res => res.json())
}

const getMedia = () => {
    return fetch(`${API_ROOT}/media/` , {headers: headers}).then(res => res.json())
};
const getComments = () => {
    return fetch(`${API_ROOT}/comments/` , {headers: headers}).then(res => res.json())
};
 
const login = data => {
    return fetch(`${API_ROOT}/login`, {
        method: 'POST', 
        headers, 
        body: JSON.stringify(data)
    }).then(res => res.json())
};

const getCurrentUser = () => {
    return fetch(`${API_ROOT}/current_user`, {
        headers
    }).then(res => res.json())
};

export const api = {
    auth: {
        login, 
        getCurrentUser
    },
    user_tasks: {
        getUserTasks
    },
    media: {
        getMedia
    },
    comments: {
        getComments
    },
    task_notes: {
        getTaskNotes
    },
    sub_tasks: {
        getSubTasks
    }
};

