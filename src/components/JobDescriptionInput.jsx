import React from 'react';
import { TextField } from '@mui/material';

const JobDescriptionInput = ({ value, onChange }) => {
  return (
    <TextField
      fullWidth
      multiline
      rows={4}
      label="Job Description"
      placeholder="Paste the job description here..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      sx={{
        marginTop: 2,
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
        }
      }}
    />
  );
};

export default JobDescriptionInput;