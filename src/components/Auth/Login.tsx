import React, { Component } from 'react';
import {Button, TextField, Typography} from '@material-ui/core';

type LoginProps = {
    updateToken: (newToken: string) => void
}

type LoginState = {
    username: string,
    password: string,
}

export default class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: ''
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
            })
    }

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
                <form onSubmit={(event) => this.handleChange(event)}>
                    <Typography variant="h5" component="h5">
                        Login
                </Typography>
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
                    <Button type="submit" color="primary">
                        Login
                    </Button>
                </form>
            </div>
        )
    }
}