import React from 'react';
import Header from "./Head";
import {connect} from "react-redux";
import * as axios from "axios";
import {setLogoSrc, toggleFetching} from "../../redux/reducers/auth-reducer";
import {setUserAuthData} from "../../redux/reducers/auth-reducer";

class HeaderContainer extends React.Component {

    componentDidMount() {
        this.props.toggleFetching(true);

        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                this.props.toggleFetching(false);
                if (response.data.resultCode === 0) {
                    let {id, login, email} = response.data.data;
                    this.props.setUserAuthData(id, login, email);

                    axios.get(`https://social-network.samuraijs.com/api/1.0/user/${id}`)
                        .then(response => {

                            this.props.setLogoSrc(response.data.photos.small);
                        });

                }
            });

    }

    render() {
        return (
            <Header {...this.props}/>
        );
    };
}

let mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};

let mapDispatchToProps = {
    toggleFetching,
    setUserAuthData,
    setLogoSrc
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);