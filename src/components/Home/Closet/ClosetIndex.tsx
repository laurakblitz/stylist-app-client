import React from 'react';
import {
    Button,
    List,
    ListItem,
} from '@material-ui/core';

import ClosetCreate from './ClosetCreate';
import ClosetEdit from './ClosetEdit';
import ClosetTable from './ClosetTable';

type Props = {
    token: string;
}

type State = {
    myCloset: any,
    // myCloset: Array<{ image: string, category: string, userId: number }>
    updateCloset: any,
    closetCreate: any,
    updateActive: boolean,
    createActive: boolean,
}

export default class ClosetIndex extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            myCloset: [],
            updateCloset: {},
            closetCreate: {},
            updateActive: false,
            createActive: false,
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
            .then((res) => res.json())
            .then(closetData => {
                this.setState({
                    myCloset: closetData.closets
                })
                console.log('Closet Posts:', this.state.myCloset)
            })
    }

    componentDidMount() {
        this.fetchClosetPosts()
    }

    editUpdateCloset = (closet: any) => {
        this.setState({
            updateCloset: closet
        })
    }

    updateOn = () => {
        this.setState({
            updateActive: true
        })
    }

    updateOff = () => {
        this.setState({
            updateActive: false
        })
    }

    createOff = () => {
        this.setState({
            createActive: false
        })
    }

    createOn = () => {
        this.setState({
            createActive: true
        })
    }

    render() {
        return (
            <List>
                <ListItem>
                    <Button className="primary-btn" onClick={() => this.createOn()}>Add a Closet Post</Button>
                </ListItem>
                <ListItem>
                    {this.state.createActive ?
                        <ClosetCreate
                            closetCreate={this.state.closetCreate}
                            fetchClosetPosts={this.fetchClosetPosts.bind(this)}
                            token={this.props.token}
                            createOff={this.createOff.bind(this)}
                        /> : <></>}
                    <ClosetTable
                        myCloset={this.state.myCloset}
                        editUpdateCloset={this.editUpdateCloset.bind(this)}
                        updateOn={this.updateOn.bind(this)}
                        fetchClosetPosts={this.fetchClosetPosts.bind(this)}
                        token={this.props.token} />
                </ListItem>
                {this.state.updateActive ?
                    <ClosetEdit
                        updateCloset={this.state.updateCloset}
                        updateOff={this.updateOff.bind(this)}
                        fetchClosetPosts={this.fetchClosetPosts.bind(this)}
                        token={this.props.token}
                    /> : <></>}
            </List>
        )
    }
}