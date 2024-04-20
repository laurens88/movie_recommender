import React, {useState} from 'react';
import Button from '@mui/material/Button';
import { darken } from '@mui/material/styles';

function PrettyButton(props) {
    const { text, width, height, fontSize, color, onClick } = props;
    const usedColor = color ? color : '#A7C7E7';

    const [isActive, setIsActive] = useState(false);

    const toggleButton = () => {
        setIsActive(!isActive);
    }

    return (
        <Button 
        variant="contained"
            color="primary"
            onClick={onClick? onClick: toggleButton}
            sx={{
                marginTop: {
                    xs: '10px',  // On extra-small devices
                    sm: '15px',  // On small devices
                    md: '20px',  // On medium devices
                    lg: '25px',  // On large devices
                    xl: '30px'   // On extra-large devices
                },
                backgroundColor: isActive? darken(usedColor, 0.4): usedColor,
                '&:hover': {
                    backgroundColor: darken(usedColor, 0.2), // Slightly darker for the hover state
                  },
                width: width ? width : 'auto',
                height: height ? height : 'auto',
                fontSize: fontSize, 
            }}
            >
            {text}
        </Button>
    );
}

export default PrettyButton;