const gateway = require('fast-gateway')
const pump = require('pump')
const PORT = 8081;

const mode = {
  neaMode: "live",
  telcoMode: "live",
  khanepaniMode: "live",
  skyTvMode: "live",
  insuranceMode: "live",
  meroTvMode: "live",
  dishhomeInquiryMode: "live",
  simtvInquiryMode: "live",
  connectPlusSchoolMode: "live",
  netTvMode: "live",
  walletPaymentMode: "live",
  esewaLoadMode: "live",
  bigMoviesMode: "live",
  bussewaMode: "live",
  shangrilaTaxMode: "live",
  capitalMode: "live",
  maxTvMode: "live",
  midasMode: "live",
  prabhuTvMode: "live",
  barahiMode: "live",
  asinkaMode: "live",
  electricityMode: "live",
  apartmentMode: "live",
  worldlinkMode: "live"
}

const server = gateway({
  routes: [{
    prefix: '/cs-gateway',
    target: 'http://billpaytest.f1soft.com.np/',
    middlewares: [csRequestGatewayFactory],
    hooks: {
      async onRequest(req, res) { },
      onResponse(req, res, stream) { pump(stream, res) }
    }
  }]
})

server.start(PORT).then(server => {
  console.log(`SERVER STARTED AT: ${PORT}`);
})


function csRequestGatewayFactory(req, res, next) {

  req.cacheDisabled = true
  let path = req.params.wild;
  path = path.split("/")[0];
  console.log(`REQUEST FOR PATH: ${path}`);
  switch (path) {
    case "worldlink":
      handleWorldlink(req, res, next);
      break;
    default:
      next();
  }
}

function handleWorldlink(req, res, next) {
  if (mode.worldlinkMode == "live") {
    next();
  } else {
    if (req.userid == "online_due_and_package") {
      res.send({
        "resultCode": "0",
        "resultDescription": "Bill details obtained",
        "userId": "online_due_and_package",
        "plan": "Fiber Smart home 2019-25mbps/12mths(Renew)",
        "name": "Online due and package",
        "requestId": "F1DEV484797",
        "expiredMoreThan30Days": false,
        "payableAmount": 16673.0,
        "message": "You have due payment.",
        "acceptPayment": true,
        "branch": "MANBHAWAN",
        "tariffs": [
          {
            "particular": "Internet",
            "amount": "16673.0",
            "refundable": false
          }
        ],
        "packages": []
      })
    } else {
      res.send({
        "resultCode": "-1",
        "resultDescription": "Customer not found.",
        "requestId": "F1DEV5597231"
      })
    }
  }
}