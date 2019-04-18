const fs = require("fs");

// import variables
const props = require("../../props");
const proto = props.proto;

const evaluationConfig = require(props.CONFIG_PATH);
// const evaluationConfig = require(appRoot + "/tufts_gt_wisc_configuration.json");

// import mappings
const metric_mappings = require("../../mappings/metric_mappings");

// import functions
const getMappedType = require("../../functions/getMappedType");
const getProblemSchema = require("../../functions/getProblemSchema");
const handleImageUrl = require("../../functions/handleImageUrl");

const getScoreSolutionResults = require("./getScoreSolutionResults.js");

function scoreSolution(solution) {
  let solution_id = solution.solution_id;
  console.log("scoring solution with id", solution_id);
  let request = new proto.ScoreSolutionRequest();
  request.setSolutionId(solution_id);

  let dataset_input = new proto.Value();
  dataset_input.setDatasetUri(
    "file://" + handleImageUrl(evaluationConfig.dataset_schema)
  );
  request.setInputs(dataset_input);

  const problemSchema = getProblemSchema();

  let metrics = problemSchema.inputs.performanceMetrics.map(d => d.metric);
  let mapped_metrics = metrics.map(metric =>
    getMappedType(metric_mappings, metric)
  );
  let problemPerformanceMetrics = mapped_metrics.map(mapped_metric => {
    let newMetric = new proto.ProblemPerformanceMetric();
    newMetric.setMetric(mapped_metric);
    return newMetric;
  });
  request.setPerformanceMetrics(problemPerformanceMetrics);

  // TODO: the user stuff is actually all optional
  // let solutionRunUser = new proto.SolutionRunUser;
  // solutionRunUser.setId("user1");
  // solutionRunUser.setChoosen(false);
  // solutionRunUser.setReason("none");
  // scoreSolutionRequest.setUsers(solutionRunUser);

  // TODO: scoringConfiguration lets us influence cross valuation
  // and many other evaluation parameters; ignore for now
  let scoringConfiguration = new proto.ScoringConfiguration();
  // TODO: we should do better here
  // scoringConfiguration.setMethod(proto.EvaluationMethod.TRAINING_DATA);
  // I think TRAINING_DATA is pretty much what we did last time, but it's unsupported so far
  // scoringConfiguration.setMethod(proto.EvaluationMethod.HOLDOUT);
  scoringConfiguration.setMethod(proto.EvaluationMethod.K_FOLD);
  scoringConfiguration.setFolds(4);

  scoringConfiguration.setTrainTestRatio(0.8);
  // TODO: use holdout for now, but let users specify in the future
  // scoringConfiguration.setFolds(2);
  request.setConfiguration(scoringConfiguration);

  // store request
  if (props.isRequest) {
    let requestStr = JSON.stringify(request);
    let path = props.REQUESTS_PATH +"scoreSolutionRequests/"+ solution_id+".json";
    fs.writeFileSync(path, requestStr);
  }
  //

  let promise = new Promise((fulfill, reject) => {
    let client = props.client;
    client.scoreSolution(request, (err, response) => {
      if (err) {
        reject(err);
      } else {
        let scoreRequest_id = response.request_id;

        // Added by Alex, for the purpose of Pipeline Visulization
        if (props.isResponse) {
          let pathPrefix = props.RESPONSES_PATH + "scoreSolutionResponses/";
          // let pathMid = scoreRequestID;
          let pathMid = solution_id;
          let pathAffix = ".json";
          let path = pathPrefix + pathMid + pathAffix;
          let responseStr = JSON.stringify(response);
          fs.writeFileSync(path, responseStr);
        }

        getScoreSolutionResults(solution, scoreRequest_id, fulfill, reject);
      }
    });
  });
  return promise;
}

module.exports = scoreSolution;
