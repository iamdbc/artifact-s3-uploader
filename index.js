const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

try {
  const bucket = core.getInput('bucket');
  const filepath = core.getInput('path');
  const key = core.getInput('key');

  const stream = fs.createReadStream(filepath);

  s3.upload({ Bucket: bucket, Key: key, Body: stream, ACL: 'public-read' }, (err, data) => {
    if (err) {
      throw err;
    }
    core.info(`Uploaded ${filepath} to ${data.Location}`);
  });
} catch (error) {
  core.setFailed(error.message);
}
