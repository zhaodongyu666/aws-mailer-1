// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Load config
const CONFIG = require('./config.json');

// Set the region 
AWS.config.update({
  region: CONFIG.REGION,
  sessionToken: CONFIG.SESSION_TOKEN,
  accessKeyId: CONFIG.ACCESS_KEY_ID,
  secretAccessKey: CONFIG.SECRET_ACCESS_KEY_ID

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
      Destination: { /* required */
        ToAddresses: [
          'dongyu.zhao@accenture.com',
          /* more items */
        ]
      },
      Message: { /* required */
        Body: { /* required */
          Html: {
           Charset: "UTF-8",
           Data: "This is Test Email, Please ignore."
          },
          Text: {
           Charset: "UTF-8",
           Data: "TEXT_FORMAT_BODY"
          }
         },
         Subject: {
          Charset: 'UTF-8',
          Data: 'Test email'
         }
        },
      Source: 'noreply@mmr.accenture.com' ,/* required */
      
    };

    console.log(i + ". " + emailId);
    // Create the promise and SES service object
    try {
      let data = await (SES.sendEmail(params).promise());
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