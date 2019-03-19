# aws-mailer
NodeJS script (Javascript) to send email using AWS Simple Email Service (SES) smtp and template",

# Assumptions
1. You already have Amazon AWS account and Simple Email Service i.e. SES activated

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
