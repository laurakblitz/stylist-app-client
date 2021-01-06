import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, ButtonGroup, Button } from '@material-ui/core';

type NavProps = {
    onClick: () => void;
    token: string
};

export default class Navbar extends React.Component<NavProps> {
    constructor(props: NavProps) {
        super(props);
    }

    render() {
        return (
            <div className="appbarRoot">
                <AppBar position="static">
                    <Toolbar className="root">
                        <Typography className="root" variant="h5" noWrap>
                            StyList
                    </Typography>
                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                            <Button className="sign-up" onClick={this.props.onClick}>Sign Up</Button>
                            <Button className="login" onClick={this.props.onClick}>Login</Button>
                        </ButtonGroup>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}