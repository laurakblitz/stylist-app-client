import React from 'react';
import './App.css';

import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

type Props = {
    token: string | null
}

export default class App extends React.Component<{}, Props> {
    constructor(props: Props) {
        super(props);
        this.state = {
            token: ''
        }
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.setState({
                token: localStorage.getItem('token')
            })
        }
    }

    updateToken = (newToken: string) => {
        localStorage.setItem('token', newToken);
        this.setState({
            token: newToken
        });
    }

    logout = () => {
        localStorage.clear();
        this.setState({
            token: ''
        })
    }

    viewConductor = () => {
        return !this.state.token ? (
            <div>
                <Auth updateToken={this.updateToken.bind(this)} />
            </div>
        ) : (
                <Home clickLogout={this.logout.bind(this)} token={this.state.token} />)
    };


    render() {
        return (
            <div>
                {this.viewConductor()}
            </div>
        );
    }
}

// import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import './App.css';

// import Home from './components/Home/Home';
// import Navbar from './components/Home/Navbar';

// export default class App extends React.Component {
//     state = {
//         sessionToken: ''
//     }

//     // export default class App extends React.Component {
//     //     constructor(props: any) {
//     //         super(props);
//     //         this.state = {
//     //             token: ''
//     //         }
//     //     }

//     componentDidMount() {
//         if (localStorage.getItem('token')) {
//             this.setState({
//                 sessionToken: localStorage.getItem('token')
//             })
//         }
//     }

//     updateToken = (newToken: string) => {
//         localStorage.setItem('token', newToken);
//         this.setState({
//             sessionToken: newToken
//         });
//     }

//     clearToken = () => {
//         localStorage.clear();
//         this.setState({
//             sessionToken: ''
//         })
//     }

//     // protectedViews = () => {
//     //     return (this.state.sessionToken === localStorage.getItem('token') ?
//     //         <div className="App">
//     //             <Router>
//     //                 <Home token={this.state.sessionToken} />
//     //             </Router>
//     //         </div>
//     //         : <Navbar updateToken={this.updateToken.bind(this)} />)
//     // }

//     render() {
//         return (
//             <div>
//                 {/* {this.protectedViews()} */}
//                 <header className="app-header">
//                     <Router>
//                         <Navbar clickLogout={this.clearToken.bind(this)} updateToken={this.updateToken.bind(this)} token={this.state.sessionToken} />
//                         <Home /*clearToken={this.clearToken.bind(this)} updateToken={this.updateToken.bind(this)}*/ token={this.state.sessionToken} />
//                     </Router>
//                 </header>
//             </div>
//         );
//     }
// }