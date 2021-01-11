import React from 'react';

import Login from './Login';
import Register from './Register';

type Props = {
    updateToken: (newToken: string) => void;
};

type State = {
    login: boolean;
}

export default class Auth extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            login: true,
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

    render() {

        return (
            <div className="container">
                    <Login
                        login={this.state.login}
                        toggle={this.toggle.bind(this)}
                        updateToken={this.props.updateToken}
                    />
                        <Register
                            login={this.state.login}
                            toggle={this.toggle.bind(this)}
                            updateToken={this.props.updateToken}
                        />
            </div>
        );
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
    }
}