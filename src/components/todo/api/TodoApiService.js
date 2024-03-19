import { apiClient } from './ApiClient'
import axios from "axios"
export const retrieveAllTodosForUsernameApi
    = async (username) => await axios.get(`/users/${username}/todos`,{
        headers: {
          Authorization: localStorage.getItem("token"),
        }, })

export const deleteTodoApi
    = (username, id) => axios.delete(`/users/${username}/todos/${id}`,{
        headers: {
          Authorization: localStorage.getItem("token"),
        }, })

export const retrieveTodoApi
    = (username, id) => axios.get(`/users/${username}/todos/${id}`,{
        headers: {
          Authorization: localStorage.getItem("token"),
        }, })

export const updateTodoApi
    = (username, id, todo) => axios.put(`/users/${username}/todos/${id}`, todo,{
        headers: {
          Authorization: localStorage.getItem("token"),
        }, })

export const createTodoApi
    = (username,  todo) => axios.post(`/users/${username}/createTodos`, todo,{
        headers: {
          Authorization: localStorage.getItem("token"),
        }, })
