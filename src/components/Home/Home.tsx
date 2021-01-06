import React, {Component} from 'react';
import Navbar from '../Navbar/Navbar';

type HomeProps = {
    clickLogout: () => void;
    token: string;
}

export default class Home extends React.Component<HomeProps> {
    render() {
        return(
            <div>
                <Navbar onClick={this.props.clickLogout} token={this.props.token} />
            </div>
        )
    }
}