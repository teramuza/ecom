import axios from 'axios';

import '../../../cfg';

export const getProfile = (id, token) => {
  return{
    type: 'GET_PROFILE',
    payload : axios.get(`${apiUrl}/user/${id}`,
    { headers : { Authorization : `Bearer ${token}`} })
  }
}
