import axios from 'axios';

const instance = axios.create({
  baseUrl: 'https://react-my-burger-e2886.firebaseio.com/',
});

export default instance;
