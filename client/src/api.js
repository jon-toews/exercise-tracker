import axios from 'axios';
import auth from 'utils/auth';

// set default authentication header
axios.defaults.headers.common['Authorization'] = `Bearer ${auth.getToken()}`;


export function getLiftTypes() {
  return axios.get('/api/lift-types')
}

export function getLifts(params) {
  console.log(params)
  if (params)
    return axios.get('/api/lifts', {params})
  else
    return axios.get(`/api/lifts`)
}

export function addLift(data) {
  return axios.post('/api/lifts', { data })
}

export function editLift(data) {
  return axios.put('/api/lifts', { data })
}

export function deleteLift(id) {
  return axios.delete('/api/lifts', { params: { _id: id } })
}
