import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/qn'

// Requests that can be made
// GET: 'http://localhost:3001/api/qn' -> gets list of questions and info required to sort them
// GET: 'http://localhost:3001/api/qn/:id/step/:step' -> gets the next step, vars for that function, and the flow for that line
// GET: 'http://localhost:3001/api/qn/:id' -> gets the initial info about a particular question

const getListQns = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getQn = (id) => {
  console.log('Making GET request with id:', id);  // Debug line
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const getStep = (id, step) => {
  const request = axios.get(`${baseUrl}/${id}/step/${step}`)
  return request.then(response => response.data)
}

// Get a list of all topics
const getTopics = async () => {
  const qns = await getListQns();

  const topics = qns.flatMap(qn => qn.tags || []);
  const uniqueTopics = [...new Set(topics)];

  return uniqueTopics;
}

const getTopicQns = (topic) => {
  // TODO:
}

export default { 
  getListQns, getQn, getStep, getTopics, getTopicQns
}