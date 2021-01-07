import React, { Component } from 'react';
import { Button, Container, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@material-ui/core';

type LoginProps = {
    //isLogin: boolean,
    updateToken: (newToken: string) => void,
    //toggle: () => void
}

type LoginState = {
    username: string,
    password: string,
    handleopen: boolean
}

export default class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
            handleopen: false
        }
    }

    handleChange = (event: any) => {
        event.preventDefault();
        fetch('http://localhost:3005/user/login', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        })
            .then((res) => res.json())
            .then(data => {
                console.log(data)
                this.props.updateToken(data.sessionToken)
                this.handleOpen()
            });
    }

    handleOpen = () => {
        this.setState({
            handleopen: true,
        })
    };

    handleClose = () => {
        this.setState({
            handleopen: false,
        });
    };

    setUsername(event: string) {
        this.setState({
            username: (event)
        })
    }
    setPassword(event: string) {
        this.setState({
            password: (event)
        })
    }

    render() {
        return (
            <div>
                <Button onClick={this.handleOpen} id="LoginButton">
                    <strong>LOGIN</strong>
                </Button>
                <Dialog open={this.state.handleopen} onClose={this.handleClose}>
                    <DialogTitle id="dialogTitle">
                        <strong>LOGIN</strong>
                    </DialogTitle>
                    <DialogContent id="Login">
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Username"
                            type="text"
                            fullWidth
                            onChange={(e) => this.setUsername(e.target.value)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Password"
                            type="password"
                            fullWidth
                            onChange={(e) => this.setPassword(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions id="Loginbtn">
                        <Button onClick={this.handleChange} id="btn">
                            <strong>Login</strong>
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}