import React from 'react';
import Button from '@mui/material/Button';

function PrettyButton(props) {
    return (
        <Button 
        variant="contained"
            color="primary"
            onClick={props.onClick}
            sx={{
                width: props.width,
                height: props.height,
                fontSize: props.fontSize, 
            }}
            >
            {props.text}
        </Button>
    );
}

export default PrettyButton;