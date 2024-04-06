import React from 'react';
import Button from '@mui/material/Button';
import { darken } from '@mui/material/styles';

function PrettyButton(props) {
    return (
        <Button 
        variant="contained"
            color="primary"
            onClick={props.onClick}
            sx={{
                backgroundColor: props.color,
                '&:hover': {
                    backgroundColor: darken(props.color, 0.2), // Slightly darker for the hover state
                  },
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