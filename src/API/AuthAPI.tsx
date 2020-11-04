import {instance, RegularResponseType} from "./API";

type LoginResponseBodyType = {
    data: { userId: number }
}

type AuthMeResponseBodyType = {
    id: number
    email: string
    login: string
}

export type LoginRequestType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}


export const AuthAPI = {

    AuthMe() {
        return instance.get<RegularResponseType<AuthMeResponseBodyType>>(`auth/me`)
            .then(response => response.data)
    },

    AuthLogin(data: LoginRequestType) {
        return instance.post<RegularResponseType<LoginResponseBodyType>>('auth/login', data)
            .then(response => response.data)
    },

    AuthLogout() {
        return instance.delete<RegularResponseType>('auth/login')
    }

};