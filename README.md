### compile
if you change the index.js, remember to compile `index.js`

```bash
$ ncc build index.js --license licenses.txt
```

### usage

only support to upload to `public` bucket

add secrects in your repo setting
like

`AWS_ACCESS_KEY_ID`

`AWS_SECRET_ACCESS_KEY`

put this in your action

```yml
- name: upload to s3
  uses: iamdbc/artifact-s3-uploader@v1.0.0
  with:
    access_key_id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    secret_access_key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    bucket: yourpublicbucket
    source_file: the_file_you_want_to_upload
    key: the_s3_object_key
```
