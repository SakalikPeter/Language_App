import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';

export const PreviousItem = (props) => {

    const handleClick = () => {
        if (props.index > 0) {
            props.setIndex(props.index - 1)
        }
        else {
            props.setIndex(0)
        }
    }

    return (
        <IconButton
            className='base-button-1'
            disabled={props.isLoading}
            onClick={handleClick}
            color='primary'
            size='large'>
            <ArrowBackIosIcon />
        </IconButton>
    );
};