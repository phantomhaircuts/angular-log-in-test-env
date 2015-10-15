var request = require("request");
var md5 = require('MD5');

var uname = "vendscreenapi";
var pwd ="o4Gh9Z7X5tYAt^cdDxwM";

var xdate = "Mon Jan 19 2015 23:45:30 GMT";
var sales_input = 'input='+'{"batchid":"transactions_15106927_20150813090904418.zip","sales":[{"id":"15106927","date":"Mon Jan 01 2001 23:45:00 GMT","type":"Mobile","price":175,"item":"A1","transid":"d38c1950-093c-4f07-8d74-301b30baf52e"},{"id":"15106927","date":"Mon Jan 01 2001 23:50:00 GMT","type":"Visa","price":150,"item":"D9","transid":"2fb79f81-5f1b-484c-8bb7-615fbff122db"}]}';

var xauthentication = pwd + xdate + sales_input;

console.log("xauth data - ", xauthentication);

var md5_hash = md5(xauthentication);

xauthentication = uname+":"+md5_hash;

console.log("xauthentication - ", xauthentication);

var options = {
  url: 'http://testdapi.vagabondvending.com/DTG/public/sales',
  headers: {
    'Content-type': 'text/plain',
  'Accept': 'application/json',
    XDATE: 'Mon Jan 19 2015 23:45:30 GMT',
    XAUTHENTICATION: xauthentication
  },
  dataType:'json',
  body : sales_input
};

function callback(error, response, body) {
    console.log("error - ", error);
    console.log("resp - ", response);
    console.log("body - ", body);
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
    }
}

console.log("options - ", options);
request.post(options, callback);
