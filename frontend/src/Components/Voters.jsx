import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable() {
    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5001/admin/fetch', {
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

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: 'black' }}>
                    <TableRow>
                        <TableCell style={{ color: 'white' }}>Voter ID</TableCell>
                        <TableCell style={{ color: 'white' }}>Name</TableCell>
                        <TableCell align="right" style={{ color: 'white' }}>CNIC</TableCell>
                        <TableCell align="right" style={{ color: 'white' }}>Voted For</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.userID} // Assuming each row has a unique 'id' field
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.userID}
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell align="right">{row.CNIC}</TableCell>
                            <TableCell align="right">{row.votedFor}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
