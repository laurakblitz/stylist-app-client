import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Modal,
} from '@material-ui/core';

import Login from './Login';
import Register from './Register';

type User =  {
    token: string;
    user: {
        username: string;
        id: string;
    }
}

type Props = {
    updateToken: (newToken: string) => void;
    // updateUser: (newUser: User) => void, 
};

type State = {
    login: boolean;
    handleopen: boolean;
}

export default class Auth extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            login: true,
            handleopen: false,
        };
    }

    // loginHandle() {
    //     this.setState({
    //         login: !this.state.login,
    //     });
    // }

    toggle = () => {
        this.setState({
            login: !this.state.login
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

    render() {
        return (
            <div className="container">
                <Dialog open={true}>
                    <DialogTitle id="form-dialog-title">
                        <strong>StyList</strong>
                    </DialogTitle>
                    <DialogContent>
                        <DialogTitle>
                            <Login
                                login={this.state.login}
                                toggle={this.toggle.bind(this)}
                                updateToken={this.props.updateToken}/>
                        </DialogTitle>
                    </DialogContent>
                    <DialogContent>
                        <DialogTitle>
                            <Register
                                login={this.state.login}
                                toggle={this.toggle.bind(this)}
                                updateToken={this.props.updateToken} />
                        </DialogTitle>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

        // return (
        //     <div className="container">
        //         {this.state.login === true ? (
        //             <Login
        //                 login={this.state.login}
        //                 toggle={this.toggle.bind(this)}
        //                 updateToken={this.props.updateToken}
        //             />
        //         ) : (
        //                 <Register
        //                     login={this.state.login}
        //                     toggle={this.toggle.bind(this)}
        //                     updateToken={this.props.updateToken}
        //                 />
        //             )}
        //     </div>
        // );
