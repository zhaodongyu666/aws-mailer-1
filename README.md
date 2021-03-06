# aws-mailer
NodeJS script (Javascript) to send email using AWS Simple Email Service (SES) smtp and template",

# Assumptions
1. You already have Amazon AWS account and Simple Email Service i.e. SES activated
2. You already have aws access key and secret in ~/.aws/credentials file. For more information, read https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html.

# Manage Templates
1. First setup a template inside the `templates` directory. Follow the steps below to create a template.
    1. Create a directory inside `templates` directory. Directory name will be your template name.
    2. Create 3 files (`html`, `text`, `subject`) inside the above created directory.

2. Create the above template in Amazon SES service using the command below:
    ```
    node manageTemplate.js TEMPLATE_NAME
    ```
    In the above command, replace the TEMPLATE_NAME with your desired template name.

3. Optionally, to update the above template in Amazon SES service, first update your template files locally and then run the command below:
    ```
    node manageTemplate.js TEMPLATE_NAME true
    ```
    In the above command, replace the TEMPLATE_NAME with your desired template name.

# Run
    $ npm install
    $ npm start

# Config.json 
    {
        "REGION": "us-east-1",                                  /* AWS Region. Ref: https://docs.aws.amazon.com/general/latest/gr/rande.html */
        "SOURCE": "pankaj@example.com",                         /* From address */
        "TEMPLATE": "MyTemplate",                               /* Template must be created in AWS
                                                                 * aws ses create-template --cli-input-json file://my-template.json
                                                                 * To update use update-template instead of create-template
                                                                 * aws ses update-template --cli-input-json file://my-template.json
                                                                 */
        "TEMPLATE_DATA": "{}",                                  /* Template  */
        "REPLY_TO": "pankaj@example.com",                       /* ReplyTo address */
        "SLEEP": 1000,                                          /* Sleep for 1 sec after every limit count */
        "LIMIT": {
            "PER_DAY": 50000,                                   /* AWS limit, not yet used in the script */
            "PER_SEC": 14                                       /* AWS limit, used in script to sleep after every 14 emails */
        },
        "EMAIL_ADDRESSES_FILE": "./email_addresses_fake.json"   /* fetch email addresses from this file */
    }
