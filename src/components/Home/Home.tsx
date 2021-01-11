import React from 'react';
import { BrowserRouter as Router, /*Route, Switch*/ } from 'react-router-dom';

import Navbar from './Navbar';
import ClosetIndex from './Closet/ClosetIndex';

type Props = {
    clickLogout: () => void;
    token: string;
}

export default class Home extends React.Component<Props> {
    render() {
        return (
            <div className="container">
            <React.Fragment>
                <Router>
                        <Navbar onClick={this.props.clickLogout} token={this.props.token} />
                        <ClosetIndex token={this.props.token} />
                </Router>
            </React.Fragment>
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