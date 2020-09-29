import {UsersAPI} from "../../API/API";
const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const PAGE_CHANGE = 'PAGE_CHANGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_FETCHING = 'TOGGLE_FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS';


let initialState = {
    users:[],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress : []
};


const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state, users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return {...user, followed: true};
                    }
                    return user;
                })
            };
        case UNFOLLOW:
            return {
                ...state, users: state.users.map((user) => {
                    if (user.id === action.userId) {
                        return {...user, followed: false};
                    }
                    return user;
                })
            };
        case SET_USERS:
            return {...state, users: [...action.users]};
        case PAGE_CHANGE:
            return {...state, currentPage: action.page};
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.usersCount};
        case TOGGLE_FETCHING:
            return {...state, isFetching: action.isFetching};
        case TOGGLE_FOLLOWING_IN_PROGRESS:
            return  {...state,
                followingInProgress: action.inProgress ? [...state.followingInProgress, action.userId]
            : state.followingInProgress.filter( id => id !== action.userId)};
        default: return state;

    }
};

export const toggleFollowingInProgress = (inProgress, userId) => {
    return {
        type: TOGGLE_FOLLOWING_IN_PROGRESS,
        inProgress,
        userId
    }
};

export const toggleFetching = (isFetching) => {
  return {
      type: TOGGLE_FETCHING,
      isFetching
  }
};

export const setTotalUsersCount = (usersCount) => {
  return {
      type: SET_TOTAL_USERS_COUNT,
      usersCount
  }
};

export const changePage = (page) => {
  return {
      type: PAGE_CHANGE,
      page
  }
};

export const followAction = (userId) => {
    return {
        type: FOLLOW,
        userId
    }
};

export const unfollowAction = (userId) => {
    return {
        type: UNFOLLOW,
        userId
    }
};

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        users
    }
};

export const getUsers = (currentPage, pageSize) => dispatch => {
    dispatch(toggleFetching(true));
    UsersAPI.getUsers(currentPage, pageSize).then(data => {
        dispatch(toggleFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    });
};

export const pageChange = (p, pageSize)=> dispatch =>{
    dispatch(toggleFetching(true));
    dispatch(changePage(p));
    UsersAPI.getUsers(p, pageSize)
        .then( data => {
            dispatch(toggleFetching(false));
            dispatch(setUsers(data.items));
        });
};

export const follow = (id) => dispatch => {
    dispatch(toggleFollowingInProgress(true, id));
    UsersAPI.followUser(id)
        .then(data => {
            if (data.resultCode === 0) {
               dispatch(followAction(id));
            }})
        .finally(()=> dispatch(toggleFollowingInProgress(false, id)));

};

export const unfollow = (id) => dispatch => {
    dispatch(toggleFollowingInProgress(true, id));
    UsersAPI.unfollowUser(id)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(unfollowAction(id))
            }})
        .finally(()=> dispatch(toggleFollowingInProgress(false, id)));
};



export default usersReducer;