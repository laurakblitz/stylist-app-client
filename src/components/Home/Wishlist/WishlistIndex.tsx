import React from 'react';
import APIURL from '../../../helpers/environment';
import {
    List,
    ListItem,
} from '@material-ui/core';

import WishlistCreate from './WishlistCreate';
import WishlistEdit from './WishlistEdit';
import WishlistTable from './WishlistTable';

type Props = {
    token: string;
}

type State = {
    myWishlist: any,
    updateWishlist: any,
    updateActive: boolean,
}

export default class WishlistIndex extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            myWishlist: [],
            updateWishlist: {},
            updateActive: false,
        }
    }

    fetchWishlistPosts = () => {
        fetch(`${APIURL}/wishlist/allwishlist`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res) => res.json())
            .then(wishlistData => {
                this.setState({
                    myWishlist: wishlistData.wishlists
                })
                console.log('Wishlist Posts:', this.state.myWishlist)
            })
    }

    componentDidMount() {
        this.fetchWishlistPosts()
    }

    editUpdateWishlist = (wishlist: any) => {
        this.setState({
            updateWishlist: wishlist
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

    render() {
        return (
            <List>
                <ListItem>
                    <WishlistCreate
                        fetchWishlistPosts={this.fetchWishlistPosts.bind(this)}
                        token={this.props.token} />
                </ListItem>
                <ListItem>
                    <WishlistTable
                        myWishlist={this.state.myWishlist}
                        editUpdateWishlist={this.editUpdateWishlist.bind(this)}
                        updateOn={this.updateOn.bind(this)}
                        fetchWishlistPosts={this.fetchWishlistPosts.bind(this)}
                        token={this.props.token} />
                </ListItem>
                <ListItem>
                    {this.state.updateActive ?
                        <WishlistEdit
                            updateWishlist={this.state.updateWishlist}
                            updateOff={this.updateOff.bind(this)}
                            fetchWishlistPosts={this.fetchWishlistPosts.bind(this)}
                            token={this.props.token}
                        /> : <></>}
                </ListItem>
            </List>
        )
    }
}