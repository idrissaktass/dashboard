import React, { useEffect, useState } from 'react';
import { fetchData } from '../api';
import { BarChart } from '@mui/x-charts/BarChart';
import { Grid } from '@mui/material';

function Activities() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activityHours, setActivityHours] = useState([]);
  const [activityExams, setActivityExams] = useState([]);
  const [activityLessons, setActivityLessons] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result); // Update state with fetched data
        const { activity_hours } = result.data;
        // Extracting data for all activities
        const allActivityHours = activity_hours.map(activity => activity.hours);
        const allActivityExams = activity_hours.map(activity => activity.exams_completed);
        const allActivityLessons = activity_hours.map(activity => activity.lessons_taken);

        // Update state with accumulated data
        setActivityHours(allActivityHours);
        setActivityExams(allActivityExams);
        setActivityLessons(allActivityLessons);

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

  const activityDates = data.data.activity_hours.map(activity => activity.date);
  console.log("activityDates",activityDates)
  return (
    <Grid xs={12}>
      <BarChart
        xAxis={[{ scaleType: 'band', data: activityDates }]}
        series={[
          { data: activityHours, label: 'Hours', stack: 'total' },
          { data: activityExams, label: 'Exams', stack: 'total' },
          { data: activityLessons, label: 'Lessons', stack: 'total' }
        ]}
        yAxis={[{ min: 0, max: 10 }]}
      />
    </Grid>
  );
}

export default Activities;
