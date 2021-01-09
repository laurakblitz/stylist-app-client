import React from 'react';
import { 
    Button, 
    Container,  
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    TextField,
    Typography } from '@material-ui/core';

type Props = {
    //Login: boolean,
    updateToken: (newToken: string) => void,
    //toggle: () => void
}

type State = {
    username: string,
    email: string,
    password: string,
    role: boolean,
    handleopen: boolean,
}

export default class Register extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            role: false,
            handleopen: false,
        }
    }

    handleSubmit = (event: any) => {
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
                this.handleClose();
                this.props.updateToken(data.sessionToken)
            })
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
                <Button onClick={this.handleOpen} id="RegisterButton">
                    <strong>SIGN UP</strong>
                </Button>
                <Dialog open={this.state.handleopen} onClose={this.handleClose}>
                    <DialogTitle id="dialogTitle">
                        <strong>SIGN UP</strong>
                    </DialogTitle>
                    <DialogContent id="Register">
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
                    </DialogContent>
                    <DialogActions id="Registerbtn">
                        <Button onClick={this.handleSubmit} id="btn">
                            <strong>Sign Up</strong>
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}