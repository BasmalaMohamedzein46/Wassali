const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const {
  requestService
} = require('../services');

const createRequest = catchAsync(async (req, res) => {
  const id = req.user._id;
  const request = await requestService.createRequest(id, req);
  res.status(httpStatus.CREATED).send(request);
});
// ↓.↓.↓.↓.↓.↓.↓.↓.↓.↓.↓.↓.↓.↓.↓.↓.↓.↓.↓.↓.↓
const getRequests = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['user']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await requestService.queryRequests(filter, options);
  res.send(result);
});

const getRequest = catchAsync(async (req, res) => {
  const request = await requestService.getRequestById(req.params.requestId);
  if (!request) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Request not found');
  }
  res.send(request);
});

const updateRequest = catchAsync(async (req, res) => {
  const id = req.user._id;
  const request = await requestService.updateRequestById(id, req);
  res.send(request);
});

const deleteRequest = catchAsync(async (req, res) => {
  const id = req.user._id;
  const request= await requestService.deleteRequestById(id,req.params.requestId, req);
  res.status(httpStatus.OK).send(request);
});

const sendRequest = catchAsync(async (req, res) => {
  const id = req.user._id;
  const tripId = req.params.tripId;
  const request = await requestService.sendrequest(id, tripId, req);
  res.status(httpStatus.CREATED).send(request);
});

const userViewRequests = catchAsync(async (req, res) => {
  const id = req.user._id;
  const request = await requestService.userviewrequests(id, req);
  res.status(httpStatus.OK).send(request);
});

const userViewRequest = catchAsync(async (req, res) => {
  const id = req.user._id;
  const request = await requestService.userviewrequest(id, req);
  res.status(httpStatus.CREATED).send(request);
});

const acceptRequest = catchAsync(async (req, res) => {
  const id = req.user._id;
  // const tripId = req.params.tripId;
  const requestId = req.params.requestId
  const request = await requestService.acceptrequest(id, requestId, req);
  res.status(httpStatus.CREATED).send(request);
})

const acceptAnyRequest = catchAsync(async (req, res) => {
  const id = req.user._id;
  const tripId = req.params.tripId;
  const requestId = req.params.requestId;
  const request = await requestService.acceptanyrequest(id, requestId, tripId, req);
  res.status(httpStatus.CREATED).send(request);
})



const declineRequest = catchAsync(async (req, res) => {
  const id = req.user._id;
  const requestId = req.params.requestId;
  const request = await requestService.declinerequest(id, requestId, req);
  res.status(httpStatus.CREATED).send(request);
})

module.exports = {
  createRequest,
  getRequests,
  getRequest,
  updateRequest,
  deleteRequest,
  sendRequest,
  userViewRequests,
  userViewRequest,
  acceptRequest,
  acceptAnyRequest,
  declineRequest
};
