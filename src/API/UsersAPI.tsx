import {instance, RegularResponseType} from "./API";
import {UserType} from "../redux/reducers/users-reducer";

export type GetUsersResponseType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export const UsersAPI = {

    getUsers(currentPage: number, pageSize: number, friend?: boolean, term?: string) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}` + (friend ? `&friend=true`:'') +(term ? `&term=${term}`:''))
            .then(response => response.data)
    },

    unfollowUser(id: number) {
        return instance.delete<RegularResponseType>(`follow/${id}`)
            .then(response => response.data)
    },

    followUser(id: number) {
        return instance.post<RegularResponseType>(`follow/${id}`, {})
            .then(response => response.data)
    }

};