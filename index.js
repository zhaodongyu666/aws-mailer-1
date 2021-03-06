// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Load config
const CONFIG = require('./config.json');

// Set the region 
AWS.config.update({
  region: CONFIG.REGION
});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function sendToAll() {
  const emailAddresses = require(CONFIG.EMAIL_ADDRESSES_FILE).emailAddresses;
  let SES = new AWS.SES({
    apiVersion: '2010-12-01'
  });
  for (let i in emailAddresses) {
    let emailId = emailAddresses[i];
    // Create params 
    var params = {
      Destination: {
        ToAddresses: [emailId]
      },
      Source: CONFIG.SOURCE,
      /* required */
      Template: CONFIG.TEMPLATE,
      /* required */
      TemplateData: CONFIG.TEMPLATE_DATA,
      ReplyToAddresses: [
        CONFIG.REPLY_TO
      ]
    };

    console.log(i + ". " + emailId);
    // Create the promise and SES service object
    try {
      let data = await (SES.sendTemplatedEmail(params).promise());
      // console.log(data);
    } catch (err) {
      console.error(err);
    }
    if (((parseInt(i) + 1) % CONFIG.LIMIT.PER_SEC) === 0) {
      await sleep(CONFIG.SLEEP);
    }
  }
}

sendToAll();