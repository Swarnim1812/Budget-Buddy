import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./Price.css";
const Price = ({ handleChange }) => {
  const [cur, setCur] = React.useState('');

  const handleChange1 = (event) => {
    setCur(event.target.value);
  };
  return (
    <>
      <div className="ml">
        <h2 className="price-title">Price</h2>
        <FormControl variant="filled" sx={{ m: 2, minWidth: 170 }}>
          <InputLabel id="demo-simple-select-filled-label">Sort</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={cur}
            onChange={(e) =>{
              handleChange1(e);
              handleChange(e);
              }}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="LtoH">Low to high</MenuItem>
            <MenuItem value="HtoL">High to low</MenuItem>
          </Select>
        </FormControl>
      </div>
    </>
  );
};

export default Price;
