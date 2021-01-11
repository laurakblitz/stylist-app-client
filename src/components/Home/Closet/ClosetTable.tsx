import React from 'react';
import {
    Button,
    Card,
    CardContent,
    Table,
} from '@material-ui/core';

type Props = {
    myCloset: any,
    editUpdateCloset: (closet: any) => void,
    updateOn: () => void,
    fetchClosetPosts: () => void,
    token: string
}
export default class ClosetTable extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    deletePost = (closet: any) => {
        fetch(`http://localhost:3005/closet/delete/${closet.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(() => this.props.fetchClosetPosts())
    }

    postMapper = () => {
        let closets = this.props.myCloset;

        return closets.map((closet: any, index: number) => {
            return (
                <Card key={index}>
                    <CardContent><img src={closet.image} width="50" height="50%" /></CardContent>
                    <CardContent>{closet.category}</CardContent>
                    <CardContent>
                        <Button onClick={() => { this.props.editUpdateCloset(closet); this.props.updateOn() }}>Edit</Button>
                        <Button onClick={() => { this.deletePost(closet) }}>Clear</Button>
                    </CardContent>
                </Card>
            )
        })
    }

    render() {
        return (
            <Table>
                {this.postMapper()}
            </Table>
        )
    }
}