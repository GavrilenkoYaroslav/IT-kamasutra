import React, {useEffect} from 'react';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import Music from './components/Music/Music';
import News from './components/News/News';
import CreateAvatar from './components/CreateAvatar/CreateAvatar';
import {BrowserRouter, HashRouter, Route, Switch} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeadContainer";
import {connect} from "react-redux";
import {initializeApp} from "./redux/reducers/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./HOC/withSuspense";
import {AppStateType} from "./redux/redux-store";
import background from './Images/background.png'
import kosmos from './Images/kosmos.jpg';
import {Col, Row} from "antd";
import StartPage from "./components/StartPage/StartPage";

const Login = React.lazy(() => import("./components/Login/Login"));
const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs'));
const NotFound = React.lazy(() => import ('./components/404/404'));


type MapStatePropsType = {
    initialized: boolean,
    theme: null | 'Dark'
}
type MapDispatchPropsType = {
    initializeApp: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType;

const App: React.FC<PropsType> = (props) => {

    useEffect(() => {
        props.initializeApp();
    }, []);

    if (!props.initialized) return <Preloader/>;
    return (
        <HashRouter>
            <Row>
                <Col span={24}>
                    <div className={`backgroundContainer`}>
                        <img src={background} alt={''} className={'background'}/>
                    </div>
                    {!!props.theme && <>
                        <div className={'darkBack'}/>
                        <img src={kosmos} alt={''} className={'kosmos'}/>
                    </>}

                    <Switch>
                        <Route exact path='/login' render={withSuspense(Login)}/>
                        <Route path='/' render={() => <div>
                            <HeaderContainer/>
                            <Row>
                                <Col span={4} offset={1} style={{maxWidth: 200}}>
                                    <NavBar/>
                                </Col>
                                <Col span={18} style={{marginLeft: 5}}>

                                    <Switch>
                                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                                    <Route path='/dialogs' render={withSuspense(Dialogs)}/>
                                    <Route path='/music' render={() => <Music/>}/>
                                    <Route path='/news' render={() => <News/>}/>
                                    <Route path='/avatar' render={() => <CreateAvatar/>}/>
                                    <Route path='/users' render={() => <UsersContainer/>}/>
                                    <Route exact path='/' render={() => <StartPage/>}/>
                                    <Route path={'*'} render={withSuspense(NotFound)}/>
                                    </Switch>

                                </Col>
                            </Row>
                        </div>}/>
                    </Switch>
                </Col>
            </Row>
        </HashRouter>
    );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        initialized: state.app.initialized,
        theme: state.app.theme
    }
};

const mapDispatchToProps: MapDispatchPropsType = {
    initializeApp
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(App);
