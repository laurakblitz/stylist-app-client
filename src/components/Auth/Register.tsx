import React from 'react';
import APIURL from '../../helpers/environment';
import {
    Button, 
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@material-ui/core';

type Props = {
    login: boolean,
    updateToken: (newToken: string) => void,
    toggle: () => void
}

type State = {
    username: string,
    email: string,
    password: string,
    // role: string,
    handleopen: boolean,
}

export default class Register extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            // role: '',
            handleopen: false,
        }
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        fetch(`${APIURL}/user/register`, {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                // role: this.state.role,
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        })
            .then((res) => res.json())
            .then(data => {
                console.log(data)
                this.handleClose();
                this.props.updateToken(data.token)
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

    // setRole(event: string) {
    //     this.setState({
    //         role: (event),
    //     })
    // }

    render() {
        return (
            <div>
                <Button onClick={this.handleOpen} id="RegisterButton" variant="outlined">
                    <strong>Sign Up</strong>
                </Button>
                <Dialog open={this.state.handleopen} onClose={this.handleClose}>
                    <DialogTitle id="dialogTitle">
                        <strong>Sign Up</strong>
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
                        {/* <TextField
                            placeholder="User/Admin"
                            onChange={(e) => this.setState({role: e.target.value})}
                        /> */}
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