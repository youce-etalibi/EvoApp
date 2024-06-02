import React from 'react'
import './Paginate.css'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export default function Paginate({ currentPage, totalPages, handlePageChange }) {
  
    const handleChange = (event, page) => {
        handlePageChange(event, page);
      };
    
    return (
        <div className="paginationstore">
           <Stack spacing={2}>
      <Pagination
        count={totalPages}
        variant="outlined"
        color="primary"
        page={currentPage}
        onChange={handleChange} 
      />
    </Stack>
        </div>
    );
}
