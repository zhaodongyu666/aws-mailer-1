// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Load config
const CONFIG = require('./config.json');

// Set the region 
AWS.config.update({region: CONFIG.REGION});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function sendToAll() {
    const emailAddresses = require(CONFIG.EMAIL_ADDRESSES_FILE).emailAddresses;
    for(i in emailAddresses) {
        a = emailAddresses[i];
        // Create params 
        var params = {
            Destination: {
                ToAddresses: [a]
            },
            Source: CONFIG.SOURCE, /* required */
            Template: CONFIG.TEMPLATE, /* required */
            TemplateData: CONFIG.TEMPLATE_DATA,
            ReplyToAddresses: [
                CONFIG.REPLY_TO
            ]
        };

        console.log(i+","+a);
        // Create the promise and SES service object
        var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendTemplatedEmail(params).promise();

        /*
        // Handle promise's fulfilled/rejected states
        sendPromise.then(
            function(data) {
                console.log(data);
            }
        ).catch(
            function(err) {
                console.log(err, err.stack);
            }
        );
        */

        if(((parseInt(i) + 1) % CONFIG.LIMIT.PER_SEC) === 0) {
            await sleep(CONFIG.SLEEP);
        }
    }
}

sendToAll();
