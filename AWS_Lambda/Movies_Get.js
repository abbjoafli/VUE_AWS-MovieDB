console.log("Starting Function");

const AWS = require('aws-sdk'); //AWS
//För Dynamodb
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});


exports.handler = function(e, ctx, callback)
{
  //Scannar hela listan, tar myvcket minne och tid
let scanningParameters = {
  TableName: 'Movies',
  Limit: 100
}

    docClient.scan(scanningParameters, function(err, data) {
        if (err) {
            callback(err,null);
        }
        else
        callback(null,data);
    });
    
 }