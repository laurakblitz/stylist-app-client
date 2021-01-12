import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@material-ui/core';

type Props = {
    fetchWishlistPosts: () => void;
    token: string;
}

type State = {
    image: string,
    comment: string,
    handleopen: boolean,
}

export default class WishlistCreate extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            image: '',
            comment: '',
            handleopen: false,
        }
    }

    handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const wishlistData = new FormData();
        wishlistData.append('image', this.state.image)
        wishlistData.append('comment', this.state.comment)
        fetch('http://localhost:3005/wishlist/upload', {
            method: 'POST',
            body: wishlistData,
            headers: new Headers({
                'Authorization': this.props.token,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    comment: ''
                })
                console.log(data)
                this.handleClose();
                this.props.fetchWishlistPosts();
            });
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

    setFile(event: string) {
        this.setState({
            image: (event)
        })
    }

    setComment(event: string) {
        this.setState({
            comment: (event)
        })
    }

    singleFileChangeHandler = (event: any) => {
        this.setState({
            image: event.target.files[0]
        });
    }

    render() {
        return (
            <div className="container">
                <Button onClick={this.handleOpen} id="CreateButton" variant="outlined">Add to your wishlist</Button>
                <Dialog open={this.state.handleopen} onClose={this.handleClose}>
                    <DialogTitle id="CreatePopup">
                        Create Post
                    </DialogTitle>
                    <DialogContent id="Create">
                        <input
                            accept="image/*"
                            className="input"
                            multiple
                            type="file"
                            onChange={this.singleFileChangeHandler} />
                        <TextField
                            margin="dense"
                            label="Comment"
                            type="text"
                            fullWidth
                            onChange={(e) => this.setComment(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions id="Createbtn">
                        <Button onClick={this.handleSubmit} id="btn">Submit</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}