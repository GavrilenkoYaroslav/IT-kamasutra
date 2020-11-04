import {instance} from "./API";


type GetCaptchaResponseType = {
    url: string
}

export const SequrityAPI = {

    getCaptcha() {
        return instance.get<GetCaptchaResponseType>('security/get-captcha-url')
            .then(response => response.data)
    }
};