import React, {useEffect} from 'react';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings.tsx';
import {BrowserRouter, Route} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeadContainer";
import {connect} from "react-redux";
import {initializeApp} from "./redux/reducers/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./HOC/withSuspense";
const Login = React.lazy(()=> import("./components/Login/Login"));
const Dialogs = React.lazy(()=>import('./components/Dialogs/Dialogs'));


const App = (props) => {

    useEffect(()=>{
      props.initializeApp();
    },[]);

        if (!props.initialized) return <Preloader/>;
        return (
            <BrowserRouter>
                <div className={'Wrapper'}>
                    <HeaderContainer/>
                    <NavBar/>
                    <div className={'Container'}>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/dialogs' render={withSuspense(Dialogs)}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/settings' render={() => <Settings/>}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' render={withSuspense(Login)}/>
                    </div>
                </div>
            </BrowserRouter>
        );
};

const mapStateToProps = state => {
  return {
      initialized : state.app.initialized
  }
};

const mapDispatchToProps = {
    initializeApp
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
