import axios from 'axios';

const API_URL ='https://demotrainiq.com/case/dashboard';

export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("xd")
    return response.data;
  } catch (error) {
    throw new Error('There was a problem fetching data');
  }
};
