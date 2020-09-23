const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const PAGE_CHANGE = 'PAGE_CHANGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_FETCHING = 'TOGGLE_FETCHING';


let initialState = {
    users:[],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
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
        default: return state;

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

export const follow = (userId) => {
    return {
        type: FOLLOW,
        userId
    }
};

export const unfollow = (userId) => {
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


export default usersReducer;