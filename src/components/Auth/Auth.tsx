import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';

type UserProps = {
    isLogin: boolean;
}

type AppProps = {
    updateToken: (newToken: string) => void;
};

export default class Auth extends React.Component<AppProps, UserProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLogin: true
        };
    }

    loginToggle = () => {
        this.setState({
            isLogin: !this.state.isLogin
        });
    }

    render() {
        return (
            <div>
                <Login updateToken={this.props.updateToken} />
                <Register updateToken={this.props.updateToken} />
            </div>
        )
    }
}