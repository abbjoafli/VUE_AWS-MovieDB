exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};


const AWS = require('aws-sdk');
const docCLient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});
exports.handler = function index(e, ctx, callback) {
    var params = {
        Item: { Namn: e.namn, Beskrivning: e.beskrivning, Utvecklingar: e.utvecklingar, Typer:e.typer, Bild: e.bild },
        TableName: 'Pokemon'
    };
    docCLient.put(params, function(err, data) {
        if (err) {
                const response = {
        statusCode: 400,
        body: JSON.stringify('Gick inte att lägga till pokemon!'),
    };
            callback(err, response);
        } else {
              const response = {
        statusCode: 200,
        body: JSON.stringify('Ny pokemon tillagd!'),
    };
            callback(null, response);
        }
    });
}