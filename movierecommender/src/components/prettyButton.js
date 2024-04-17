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
                marginTop: {
                    xs: '10px',  // On extra-small devices
                    sm: '15px',  // On small devices
                    md: '20px',  // On medium devices
                    lg: '25px',  // On large devices
                    xl: '30px'   // On extra-large devices
                },
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