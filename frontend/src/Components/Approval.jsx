import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function BasicTable() {
    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5001/admin/fetch-all', {
                    method: 'GET',
                    headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setRows(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleApprove = async (row) => {
        try {
            const response = await fetch('http://localhost:5001/admin/approval', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                },
                body: JSON.stringify({ userID: row.userID })
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to approve');
            }
            // Remove the approved row from the rows state
            setRows(prevRows => prevRows.filter(prevRow => prevRow.userID !== row.userID));
        } catch (error) {
            console.error('Error approving:', error);
        }
    };


    // Filter out rows where 'approved' is true
    const filteredRows = rows.filter(row => !row.approved);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: 'black' }}>
                    <TableRow>
                        <TableCell style={{ color: 'white' }}>Voter ID</TableCell>
                        <TableCell style={{ color: 'white' }}>Name</TableCell>
                        <TableCell align="right" style={{ color: 'white' }}>CNIC</TableCell>
                        <TableCell align="right" style={{ color: 'white' }}>Approved</TableCell>
                        <TableCell align="right" style={{ color: 'white' }}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredRows.map((row) => (
                        <TableRow
                            key={row.userID} // Assuming each row has a unique 'id' field
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.userID}
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="right">{row.CNIC}</TableCell>
                            <TableCell align="right">{row.approved ? 'Yes' : 'No'}</TableCell>
                            <TableCell align="right">
                                <Button variant='outlined' onClick={() => handleApprove(row)}>Approve</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
