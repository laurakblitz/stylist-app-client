import React from 'react';
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Typography
} from '@material-ui/core';

type Props = {
    token: string,
}

type State = {
    image: string,
    category: string,
    handleopen: boolean,
}

export default class ClosetCreate extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            image: '',
            category: '',
            handleopen: false,
        }
    }

    handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        // const upload = document.getElementById('upload')
        const closetData = new FormData();
        // closetData.append('image', upload.files[0])
        closetData.append('image', this.state.image)
        closetData.append('category', this.state.category)
        fetch('http://localhost:3005/closet/upload', {
            method: 'POST',
            body: closetData,
            headers: new Headers({
                // 'Content-Type': 'application/json',
                'Authorization': this.props.token,
            }),
        })
            .then((res) => res.json())
            .then(data => {
                this.setState({
                    // image: '',
                    category: ''
                })
                console.log(data)
                this.handleClose();
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

    setCategory(event: string) {
        this.setState({
            category: (event)
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
                <Button onClick={this.handleOpen} id="CreateButton" variant="outlined">Create a Closet Post</Button>
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
                        {/* <TextField
                            margin="dense"
                            label="Image"
                            type="text"
                            fullWidth
                            onChange={(e) => this.setFile(e.target.value)}
                        /> */}
                        <TextField
                            margin="dense"
                            label="Category"
                            type="text"
                            fullWidth
                            onChange={(e) => this.setCategory(e.target.value)}
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