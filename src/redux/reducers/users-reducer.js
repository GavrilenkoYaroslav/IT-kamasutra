const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';


let initialState = [{
    id: '1',
    followed: false,
    fullName: 'Dmitry',
    status: 'hello world!',
    location: {city: 'Kiev', country: 'Ukraine'}
},
    {
        id: '2',
        followed: true,
        fullName: 'Andrew',
        status: 'i am boss!',
        location: {city: 'Moscow', country: 'Russia'}
    },
    {
        id: '3',
        followed: false,
        fullName: 'Alex',
        status: 'i am boss too!',
        location: {city: 'London', country: 'England'}
    }

];


const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state, users: state.users.map((user) => {
                        if (user.id === action.userId) {
                            return {...user, followed: true};
                        }
                        return user;
                    }
                )
            };
        case UNFOLLOW:
            return {
                ...state, users: state.users.map((user) => {
                        if (user.id === action.userId) {
                            return {...user, followed: false};
                        }
                        return user;
                    }
                )
            };
        case SET_USERS:
           return {...state, users: [...state.users, ...action.users]};

    }
};

    export const followActionCreator = (userId) => {
        return {
            type: FOLLOW,
            userId
        }
    };

    export const unFollowActionCreator = (userId) => {
        return {
            type: UNFOLLOW,
            userId
        }
    };

    export const setUsers = (users) =>{
      return {type : SET_USERS,
              users}
    };


export default usersReducer;