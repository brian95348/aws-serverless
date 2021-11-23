# aws-serverless-videotube
add the .json file for your web app from firebase in the transcode-video and update-firebase lambda folders
add the .json filename for your web app from firebase as an environmental variable for your lambdas in AWS Lambda console
add all the required ENV variables in your AWS Lambda console
create a .env file inside the frontend/ directory and add all the ENV variables referenced inside the front end app with the prefix REACT_APP
run npm install in root folder of all lambda functions to install dependencies
npm run predeploy followed by npm run deploy to zip and deploy lambdas
