import React from 'react';
import APIURL from '../../../helpers/environment';
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormGroup,
    Dialog,
    TextField,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

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
        fetch(`${APIURL}/wishlist/update/${this.props.updateWishlist.id}`, {
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
                <Dialog open={true} onClose={this.handleClose}>
                <DialogTitle id="CreatePopup">
                        Make a change to your wishlist!
                    </DialogTitle>
                    <DialogContent id="Create">
                    {/* <FormGroup> */}
                        <input
                            accept="image/*"
                            className="input"
                            multiple
                            type="file"
                            onChange={this.singleFileChangeHandler}/>
                            <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                        <br/>
                        <br/>
                        <TextField
                            className="modal-text-field"
                            value={this.state.editComment}
                            onChange={(e) => this.setState({ editComment: e.target.value })}
                            label="Edit Comment"/>
                            <DialogActions>
                        <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span" onClick={this.handleSubmitUpdate}>Update</Button>
                        </label>
                        </DialogActions>
                    {/* </FormGroup> */}
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}