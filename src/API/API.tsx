import axios from "axios";
import {UserType} from "../redux/reducers/users-reducer";
import {PhotosType, ProfileType} from "../redux/reducers/auth-reducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        'API-KEY': '8db7e860-79e2-4316-a7a6-e54ca669f748'
    }
});

export enum resultCodes {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

type ResponseType = {
    resultCode: resultCodes
    messages: Array<string>
    data: object
}

export const UsersAPI = {

    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    unfollowUser(id: number) {
        return instance.delete<ResponseType>(`follow/${id}`)
            .then(response => response.data)
    },

    followUser(id: number) {
        return instance.post<ResponseType>(`follow/${id}`, {})
            .then(response => response.data)
    }

};

type SavePhotoResponseType = {
    resultCode: number
    messages: Array<string>
    data: { photos: PhotosType}
}

export const ProfileAPI = {

    getProfile(id: number) {
        return instance.get<ProfileType>(`profile/${id}`)
            .then(response => response.data)
    },

    getStatus(id: number) {
        return instance.get<string>(`profile/status/${id}`)
            .then(response => response.data)
    },

    setStatus(status: string) {
        return instance.put<ResponseType>('/profile/status', {status: status})
    },

    savePhoto(photo: any) {
        const formData = new FormData();
        formData.append('image', photo);
        return instance.put<SavePhotoResponseType>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    },

    saveProfile(data: ProfileType) {
        return instance.put<ResponseType>('profile', data)
            .then(response => response.data)
    }
};

export type LoginRequestType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}
type AuthMeResponseBodyType = {
    id: number
    email: string
    login: string
}
export type AuthMeResponseType = {
    resultCode: resultCodes
    messages: Array<string>
    data: AuthMeResponseBodyType
}
type LoginResponseType = {
    resultCode: resultCodes
    messages: Array<string>
    data: { userId: number }
}
type GetCaptchaResponseType = {
    url: string
}

export const AuthAPI = {

    AuthMe() {
        return instance.get<AuthMeResponseType>(`auth/me`)
            .then(response => response.data)
    },

    AuthLogin(data: LoginRequestType) {
        return instance.post<LoginResponseType>('auth/login', data)
            .then(response => response.data)
    },

    AuthLogout() {
        return instance.delete<ResponseType>('auth/login')
    },

};

export const SequrityAPI = {

    getCaptcha() {
        return instance.get<GetCaptchaResponseType>('security/get-captcha-url')
            .then(response => response.data)
    }
};