import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './SearchField.css'

export const SearchField = (props) => {
    const [category, setCategory] = React.useState('');

    const renderMenuItem = () => {
        return props.categories.map((item, index) => 
            <MenuItem id={index} value={item}>{item}</MenuItem>
        )
    }

    const handleChange = (event) => {
        setCategory(event.target.value)
        return props.filterCategory(event.target.value)
    }

    return (
        <div className='search-field-wrapper'>
            <FormControl className="search-field-form">
                <InputLabel>Kategória</InputLabel>
                <Select
                    value={category}
                    label="Category"
                    onChange={handleChange}
                >
                    <MenuItem value=''>Žiadna</MenuItem>
                    {renderMenuItem()}
                </Select>
            </FormControl>
        </div>
      );
};