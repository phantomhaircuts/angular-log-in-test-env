var request = require("resquest");
var md5 = require ('MD5');

var username =  ;
var password = ;

var xdate =

var xauthentication = password + xdate;

var hash = md5(xauthentication);

xauthentication = username+":"+hash;

var options = {
  url: 'http://apitestv12.vagabondvending.com/DTG/users/verifylogin'
  headers: {
    'Content-type': 'text/plain',
    'Accept': 'application/json',
    XDATE: 'Mon Jan 19 2015 23:45:30 GMT',
    XAUTHENTICATION: xauthentication
  },
  dataType:'json'
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

request.post(options, callback);
