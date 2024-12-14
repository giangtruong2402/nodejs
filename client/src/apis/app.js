import axios from "../axios";



export const apiGetCategories = () => axios({
    url: '/productCategory/',
    method: 'get'
})