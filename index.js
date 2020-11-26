const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const AWS = require('aws-sdk');

try {
  const AWS_KEY_ID = core.getInput('aws_key_id', { required: true });
  const SECRET_ACCESS_KEY = core.getInput('aws_secret_access_key', { required: true });

  const BUCKET = core.getInput('bucket', { required: true });
  const SOURCE_FILE= core.getInput('source_file', { required: true });
  const KEY = core.getInput('key', { required: true });

  const stream = fs.createReadStream(SOURCE_FILE);

  const s3 = new AWS.S3({
    accessKeyId: AWS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY
  });

  s3.upload({ Bucket: BUCKET, Key: KEY, Body: stream, ACL: 'public-read' }, (err, data) => {
    if (err) {
      throw err;
    }
    core.info(`Uploaded ${SOURCE_FILE} to ${data.Location}`);
  });
} catch (error) {
  core.setFailed(error.message);
}
