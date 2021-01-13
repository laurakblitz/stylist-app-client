import React from 'react';
import APIURL from '../../../helpers/environment';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

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
        fetch(`${APIURL}/wishlist/upload`, {
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
                        Add wishlist item!
                    </DialogTitle>
                    <DialogContent id="Create">
                        <label htmlFor="icon-button-file">
                            <input
                                accept="image/*"
                                className="input"
                                id="contained-button-file"
                                type="file"
                                onChange={this.singleFileChangeHandler} />
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                        <TextField
                            margin="dense"
                            label="Comment"
                            type="text"
                            fullWidth
                            onChange={(e) => this.setComment(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions id="Createbtn">
                        <label htmlFor="contained-button-file">
                            <Button onClick={this.handleSubmit} variant="contained" color="primary" component="span">Upload</Button>
                        </label>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}