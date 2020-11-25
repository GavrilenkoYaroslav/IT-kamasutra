import React, {useEffect} from 'react';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeadContainer";
import {connect} from "react-redux";
import {initializeApp} from "./redux/reducers/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./HOC/withSuspense";
import {AppStateType} from "./redux/redux-store";
import background from './Images/background.png'
const Login = React.lazy(()=> import("./components/Login/Login"));
const Dialogs = React.lazy(()=>import('./components/Dialogs/Dialogs'));


type MapStatePropsType = {
    initialized: boolean
}
type MapDispatchPropsType = {
    initializeApp: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType;

const App: React.FC<PropsType> = (props) => {

    useEffect(()=>{
      props.initializeApp();
    },[]);

        if (!props.initialized) return <Preloader/>;
        return (
            <BrowserRouter>
                {/*<div className={'background'} style={{ background: `url(${background}) no-repeat`}}/>*/}

                <div className={'backgroundContainer'}>
                    <img src={background} alt={''} className={'background'}/>
                </div>
                <Switch>
                <Route exact path='/login' render={withSuspense(Login)}/>
                <Route path='/' render={()=> <div className={'Wrapper'}>
                    <HeaderContainer/>
                    <NavBar/>
                    <div className={'Container'}>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/dialogs' render={withSuspense(Dialogs)}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                    </div>
                </div> }/>
                </Switch>
            </BrowserRouter>
        );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
      initialized : state.app.initialized
  }
};

const mapDispatchToProps: MapDispatchPropsType = {
    initializeApp
};

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(App);
