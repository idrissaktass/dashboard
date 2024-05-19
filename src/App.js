import React, { useEffect, useState } from 'react';
import { fetchData } from './api';
import Activities from './components/Activities';
import { Box, Grid, Typography } from '@mui/material';
import TopEmployees from './components/TopEmployees';
import Teams from './components/Teams';
import InProgressCourses from './components/inProgressCourses';
import DevelopingSkills from './components/DevelopingSkills';
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCheck, faUser, faSquareCheck } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [averageScore, setAverageScore] = useState("");
  const [completedCourses, setCompletedCourses] = useState("");
  const [totalEmployees, setTotalEmployees] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result);
        const { average_employee_score } = result.data;
        const { total_completed_courses } = result.data;
        const { total_employees } = result.data;
        setAverageScore(average_employee_score)
        setCompletedCourses(total_completed_courses)
        setTotalEmployees(total_employees)

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
    <Grid bgcolor={"#FFF7F1"} minHeight={"100vh"} padding={{xs:"20px 5px 50px 5px", sm:5}}>
      <Grid container justifyContent={'center'} gap={"50px"}>
        <Grid xs={12} textAlign={'center'}>
          <Typography variant='h2' color={"#5C83BF"}>Overview</Typography>
        </Grid>
        <Grid bgcolor={"white"} border={"2px solid #5C83BF"} lg={5} xs={12} boxShadow={"0px 5px 10px #EFE5DE"}> 
          <Grid bgcolor={"#5C83BF"} padding={"10px"} color={"white"}>
            <Typography fontWeight={700} fontSize={"24px"}>Overview</Typography>
          </Grid>
          <Grid padding={{xs:"30px 10px 30px 10px", sm:"60px 10px 60px 10px"}} display={'flex'} flexDirection={{xs:"column", sm:"row"}} justifyContent={'space-around'} gap={"40px"}>
            <Box textAlign={'center'} display={'flex'} flexDirection={'column'} gap={"10px"}>
              <Typography color={"#4C6EA2"} fontSize={"32px"} fontWeight={700}>{averageScore} <FontAwesomeIcon icon={faStar} color='#02B2AF'/></Typography>
              <Typography>Avg. Employee Score</Typography>
            </Box>
            <Box textAlign={'center'} display={'flex'} flexDirection={'column'} gap={"10px"}>
              <Typography color={"#4C6EA2"} fontSize={"32px"} fontWeight={700}>{completedCourses} <FontAwesomeIcon icon={faSquareCheck} color='#02B2AF'/></Typography>
              <Typography>Completed Courses</Typography>
            </Box>
            <Box textAlign={'center'} display={'flex'} flexDirection={'column'} gap={"10px"}>
              <Typography color={"#4C6EA2"} fontSize={"32px"} fontWeight={700}>{totalEmployees} <FontAwesomeIcon icon={faUser} color='#02B2AF'/></Typography>
              <Typography>Total Employees</Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid lg={6} xs={12} boxShadow={"0px 5px 10px #EFE5DE"}>
          <TopEmployees/>
        </Grid>
        <Grid xs={12} lg={7} bgcolor={'white'} border={"2px solid #5C83BF"}>
          <Grid bgcolor={"#5C83BF"} padding={"10px"} color={"white"}>
            <Typography fontWeight={700} fontSize={"24px"}>Courses</Typography>
          </Grid>
          <InProgressCourses/>
        </Grid>
        <Grid bgcolor={'white'} border={"2px solid #5C83BF"} xs={12} lg={4} boxShadow={"0px 5px 10px #EFE5DE"}>
          <Grid bgcolor={"#5C83BF"} padding={"10px"} color={"white"}>
            <Typography fontWeight={700} fontSize={"24px"}>Activities</Typography>
          </Grid>
          <Grid padding={"10px"} display={'flex'} justifyContent={'center'} alignItems={'center'} height={"100%"}> 
            <Activities/>
          </Grid>
        </Grid>
        <Grid xl={5} lg={12} xs={12} bgcolor={'white'} border={"2px solid #5C83BF"} height={"fit-content"}>
        <Grid bgcolor={"#5C83BF"} padding={"10px"} color={"white"}>
          <Typography fontWeight={700} fontSize={"24px"}>Skills</Typography>
        </Grid>
          <Grid display={'flex'} justifyContent={'center'}>
            <DevelopingSkills/>
          </Grid>
        </Grid>
        <Grid xl={6} lg={12} xs={12}>
          <Grid bgcolor={"#5C83BF"} padding={"10px"} color={"white"}>
            <Typography fontWeight={700} fontSize={"24px"}>Teams</Typography>
          </Grid>
          <Teams/>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
