import React, { useEffect, useState } from 'react';
import { fetchData } from '../api';
import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Grid, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function TopEmployees() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentScore, setCurrentScore] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result);
        const { top_employees } = result.data;
        setEmployees(top_employees)

        const currentScore = top_employees.map(employee => employee.current_score);
        const email = top_employees.map(employee => employee.email);
        const name = top_employees.map(employee => employee.name);
        const title = top_employees.map(employee => employee.title);

        setCurrentScore(currentScore);
        setEmail(email);
        setName(name);
        setTitle(title);

      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Grid>
        <TableContainer component={Paper}>
        <Grid bgcolor={"#5C83BF"} padding={"10px"} color={"white"}>
            <Typography fontWeight={700} fontSize={"24px"}>Top Employees</Typography>
          </Grid>
            <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell  sx={{fontSize:"18px"}}>Name</TableCell>
                    <TableCell  sx={{fontSize:"18px"}} align='center'>Score <FontAwesomeIcon icon={faStar} color='#02B2AF'/></TableCell>
                    <TableCell sx={{fontSize:"18px"}} align='center'>Title</TableCell>
                    <TableCell sx={{fontSize:"18px"}} align='center'>Email</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {employees.map((employee) => (
                    <TableRow
                    key={employee.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {employee.name}
                    </TableCell>
                    <TableCell align='center'>{employee.current_score}</TableCell>
                    <TableCell align='center'>{employee.title}</TableCell>
                    <TableCell align='center'>{employee.email}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Grid>
  );
}

export default TopEmployees;
