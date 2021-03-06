let templateName = process.argv[2];
let isCreateOp = process.argv[3] !== 'true';

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Load config
const CONFIG = require('./config.json');

// Set the region 
AWS.config.update({
  region: CONFIG.REGION
});
const fs = require("fs");

async function createTemplate() {
  let SES = new AWS.SES({
    apiVersion: '2010-12-01'
  });
  try {
    let tmplParam = {
      Template: {
        SubjectPart: fs.readFileSync(`./templates/${templateName}/subject`, 'utf-8'),
        TemplateName: templateName,
        HtmlPart: fs.readFileSync(`./templates/${templateName}/html`, 'utf-8'),
        TextPart: fs.readFileSync(`./templates/${templateName}/text`, 'utf-8')
      }
    };
    if(isCreateOp){
      await SES.createTemplate(tmplParam).promise();
    } else {
      await SES.updateTemplate(tmplParam).promise();
    }
    console.log(`Template "${templateName}" successfully created/updated.`);
  } catch(err){
    console.error(err);
  }
}

createTemplate();