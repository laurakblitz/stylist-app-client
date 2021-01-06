import React, { Component } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';

type RegisterProps = {
    updateToken: (newToken: string) => void,
}

type RegisterState = {
    username: string,
    email: string,
    password: string
}

export default class Register extends React.Component<RegisterProps, RegisterState> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    handleChange = (event: any) => {
        event.preventDefault();
        fetch('http://localhost:3005/user/register', {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        })
            .then((res) => res.json())
            .then(data => {
                console.log(data)
                // this.props.updateToken(data.sessionToken)
            })
    }

    setUsername(event: string) {
        this.setState({
            username: (event)
        })
    }
    setEmail(event: string) {
        this.setState({
            email: (event)
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
                        Register
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
                        label="Email"
                        type="text"
                        fullWidth
                        onChange={(e) => this.setEmail(e.target.value)}
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