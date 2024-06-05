const questionsRouter = require('express').Router()
const Question = require('../models/question')
const mongoose = require('mongoose')

// GET a list of questions and data required to sort them
questionsRouter.get('/', (request, response) => {
  Question.find({}, {'_id': 1, 'name': 1, 'tags': 1, 'difficulty': 1}).then(qns => {
    response.json(qns)
  })
})

// GET the information about a particular question
questionsRouter.get('/:id', (request, response, next) => {
  Question.find({'_id': request.params.id}, 
                {'name': 1, 'tags': 1, 'tags': 1, 'difficulty': 1, 'code': 1})
    .then(qn => {
      if (qn) {
        response.json(qn)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// GET:
// - the next step 
// - the vars for that function
// - the flow for that line
questionsRouter.get('/:id/step/:step', (request, response, next) => {
    const qnId = request.params.id;
    const step = request.params.step;

    getStep(qnId, step)
        .then(stepData => {
            const funcVarsPromise = getVars(qnId, stepData.func_name);
            const flowPromise = getFlow(qnId, stepData.line);
            return Promise.all([Promise.resolve(stepData), funcVarsPromise, flowPromise]);
        })
        .then(data => {
            const result = Object.assign({}, ...data);
            response.json(result);
        })
        .catch(error => next(error));
});


async function getStep(qnId, step) {
  const stepData = await Question.aggregate([
    {'$match': {'_id': new mongoose.Types.ObjectId(qnId)}},
    {'$project': {'step': {'$arrayElemAt': ['$trace', parseInt(step)]}}},
  ])
  return stepData[0].step;
} 

async function getVars(qnId, func) {
  const funcVars = await Question.findOne(
    {'_id': qnId})
    .select('vars -_id')
    .lean()
    // Original code: we actually want all functions because there will be a 
    // call stack and there's not that much data
    //const funcVars = await Question.findOne(
    //  {'_id': qnId
    //,'vars': {'$elemMatch': {'function': func}}})
    //.select('vars.$ -_id')
    //.lean()
  return funcVars;
}

async function getFlow(qnId, line) {
  const flow = await Question.findOne(
    {'_id': qnId,
    'flow': {'$elemMatch': {'line': line}}})
    .select('flow.$ -_id')
    .lean() 
  return flow;
}

module.exports = questionsRouter