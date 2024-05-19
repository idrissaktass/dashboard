import React, { useEffect, useState } from 'react';
import { fetchData } from '../api';
import { Typography, Grid, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function TeamCard({ team }) {
    const sortedEmployees = [...team.employees].sort((a, b) => b.current_score - a.current_score);
  
    return (
      <Grid container gap={2} justifyContent="center" padding={"30px"} bgcolor={'white'} boxShadow={"0px 5px 10px #EFE5DE"} border={"2px solid #5C83BF"}>
        <Grid item xs={12}>
          <Typography variant="h5">{team.title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{team.description}</Typography>
        </Grid>
        <Grid item xs={12} mt={2}>
          <TableContainer component={Paper}>
            <Table aria-label="team-details">
              <TableHead>
                <TableRow>
                  <TableCell sx={{fontSize:"18px"}}>Name</TableCell>
                  <TableCell sx={{fontSize:"18px"}}>Email</TableCell>
                  <TableCell sx={{fontSize:"18px"}}>Title</TableCell>
                  <TableCell sx={{fontSize:"18px"}}>Score <FontAwesomeIcon icon={faStar} color='#02B2AF'/></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedEmployees.map((employee) => (
                  <TableRow key={employee.name}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.title}</TableCell>
                    <TableCell>{employee.current_score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
  }
  

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        const { teams } = result.data;
        setTeams(teams);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []);

  return (
    <Carousel animation="slide" indicators={true}>
      {teams.map((team, index) => (
        <TeamCard key={index} team={team} />
      ))}
    </Carousel>
  );
}

export default Teams;
