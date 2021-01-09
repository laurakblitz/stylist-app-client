import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import Home from './components/Home/Home';

export default class App extends React.Component {
    state = {
        token: ''
    }

    componentWillMount() {
        if (localStorage.getItem('token')) {
            this.setState({
                token: localStorage.getItem('token')
            })
        }
    }

    updateToken = (newToken: string) => {
        localStorage.setItem('token', newToken)
        this.setState({
            token: newToken
        })
    }

    clearToken = () => {
        localStorage.clear();
        this.setState({
            token: ''
        })
    }

    render() {
        return (
            <div>
                <header className="app-header">
                    <Router>
                        <Home clearToken={this.clearToken.bind(this)} updateToken={this.updateToken.bind(this)} token={this.state.token} />
                    </Router>
                </header>
            </div>
        );
    }
}