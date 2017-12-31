import axios from "axios"
import auth from "utils/auth"

export function fetchLifts(type) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${auth.getToken()}`

  if (type) return axios.get("/api/lifts", { params: { lift_type: type } })
  else return axios.get(`/api/lifts`)
}

export function getLiftTypes() {
  axios.defaults.headers.common["Authorization"] = `Bearer ${auth.getToken()}`
  return axios.get("/api/lift-types")
}

export function getLifts(params) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${auth.getToken()}`
  console.log(params)
  if (params) return axios.get("/api/lifts", { params })
  else return axios.get(`/api/lifts`)
}

export function addLift(data) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${auth.getToken()}`
  return axios.post("/api/lifts", { data })
}

export function editLift(data) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${auth.getToken()}`
  return axios.put("/api/lifts", { data })
}

export function deleteLift(id) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${auth.getToken()}`
  return axios.delete("/api/lifts", { params: { _id: id } })
}
