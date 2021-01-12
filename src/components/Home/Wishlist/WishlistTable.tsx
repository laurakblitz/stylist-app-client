import React from 'react';
import {
    Button,
    Card,
    CardContent,
    Table,
} from '@material-ui/core';

type Props = {
    myWishlist: Array<{ id: number, image: string, comment: string }>,
    editUpdateWishlist: (wishlist: any) => void,
    updateOn: () => void,
    fetchWishlistPosts: () => void,
    token: string
}
export default class WishlistTable extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    deletePost = (wishlist: any) => {
        fetch(`http://localhost:3005/wishlist/delete/${wishlist.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then(() => this.props.fetchWishlistPosts())
    }

    render() {
        return (
            <div>
                {this.props.myWishlist
                    ? this.props.myWishlist.map((myWishlist) => (
                        <Card key={myWishlist.id}>
                            <CardContent><img src={myWishlist.image} width="25%" height="25%" /></CardContent>
                            <CardContent>{myWishlist.comment}</CardContent>
                            <CardContent>
                                <Button variant="outlined" onClick={() => { this.props.editUpdateWishlist(myWishlist); this.props.updateOn() }}>Edit</Button>
                                <Button variant="outlined" onClick={() => { this.deletePost(myWishlist) }}>Clear</Button>
                            </CardContent>
                        </Card>
                    ))
                    : undefined}
            </div>
        )
    }
}

//     postMapper = () => {
//         let wishlists = this.props.myWishlist;

//         return wishlists.map((wishlist: any, index: number) => {
//             return (
//                 <Card key={index}>
//                     <CardContent><img src={wishlist.image} width="25%" height="25%" /></CardContent>
//                     <CardContent>{wishlist.comment}</CardContent>
//                     <CardContent>
//                         <Button variant="outlined" onClick={() => { this.props.editUpdateWishlist(wishlist); this.props.updateOn() }}>Edit</Button>
//                         <Button variant="outlined" onClick={() => { this.deletePost(wishlist) }}>Clear</Button>
//                     </CardContent>
//                 </Card>
//             )
//         })
//     }

//     render() {
//         return (
//             <Table>
//                 {this.postMapper()}
//             </Table>
//         )
//     }
// }