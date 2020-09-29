import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY' : '8db7e860-79e2-4316-a7a6-e54ca669f748'
    }
});

export const UsersAPI = {

    getUsers(currentPage, pageSize){
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    getSingleUser(id){
      return instance.get(`profile/${id}`)
          .then( response => response.data)
    },

    unfollowUser(id){
       return instance.delete(`follow/${id}`)
            .then( response => response.data)
    },

    followUser(id){
       return instance.post(`follow/${id}`, {})
           .then(response => response.data)
    }

};

export const AuthAPI = {

    AuthMe(){
        return instance.get(`auth/me`)
            .then(response => response.data)
    }

};