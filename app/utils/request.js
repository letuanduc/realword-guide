import axios from 'axios';

function request(options) {
  return axios(options)
    .then((response) => {
      if (response.status >= 200 && response.status < 305) {
        return response.data;
      }

      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    });
}

export default request;
