import {PhotosType, ProfileType} from "../redux/reducers/auth-reducer";
import {DescriptionFormDataType} from "../components/Profile/Profile-info/DescriptionForm";
import {instance, RegularResponseType} from "./API";

type PhotosDataType = {
    photos: PhotosType
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
        return instance.put<RegularResponseType>('/profile/status', {status: status})
    },

    savePhoto(photo: File) {
        const formData = new FormData();
        formData.append('image', photo);
        return instance.put<RegularResponseType<PhotosDataType>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    },

    saveProfile(data: DescriptionFormDataType) {
        return instance.put<RegularResponseType>('profile', data)
            .then(response => response.data)
    }
};