console.log("Starting Function");

const AWS = require('aws-sdk'); //AWS
//För Dynamodb
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});


exports.handler = function(e, ctx, callback)
{
    let namn=null;
      if(e['queryStringParameters'])
    namn= e['queryStringParameters']['namn']

    //  namn= e.queryStringParameters.namn;
    if(namn!= null)
    {
        console.log(namn)
        var params= {
  Key: {
      "Namn": namn
  },
      TableName: 'Pokemon'
      };

    docClient.get(params, function(err, data) {
        if (err) {
            callback(err,null);
        }
        else
        // callback(null,data);
          callback(null,{
                statusCode: 200, // Bad Request
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    message: "Ett skepp kommer lastat med EN Pokemon",
                    Item:data
                })
            });
    });
    }
    else
    {
  //Scannar hela listan, tar mycket minne och tid
let scanningParameters = {
  TableName: 'Pokemon',
  Limit: 100
}

    docClient.scan(scanningParameters, function(err, data) {
        if (err) {
            callback(err,null);
        }
        else
        callback(null,{
                statusCode: 200, // Bad Request
                headers: {
                    'Content-Type': 'application/json', 
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    message: "Ett skepp kommer lastat med Pokemon",
                    Items:data
                })
            });
    });
    }
 }
 //Test Code:
/*
//Test med
 {
    "queryStringParameters": {
      "namn": "Charizard"
    }
  }
//Test utan
  {}
  */
