import React from 'react';
import {
    Button,
    FormGroup,
    Dialog,
    TextField,
} from '@material-ui/core';

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
                // 'Content-Type': 'application/json',
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
                            value={this.state.editCategory}
                            onChange={(e) => this.setState({ editCategory: e.target.value })}
                            label="Edit Category"
                        />
                        <Button type="submit" onClick={this.handleSubmitUpdate}>Update</Button>
                    </FormGroup>
                </Dialog>
            </div>
        )
    }
}

{/* <DialogTitle id="EditPopup">
                        Edit Closet Post
                    <IconButton className="exit-btn" onClick={this.editClosetForm}>
                            <ClearIcon />
                        </IconButton>
                    </DialogTitle> */}