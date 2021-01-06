import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';

import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';


export default class App extends React.Component {
    state = {
        sessionToken: ''
    }

    componentWillMount() {
        if (localStorage.getItem('token')) {
            this.setState({
                sessionToken: localStorage.getItem('token')
            })
        }
    }

    updateToken = (newToken: string) => {
        localStorage.setItem('token', newToken)
        this.setState({
            sessionToken: newToken
        })
    }

    logout = () => {
        localStorage.clear();
        this.setState({
            sessionToken: ''
        })
    }

    protectedViews = () => {
        return (
            this.state.sessionToken === localStorage.getItem('token') ?
                <div>
                    <Router>
                        <Home clickLogout={this.logout.bind(this)} token={this.state.sessionToken} />
                    </Router>
                </div>
                : <Auth updateToken={this.updateToken.bind(this)} />
        );
    }
    render() {
        return (
            <div>
                {this.protectedViews()}
            </div>
        );
    }
}