import React from 'react';
import './App.css';
import Header from "./components/Header/Head";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import Music from './components/Music/Music';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import {BrowserRouter, Route} from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";


const App = () =>{
        return (
            <BrowserRouter>
            <div className={'Wrapper'}>
                <Header/>
                <NavBar/>
                <div className={'Container'}>
                    <Route path='/profile' render={()=> <Profile/> }/>
                    <Route path='/dialogs' render={()=> <Dialogs/>} />
                    <Route path='/music' render={()=> <Music/>}/>
                    <Route path='/news' render={()=> <News/>}/>
                    <Route path='/settings' render={()=> <Settings/>}/>
                    <Route path='/users' render={ ()=> <UsersContainer/>}/>
                </div>
            </div>
            </BrowserRouter>

        );
    };

export default App;
