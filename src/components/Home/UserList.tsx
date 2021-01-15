import React from 'react';
import APIURL from '../../helpers/environment';
import {
    List,
    ListItem,
} from '@material-ui/core';

type User = {
    id: string;
    username: string;
}

type Props = {
    token: string;
}

type State = {
    usernames: User[];
}

export default class UserList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            usernames: []
        }
    }

    fetchUsernames = () => {
        fetch(`${APIURL}/user/usernames`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res) => res.json())
            .then(data => {
                this.setState({
                    usernames: data.usernames
                })
                console.group('Usernames:', this.state.usernames)
            })
    }

    componentDidMount = () => {
        this.fetchUsernames()
    }

    render() {
        return (
            <List>
                {this.state.usernames.map(({ id, username }) => <ListItem key={id}>{username}</ListItem>)}
            </List>
        )
    }
}