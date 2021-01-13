import React from 'react';
import APIURL from '../../../helpers/environment';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormLabel,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

type Props = {
    fetchClosetPosts: () => void;
    token: string;
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
        const closetData = new FormData();
        closetData.append('image', this.state.image)
        closetData.append('category', this.state.category)
        fetch(`${APIURL}/closet/upload`, {
            method: 'POST',
            body: closetData,
            headers: new Headers({
                'Authorization': this.props.token,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    category: ''
                })
                console.log(data)
                this.handleClose();
                this.props.fetchClosetPosts();
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
                <Button onClick={this.handleOpen} id="CreateButton" variant="outlined">Add to your digital closet</Button>
                <Dialog open={this.state.handleopen} onClose={this.handleClose}>
                    <DialogTitle id="CreatePopup">
                        Add to closet!
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
                        <br />
                        <br />
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Category</FormLabel>
                            <RadioGroup defaultValue="Category" aria-label="Category" name="customized-radios" onChange={(e) => this.setCategory(e.target.value)}>
                                <FormControlLabel value="Shirt" control={<Radio />} label="Shirt" />
                                <FormControlLabel value="Pants" control={<Radio />} label="Pants" />
                                <FormControlLabel value="Dress" control={<Radio />} label="Dress" />
                                <FormControlLabel value="Outerwear" control={<Radio />} label="Outerwear" />
                            </RadioGroup>
                        </FormControl>
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