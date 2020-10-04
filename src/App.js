import React from 'react';
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import Dialogs from "./components/Dialogs/Dialogs";
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings.tsx';
import {BrowserRouter, Route} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeadContainer";
import Login from "./components/Login/Login";


const App = () =>{
        return (
            <BrowserRouter>
            <div className={'Wrapper'}>
                <HeaderContainer/>
                <NavBar/>
                <div className={'Container'}>
                    <Route path='/profile/:userId' render={()=> <ProfileContainer/> }/>
                    <Route exact path='/profile/' render={()=> <ProfileContainer/> }/>
                    <Route path='/dialogs' render={()=> <Dialogs/>} />
                    <Route path='/music' render={()=> <Music/>}/>
                    <Route path='/news' render={()=> <News/>}/>
                    <Route path='/settings' render={()=> <Settings/>}/>
                    <Route path='/users' render={ ()=> <UsersContainer/>}/>
                    <Route path='/login' render={ ()=> <Login/>}/>
                </div>
            </div>
            </BrowserRouter>

        );
    };

export default App;
