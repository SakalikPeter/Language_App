import React from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';

export const NextItem = (props) => {

    const handleClick = () => {
        if (props.index < props.maxIndex - 1) {
            props.setIndex(props.index + 1)
        }
        else {
            props.setIndex(props.index)
        }
    }

    return (
        <IconButton
          className='base-button-1'
          disabled={props.isLoading}
          onClick={handleClick}
          color='primary'
          size='large'>
          <ArrowForwardIosIcon />
        </IconButton>
    );
};