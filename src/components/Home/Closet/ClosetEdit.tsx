import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormGroup,
    FormLabel,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

type Props = {
    updateCloset: any,
    updateOff: () => void,
    token: string,
    fetchClosetPosts: () => void
}

type State = {
    image: string,
    editCategory: string,
    handleopen: boolean
}

export default class ClosetEdit extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            image: '',
            editCategory: this.props.updateCloset.category,
            handleopen: false,
        }
    }

    handleSubmitUpdate = (event: any) => {
        const editCloset = new FormData()
        editCloset.append('image', this.state.image)
        editCloset.append('category', this.state.editCategory)
        fetch(`http://localhost:3005/closet/update/${this.props.updateCloset.id}`, {
            method: 'PUT',
            body: editCloset,
            headers: new Headers({
                'Authorization': this.props.token
            })
        }).then(() => {
            this.props.updateOff();
            this.props.fetchClosetPosts();
        })
    }

    editClosetForm = () => {
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
                        Update your closet!
                    </DialogTitle>
                    <DialogContent id="Create">
                        <input
                            accept="image/*"
                            className="input"
                            type="file"
                            onChange={this.singleFileChangeHandler} />
                            <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                        <br />
                        <br />
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Category</FormLabel>
                            <RadioGroup defaultValue="Category" aria-label="Category" name="customized-radios" onChange={(e) => this.setState({ editCategory: e.target.value })}>
                                <FormControlLabel value="Shirt" control={<Radio />} label="Shirt" />
                                <FormControlLabel value="Pants" control={<Radio />} label="Pants" />
                                <FormControlLabel value="Dress" control={<Radio />} label="Dress" />
                                <FormControlLabel value="Outerwear" control={<Radio />} label="Outerwear" />
                            </RadioGroup>
                        </FormControl>
                        <DialogActions>
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span" onClick={this.handleSubmitUpdate}>Update</Button>
                        </label>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

// 'Content-Type': 'application/json',

{/* <TextField
className="modal-text-field"
value={this.state.editCategory}
onChange={(e) => this.setState({ editCategory: e.target.value })}
label="Edit Category"/> */}