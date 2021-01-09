import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import ClosetCreate from './ClosetCreate';

type Props = {
    updateToken: (newToken: string) => void,
    clearToken: () => void,
    token: string
}

type State = {
    myCloset: Array<{ image: string, category: string }>
    // closetCreate: Array<{image: string, category: string}>,
}

export default class ClosetIndex extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            myCloset: [],
            // closetCreate: [],
        }
    }

    fetchClosetPosts = () => {
        fetch('http://localhost:3005/closet/allclosetposts', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    myCloset: data.closet
                })
                console.log(this.state.myCloset)
            })
    }

    componentDidMount() {
        this.fetchClosetPosts()
    }

    render() {
        return (
            <div>
                <Router>
                    <ClosetCreate token={this.props.token} />
                </Router>
            </div>
        )
    }
}