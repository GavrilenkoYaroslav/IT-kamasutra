const SEND_MESSAGE = 'SEND_MESSAGE';

type MessageType = {
    id: number
    message: string
}
type DialogType = {
    id: number
    name: string
    logoSrc: string
}

export type InitialStateType = typeof initialState;

const initialState = {
    MessagesData: [
        {id: 1, message: 'Hi!'},
        {id: 2, message: 'How are u?'},
        {id: 3, message: 'Fine'},
    ] as Array<MessageType>,
    DialogsData: [
        {
            id: 1,
            name: 'Dima',
            logoSrc: 'https://i.pinimg.com/280x280_RS/91/a3/2c/91a32c5d5d8fd2a5c81c6874a65a4fb4.jpg'
        },
        {
            id: 2,
            name: 'Alex',
            logoSrc: 'https://www.autoalloys.com/content/images/thumbs/0003760_19-ava-memphis-hyper-silver-alloy-wheels_550.png'
        },
        {
            id: 3,
            name: 'Vanya',
            logoSrc: 'https://whatsism.com/uploads/posts/2018-07/1530546770_rmk_vdjbx10.jpg'
        },
        {id: 4, name: 'Viktor', logoSrc: 'https://archilab.online/images/1/123.jpg'},
        {id: 5, name: 'Andrew', logoSrc: 'https://cs16planet.ru/steam-avatars/images/avatar2700.jpg'}
    ] as Array<DialogType>
};


const dialogsReducer = (state = initialState, action:any): InitialStateType => {

    switch (action.type) {
        case SEND_MESSAGE: {
            let messageId = state.MessagesData.length + 1;
            let newMessage = {
                id: messageId,
                message: action.message
            };
            return {...state, MessagesData: [...state.MessagesData, newMessage]};
        }
        default:
            return state;
    }

};

type SendMessageType = {
    type: typeof SEND_MESSAGE
    message: string
}

export const sendMessageActionCreator = (message:string): SendMessageType => {
    return {type: SEND_MESSAGE, message};
};

export default dialogsReducer;