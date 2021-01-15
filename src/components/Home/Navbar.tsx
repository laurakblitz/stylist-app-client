import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    ButtonGroup,
    Button,
    IconButton
} from '@material-ui/core';

import Register from '../Auth/Register';
import Login from '../Auth/Login';

type Props = {
    onClick: () => void;
    token: string;
};

export default class Navbar extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    handleOpenReg = () => {
        this.setState({
            register: true,
        });
    };

    handleOpenLog = () => {
        this.setState({
            login: true,
        });
    };

    HandleCloseReg = () => {
        this.setState({
            register: false,
        });
    };

    handleCloseLog = () => {
        this.setState({
            login: false,
        });
    };

    render() {
        return (
            <AppBar position="static">
                <Typography className="root" variant="h5">StyList</Typography>
                <Toolbar className="root">
                    <ButtonGroup>
                    <Button variant="outlined" color="inherit"><a href='/closet/allcloset' style={{ color: 'white', textDecoration: 'none' }}>Closet</a></Button>
                        <Button variant="outlined" color="inherit"><a href='/wishlist/allwishlist' style={{ color: 'white', textDecoration: 'none' }}>Wishlist</a></Button>
                        <Button variant="outlined" color="inherit"><a href='/users' style={{ color: 'white', textDecoration: 'none' }}>See Who Else is Using StyList</a></Button>
                        <Button variant="outlined" color="inherit" onClick={this.props.onClick}>Logout</Button>
                    </ButtonGroup>
                </Toolbar>
            </AppBar>
        );
    }
}


// import React from 'react';
// import {
//     AppBar,
//     Toolbar,
//     Typography,
//     ButtonGroup,
//     Button
// } from '@material-ui/core';

// import Login from '../Auth/Login';
// import Register from '../Auth/Register';

// type Props = {
//     // onClick: () => void;
//     token: string;
//     clickLogout: () => void;
//     updateToken: (newToken: string) => void;
// };

// type State = {
//     register: boolean,
//     login: boolean
// }

// export default class Navbar extends React.Component<Props, State> {
//     constructor(props: Props) {
//         super(props);
//         this.state = {
//             register: false,
//             login: false,
//         }
//     }

//     handleOpenReg = () => {
//         this.setState({
//             register: true,
//         });
//     };

//     handleOpenLog = () => {
//         this.setState({
//             login: true,
//         });
//     };

//     HandleCloseReg = () => {
//         this.setState({
//             register: false,
//         });
//     };

//     handleCloseLog = () => {
//         this.setState({
//             login: false,
//         });
//     };

//     render() {
//         return (
//             <div className="container">
//                 <AppBar position="static">
//                     <Toolbar className="root">
//                         <ButtonGroup>
//                             {!this.props.token && (
//                                 <Register
//                                     updateToken={this.props.updateToken}
//                                 />
//                             )}
//                             {this.props.token ? (
//                                 <Button id="LogoutBtn" onClick={this.props.clickLogout}>
//                                     LOGOUT
//                                 </Button>
//                             ) : (
//                                     <Login
//                                         updateToken={this.props.updateToken} />
//                                 )}
//                         </ButtonGroup>
//                     </Toolbar>
//                 </AppBar>
//                 <Typography className="root" variant="h5" noWrap>StyList</Typography>
//             </div>
//         );
//     }
// }