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

    unfollowUser(id){
       return instance.delete(`follow/${id}`)
            .then( response => response.data)
    },

    followUser(id){
       return instance.post(`follow/${id}`, {})
           .then(response => response.data)
    }

};

export const ProfileAPI = {

    getProfile (id) {
        return instance.get(`profile/${id}`)
            .then( response => response.data)
    },

    getStatus (id) {
        return instance.get(`profile/status/${id}`)
            .then( response => response.data)
    },

    setStatus (status) {
        return instance.put('/profile/status', {status: status})
    },

    savePhoto (photo) {
        const formData = new FormData();
        formData.append('image', photo);
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        }).then( response => response.data)
    },

    saveProfile(data){
        return instance.put('profile', data)
            .then( response => response.data)
    }

};

export const AuthAPI = {

    AuthMe(){
        return instance.get(`auth/me`)
            .then(response => response.data)
    },

    AuthLogin(data){
        return instance.post('auth/login', data)
            .then(response => response.data)
    },

    AuthLogout(){
        return instance.delete('auth/login')
    },

};

export const SequrityAPI = {

    getCaptcha(){
        return instance.get('security/get-captcha-url')
            .then(response => response.data)
    }
};