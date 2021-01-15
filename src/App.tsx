import React from 'react';
import APIURL from './helpers/environment';
import './App.css';

import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

// type Props = {
//     token: string
// }

type User = {
    token: string;
    user: {
        username: string;
        id: string;
    }
}

type Props = {}

type State = {
    userId: string;
    token: string;
    // role: 'user' | 'admin';
}

export default class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            token: '',
            userId: '',
        }
    }

    componentDidMount = () => {
        if (localStorage.getItem('token')) {
            this.setState({
                token: localStorage.getItem('token') || ''
            })
        }
    }

    fetchUser = () => {
        fetch(`${APIURL}/user/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.state.token
            })
        })
            .then((res) => res.json())
            .then((user) => {
                this.setState({
                    userId: user.id
                })
            })
    }

    updateToken = (newToken: string) => {
        localStorage.setItem('token', newToken);
        this.setState({
            token: newToken,
        });
    }

    // updateToken = (newUser: User) => {
    //     const {token, user} = newUser;

    //     localStorage.setItem('token', token);
    //     this.setState({
    //         token,
    //         userId: user.id
    //     });
    // }

    logout = () => {
        localStorage.clear();
        this.setState({
            token: ''
        })
    }

    viewConductor = () => {
        return !this.state.token ? (
            <div>
                <Auth updateToken={this.updateToken.bind(this)} />
            </div>
        ) : (
                <Home clickLogout={this.logout.bind(this)} token={this.state.token} />)
    };


    render() {
        return (
            <div>
                {this.viewConductor()}
            </div>
        );
    }
}