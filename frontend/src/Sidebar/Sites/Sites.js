import "./Sites.css";
import { useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function Sites({ handleChange }) {
  const [value, setValue] = useState('');

  const handleChange1 = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="sites_container">
      <h2 className="sidebar-title">Sites</h2>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          className="siteinputradio"
          onChange={(e) => {
            handleChange1(e);
            handleChange(e);
          }}
        > 
          <FormControlLabel value="" className="siteinput" control={<Radio className="siteinput"/>} label="All" />
          <FormControlLabel value="flipkart" control={<Radio />} label="Flipkart" className="siteinput"/>
          <FormControlLabel value="amazon" control={<Radio />} label="Amazon" className="siteinput"/>
          <FormControlLabel value="indiamart" control={<Radio />} label="Indiamart" className="siteinput"/>
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default Sites;
