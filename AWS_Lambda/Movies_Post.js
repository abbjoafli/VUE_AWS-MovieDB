
console.log("Starting Function");

const AWS = require('aws-sdk'); //AWS
//För Dynamodb
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});


// exports.handler = function(e, ctx, callback){
let index = function index(e, context, callback) {
    var d = new Date();
     var params= {
Item: {Created: d.toLocaleDateString(),
    Name: e.Name,
        Description: e.Description,
        Dislikes: 0,
        Likes: 0,
        Image: e.Image,
        Types: e.Types,
        Releasedate: e.Releasedate,
        IMDB_rating:e.IMDB_rating},
    TableName: 'Movies'
    };

    docClient.put(params, function(err, data) {
        if (err) {
            callback(err,null);
        }
        else
        {
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
        // callback(null,data);
        }
    });
    
}
exports.handler = index;