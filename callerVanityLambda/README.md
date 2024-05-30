# callerVanityLambda

## Reasoning
 -  Nodejs Lambda because I was doing something kinda completely new in setting up the Lambda, DynamoDB, and Amazon Connect, so I wanted to have at least one thing I was familiar with. Although, quickly looking at a couple short tutorials using Python on YouTube, I don't know that it would've added a huge amount of complexity.
    - Chose x86_64 because it's used in i3, i5, i7, i9 processors and AMD processors. While I don't know too much about all of that, my limited research says those are "all PC compatible"
    - Didn't use API Gateway to expose the endpoint to the public, didn't believe it to be necessary. But that is something I'd like to look into more if given more time.
 - Cloudformation
      - Chose CloudFormation because of the easily repeatable process of uploading the yaml to create the stack
      - Any changes made are also made as code / Declarative syntax of the YAML files
      - Easily deletes all resources at once, the resources created in the code. I knew I'd 
      - I picked CloudFormation because I've got limited experience with YAML files and wanted to improve my skills
      - CDK generates CloudFormation templates, but I wanted to kinda start from scratch. Even though I used the AWS CLI to help, and Google, of cours
      - Costs are easily estimated based on the template
  - S3 Bucket
      - To store the code
      - Not super familiar with S3, but it's a pay-as-you-go type storage so you only pay for what you actually use. 
      - Automatic scaling to suit data storage needs
      - High performance allowing for fast uploads and downloads of files
      - S3 also has robust security in the form of IAM policies, bucket policies and Access Control Lists

- Struggles
  - Not having a GUID or Int as my partition/primary key in the CallerAndVanity Table, especially not automatically created, just took some getting used to.
  - Tried to use a ScanCondition was parameters and it didn't work, so just wound up using a general Scan and removed an item from the list, which was also a shortcut
  - Setting permissions for the DynamoDB to be accessed from the Lambda. This was a simple fix but it confused me for a moment. Thought it'd be automatic.
  - Deciding whether the vanity number should actually try to make a word out of the random string
  - Invoking the Lambda locally in VS Code, still never figured it out. Kept getting "Partial credential found in env, missing: AWS_SECRET..." even though the file was setup fine in my ~aws.config
  - Just getting the right entry point into the lambda after uploading from zip file
  - Drilling into the right property of the return object in Amazon Connect so it could be read to the caller
  - A multitude of problems when creating the yaml for CloudFormation, including
    - "user/Malik is not Authorized to Perform CLoudformation::CREATEUPLOADBUCKET"
    - "Resource handler returned message: "Your access has been denied by S3, please make sure your request credentials have permission to GetObject for lambda-bucket-4/s3://lambda-bucket-"
   - Trying to reference items within the yaml, getting that syntax wrong
   - Trying to create the Connect Flow to also include the Lambda where necessary

  


## Shortcuts
  - I would've tried to make it so that users don't have to manually set the function in the contact flow after creating a stack
  - Although this was okay in the requirements, I think building out a fully fleshed yaml to also create the Amazon Connect instance would be great as well
  - Don't know if this is possible, but I would've tried to add phone number creation to the contact flow.
  - Not using a PhoneNumber package in the Lambda function itself
  - Removing and not considering authorization whenever I could, in the S3 bucket, for example
  - Disregarded unit testing/Defensive programming in general
  - The convert to vanity method should be more friendly to other country codes/number lengths
  - Figure out what a caller should do after receiving those vanity numbers, instead of just hanging up immediately
 

## What would I do with more time
 - Definitely build out the Web App to display the callers and vanity numbers
 - Add input validation, Lock it down so that nothing is attempted if the phone number received is not acceptable and an error is thrown
 - Add unit testing, for example:
    - Utility Tests:
      - Verify the phone number is converted successfully
      - Verify an error is thrown when there is not a letter to match a character
      - If we were to make the utitly more flexible, we'd want to also see if how it handles phone numbers without country codes,
      - phone numbers with more than 11 digits
    - App.js: 
      - Verify that we get a succcessful DB responses for the PUT and Scan requests
      - Verify an expected returned result map
      - Verify error handling in the DB for the PUT and SCAN requests
      - Verify the newly created/callerVanity is not in the stringArray



## Other Considerations
  - For Scalability
    - We'd want to make sure our DynamoDB is autoscaling to adjsut read and write throughput capacity based on traffic
    - If the workloads are unpredictable, maybe use On-Demand mode
    - Adjust service limits of the Connect instance to be able to handle the xpected number of calls
    - Make sure our Lambda timeouts are approriate to avoid long wait times and failures. The 6 seconds I used may be a bit too long.
  - For Security
    - For the Lambda, we'd want to follow the principle of least priviledge, only assigning necessary permissions. I certainly didn't folow that initially, I gave full access for the used resources to avoid any auth errors.
    - we'd want to have authorization logic to validate tokens, IP addresses (if we wanted to make some things only accessible via VPN), etc
    - Encrypt data in DynamoDB tables 
    - Use IAM to restrict access to DB tables. 
    - SEtup request limits to protect against DDoS attacks.
    - Use AWS Backup or Dynamo point-in-time recovery to backup data and restore if needed
    - Use call screening methods to filter out malicious calls
    - Setup Cloudwatch to log and monitor Lambda invocations, errors, performance
    - Do the same for DynamoDB and Amazon Connect
    - OVERALL: Think longer about Scalability, Security, Logging and Data/Disaster Recovery


