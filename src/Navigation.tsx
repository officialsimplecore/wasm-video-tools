import React, {ChangeEvent, Dispatch, useEffect, useState} from 'react';
import './Navigation.css';
import {AppBar, Toolbar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Link, useHistory} from "react-router-dom";

function Navigation() {
    
    const history = useHistory();
    
    function handleRouteNavigation(location: string): void {
        history.push(location);
    }

    return (
        <AppBar position="static">
            <Toolbar className="navigation__toolbar">
                <Typography variant="h6">
                    Core Video Transcoder
                </Typography>
                <div>
                    <Button color="inherit" onClick={() => handleRouteNavigation("gif")}>To GIF</Button>
                    <Button color="inherit" onClick={() => handleRouteNavigation("compress")}>Compress</Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Navigation;
