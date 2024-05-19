import React, { useEffect, useState } from 'react';
import { fetchData } from '../api';
import { BarChart } from '@mui/x-charts/BarChart';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid, Typography } from '@mui/material';

function DevelopingSkills() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [skills, setSkills] = useState([]);
  const [topSkills, setTopSkills] = useState([]);
  const [selectedView, setSelectedView] = useState("developing");

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result);
        const { skills_in_development, top_skills } = result.data;

        const skills = skills_in_development.map(skill => skill.skill);
        const topSkills = top_skills.map(skill => skill.skill);

        setSkills(skills);
        setTopSkills(topSkills);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Grid display={'flex'} gap={3} padding={"20px"} container justifyContent={'center'}>
      <Grid display="flex" justifyContent={"end"} xs={12} >
        <FormControl>
          <Select
            sx={{backgroundColor:"#5C83BF", color:"white"}}
            labelId="view-select-label"
            id="view-select"
            value={selectedView}
            onChange={handleViewChange}
          >
            <MenuItem value="developing">Developing Skills</MenuItem>
            <MenuItem value="upcomings">Top Skills</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      
      {selectedView === "developing" && (
        <Grid bgcolor={'white'} xs={12}>
        <Grid padding={"20px"}>
        <BarChart
          xAxis={[{ scaleType: 'band', data: skills }]}
          series={[{ data: data.data.skills_in_development.map(skill => skill.employees), label:"employees" }]}
          height={400}
        />
        </Grid>
        </Grid>
      )}

      {selectedView === "upcomings" && (
        <Grid bgcolor={'white'} xs={12}>
        <Grid padding={"20px"}>
        <BarChart
          xAxis={[{ scaleType: 'band', data: topSkills }]}
          series={[{ data: data.data.top_skills.map(skill => skill.employees), label:"employees" }]}
          height={400}
        />
        </Grid>
        </Grid>
      )}
    </Grid>
  );
}

export default DevelopingSkills;
