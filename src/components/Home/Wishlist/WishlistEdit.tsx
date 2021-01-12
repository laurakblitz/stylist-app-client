import React from 'react';
import {
    Button,
    FormGroup,
    Dialog,
    TextField,
} from '@material-ui/core';

type Props = {
    updateWishlist: any,
    updateOff: () => void,
    token: string,
    fetchWishlistPosts: () => void
}

type State = {
    image: string,
    editComment: string,
    handleopen: boolean
}

export default class WishlistEdit extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            image: '',
            editComment: this.props.updateWishlist.category,
            handleopen: false,
        }
    }

    handleSubmitUpdate = (event: any) => {
        const editWishlist = new FormData()
        editWishlist.append('image', this.state.image)
        editWishlist.append('comment', this.state.editComment)
        fetch(`http://localhost:3005/wishlist/update/${this.props.updateWishlist.id}`, {
            method: 'PUT',
            body: editWishlist,
            headers: new Headers({
                'Authorization': this.props.token
            })
        }).then(() => {
            this.props.updateOff();
            this.props.fetchWishlistPosts();
        })
    }

    editWishlistForm = () => {
        this.props.updateOff();
    }

    handleOpen = () => {
        this.setState({
            handleopen: true,
        });
    };

    handleClose = () => {
        this.setState({
            handleopen: false,
        });
    };

    singleFileChangeHandler = (event: any) => {
        this.setState({
            image: event.target.files[0]
        });
    }

    render() {
        return (
            <div className="container">
                <Dialog open={true}>
                    <FormGroup>
                        <input
                            accept="image/*"
                            className="input"
                            multiple
                            type="file"
                            onChange={this.singleFileChangeHandler}
                        />
                        <TextField
                            className="modal-text-field"
                            value={this.state.editComment}
                            onChange={(e) => this.setState({ editComment: e.target.value })}
                            label="Edit Comment"
                        />
                        <Button type="submit" onClick={this.handleSubmitUpdate}>Update</Button>
                    </FormGroup>
                </Dialog>
            </div>
        )
    }
}