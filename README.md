# VUE_AWS-MovieDB-example
A example of how you can create a MOVIE database with VUE and AWS

### AWS_Lambda (Backend)
All the lambda functions used in the project.
A image over API-gateway, another over API-gateway stagepart and one over the dynamoDB.

### Vue (Frontend)
Frontend made in vue with vuex, axios and vuetify.


## Site
[Frontend hosted on a AWS S3 Bucket](https://supermoviedb.s3.amazonaws.com/index.html)

## Needs to check

* The data which are sent between the client and server needs to be JSON, adda JSON stringify before sending and JSON parse when receiving.
* Look over the timestamps so it is the same format everywhere. I think it is and its just old values in the db.
