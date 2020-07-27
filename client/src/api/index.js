import axios from 'axios'

const api = axios.create({
    baseURL: `http://localhost:3000/api`,
    withCredentials: true,
})

export const register = (data) => api.post('/register', data)
export const logIn = (data) => api.post('/login', data)
export const logOut = (data) => api.post('/logout', data)
export const getLoggedStatus = () => api.get('/isLogged')

export const getTasks = () => api.get('/tasks')
export const getTaskById = (id) => api.get(`/task/${id}`)
export const getDayTasks = (date) => api.get(`/tasks/${date.year}/${date.month}/${date.day}`)
export const insertTask = (data) => api.post('/task', data)
export const updateTask = (id, data) => api.put(`/task/${id}`, data)
export const deleteTask = (id) => api.delete(`/task/${id}`)

const apis = {
    register,
    logIn,
    logOut,
    getLoggedStatus,

    getTasks,
    getTaskById,
    getDayTasks,
    insertTask,
    updateTask,
    deleteTask
}

export default apis