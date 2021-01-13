import React from 'react';
import APIURL from '../../../helpers/environment';
import {
    Button,
    Card,
    CardContent,
    Table,
} from '@material-ui/core';
import { render } from '@testing-library/react';

type Props = {
    // myCloset: any,
    myCloset: Array<{ id: number, image: string, category: number }>
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
        fetch(`${APIURL}/closet/delete/${closet.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(() => this.props.fetchClosetPosts())
    }

    render() {
        return (
            <div>
                {this.props.myCloset
                    ? this.props.myCloset.map((myCloset) => (
                        <Card key={myCloset.id}>
                            <CardContent><img src={myCloset.image} width="25%" height="25%" /></CardContent>
                            <CardContent>{myCloset.category}</CardContent>
                            <CardContent>
                                <Button variant="outlined" onClick={() => { this.props.editUpdateCloset(myCloset); this.props.updateOn() }}>Edit</Button>
                                <Button variant="outlined" onClick={() => { this.deletePost(myCloset) }}>Clear</Button>
                            </CardContent>
                        </Card>
                    ))
                    : undefined}
            </div>
        )
    }
}

    // postMapper = () => {
    //     let closets = this.props.myCloset;

    //     return closets.map((closet: any, index: number) => {
    //         return (
    //             <Card key={index}>
    //                 <CardContent><img src={closet.image} width="25%" height="25%" /></CardContent>
    //                 <CardContent>{closet.category}</CardContent>
    //                 <CardContent>
    //                     <Button variant="outlined" onClick={() => { this.props.editUpdateCloset(closet); this.props.updateOn() }}>Edit</Button>
    //                     <Button variant="outlined" onClick={() => { this.deletePost(closet) }}>Clear</Button>
    //                 </CardContent>
    //             </Card>
    //         )
    //     })
    // }

    // render() {
    //     return (
    //         <Table>
    //             {this.postMapper()}
    //         </Table>
    //     )
    // }

