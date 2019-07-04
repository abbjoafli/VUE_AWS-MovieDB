const AWS = require('aws-sdk'); //AWS
//För Dynamodb
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});



let index = function index(e, context, callback) {
        var d = new Date();
        let updateValues=e.updateValues;
        let updateLabels=e.updateLabels;
        let Letters=["a","b","c","d","e","f","g","h","i"];
        let UpdateExpression= "set Updated = :u, ";
        let ExpressionAttributeValues={":u": d.toLocaleString()};
       for (var i = 0; i < updateLabels.length; i++) {
           //Uppdaterar Expressionlist så den innehåller labelserna som vi vill uppdatera
          UpdateExpression+= updateLabels[i]+" = :"+Letters[i];
           //Uppdaterar attributlistan så den innehåller värdena som vi vill uppdatera till
          ExpressionAttributeValues[":"+Letters[i]]= updateValues[i];
          if (i!=updateLabels.length-1) {
              UpdateExpression+= ", ";
          }
       }
   console.log(updateValues);
   console.log(updateLabels);
   
     var params= {
    TableName: 'Movies',
    Key:{
        "Name": e.Name,
    },
    UpdateExpression: UpdateExpression,
    ExpressionAttributeValues:ExpressionAttributeValues,
    ReturnValues:"UPDATED_NEW"
    
    };

docClient.update(params, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            callback(null, {
                statusCode: 200, // Added
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: "Movie added!",
                    data: params,
                })
            });
    }
});

   
    
}
exports.handler = index;
