import React, { useEffect, useState } from 'react';
import { fetchData } from '../api';
import { Typography, Grid, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function InProgressCourses() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assignedTo, setAssignedTo] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [courses, setCourses] = useState([]);
  const [upcomings, setUpcomings] = useState([]);
  const [selectedView, setSelectedView] = useState("inprogress");

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result);
        const { in_progress_courses } = result.data;
        const { upcoming_courses } = result.data;
        setCourses(in_progress_courses)
        setUpcomings(upcoming_courses)

        const assignedTo = in_progress_courses.map(course => course.assigned_to);
        const description = in_progress_courses.map(course => course.description);
        const dueDate = in_progress_courses.map(course => course.due_date);
        const status = in_progress_courses.map(course => course.status);
        const title = in_progress_courses.map(course => course.title);

        setAssignedTo(assignedTo);
        setDescription(description);
        setDueDate(dueDate);
        setStatus(status);
        setTitle(title);

      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleViewChange = (event) => {
    setSelectedView(event.target.value);
  };

  return (
    <Grid display={'flex'} flexDirection={'column'} gap={3} padding={"20px"}>
        <Grid alignSelf={"end"} >
        <FormControl>
        <Select
          sx={{backgroundColor:"#5C83BF", color:"white"}}
          labelId="view-select-label"
          id="view-select"
          value={selectedView}
          onChange={handleViewChange}
        >
          <MenuItem value="inprogress">In Progress</MenuItem>
          <MenuItem value="upcomings">Upcoming</MenuItem>
        </Select>
      </FormControl>
        </Grid>

      {selectedView === "inprogress" && (
        <TableContainer component={Paper}  boxShadow={"0px 5px 10px #EFE5DE"}>
          <Table sx={{ minWidth: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{fontSize:"18px"}}>Assigned to</TableCell>
                <TableCell  sx={{fontSize:"18px"}} align='center'>Description</TableCell>
                <TableCell sx={{fontSize:"18px"}} align='center'>Due Date</TableCell>
                <TableCell sx={{fontSize:"18px"}} align='center'>Status</TableCell>
                <TableCell sx={{fontSize:"18px"}} align='center'>Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow
                  key={course.assigned_to}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {course.assigned_to}
                  </TableCell>
                  <TableCell align='center'>{course.description}</TableCell>
                  <TableCell align='center'>{course.due_date}</TableCell>
                  <TableCell align='center'>{course.status}</TableCell>
                  <TableCell align='center'>{course.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {selectedView === "upcomings" && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{fontSize:"18px"}}>Assigned to</TableCell>
                <TableCell sx={{fontSize:"18px"}} align='center'>Description</TableCell>
                <TableCell sx={{fontSize:"18px"}} align='center'>Due Date</TableCell>
                <TableCell sx={{fontSize:"18px"}} align='center'>Status</TableCell>
                <TableCell sx={{fontSize:"18px"}} align='center'>Title</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {upcomings.map((course) => (
                <TableRow
                  key={course.assigned_to}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {course.assigned_to}
                  </TableCell>
                  <TableCell align='center'>{course.description}</TableCell>
                  <TableCell align='center'>{course.due_date}</TableCell>
                  <TableCell align='center'>{course.status}</TableCell>
                  <TableCell align='center'>{course.title}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Grid>
  );
}

export default InProgressCourses;
