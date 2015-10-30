var utils = require('./utils');

var objectId = 1;
var messages = [
  // {
  //   username: 'anon', 
  //   text: 'Test Message',
  //   objectId: objectId 
  // }
];

var actions = {
  'GET': function(request, response){
    utils.sendResponse(response, {results: messages} );
  },
  'POST': function(request, response){
    utils.collectData(request, function(message){
      message.objectId = ++objectId;
      messages.push(message);
      utils.sendResponse( response, {objectId: 1}, 201 );
    });
  },
  'OPTIONS': function(request, response){
    utils.sendResponse(response, null); 
  }

};

var requestHandler = function(request, response) {

  var action = actions[request.method];
  if (action){
    action(request, response);
  } else {
    utils.sendResponse(response, "Not Found", 404); 
  }

};
  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
    // response.writeHead(statusCode, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
     // response.end(JSON.stringify("Hello, World!"));


module.exports.requestHandler = requestHandler;

