import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Navbar from './Navbar';
import UserList from './UserList';
import ClosetIndex from './Closet/ClosetIndex';
import WishlistIndex from './Wishlist/WishlistIndex';

type Props = {
    clickLogout: () => void;
    token: string;
}

export default class Home extends React.Component<Props> {

    render() {
        return (
            <div className="container">
                <Navbar onClick={this.props.clickLogout} token={this.props.token} />
                <Router>
                {/* <ClosetIndex token={this.props.token} /> */}
                    <Switch>
                        <Route exact path="/closet/allcloset">
                            <ClosetIndex token={this.props.token} />
                        </Route>
                        <Route exact path="/wishlist/allwishlist">
                            <WishlistIndex token={this.props.token} />
                        </Route>
                        <Route exact path="/users">
                        <UserList token={this.props.token} />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

// import React from 'react';
// import { BrowserRouter as Router, /*Route, Switch*/ } from 'react-router-dom';

// // import Navbar from './Navbar';
// import ClosetIndex from './Closet/ClosetIndex';

// type Props = {
//     // clickLogout: () => void;
//     // updateToken: (newToken: string) => void;
//     // clearToken: () => void;
//     token: string;
// }

// export default class Home extends React.Component<Props> {
//     render() {
//         return (
//             <React.Fragment>
//                 <Router>
//                     <div className="container">
//                         {/* <Navbar clickLogout={this.props.clearToken} updateToken={this.props.updateToken} token={this.props.token} /> */}
//                         <ClosetIndex /*clearToken={this.props.clearToken} updateToken={this.props.updateToken}*/ token={this.props.token} />
//                     </div>
//                 </Router>
//             </React.Fragment>
//         );
//     }
// }