import axios from "axios";

export const instance = axios.create({
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

export type RegularResponseType<D = {}> = {
    resultCode: resultCodes
    messages: Array<string>
    data: D
}




