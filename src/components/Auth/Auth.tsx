import React, { Component } from 'react';
import { isPropertyAccessExpression } from 'typescript';
import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper'
import Login from './Login';
import Register from './Register';

type AuthState = {
    Login: boolean;
}

type AuthProps = {
    updateToken: (newToken: string) => void;
};

export default class Auth extends React.Component<AuthProps, AuthState> {
    constructor(props: any) {
        super(props);
        this.state = {
            Login: true
        };
    }

    toggle = () => {
        this.setState({
            Login: !this.state.Login
        });
    }

    render() {
        const text = this.state.Login ? 'Want to Register?' : 'I have an account';
        return (
            <div className="container">
                <Paper className="root" elevation={12}>
                    <Login updateToken={this.props.updateToken} />
                    <Register updateToken={this.props.updateToken} />
                    <p onClick={this.toggle}></p>
                </Paper>
                {/* <Container>
                    {this.state.isLogin ? (
                        <Login
                            isLogin={this.state.isLogin}
                            loginToggle={this.loginToggle.bind(this)}
                            updateToken={this.props.updateToken}
                        />
                    ) : (
                            <Register
                                isLogin={this.state.isLogin}
                                loginToggle={this.loginToggle.bind(this)}
                                updateToken={this.props.updateToken}
                            />
                        )}
                    <Login
                        isLogin={this.state.isLogin}
                        loginToggle={this.loginToggle.bind(this)}
                        updateToken={this.props.updateToken} />
                    <Register
                        isLogin={this.state.isLogin}
                        loginToggle={this.loginToggle.bind(this)}
                        updateToken={this.props.updateToken} />
                </Container> */}
            </div>
        )
    }
}

