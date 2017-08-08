var request = require('request');
var OAuth   = require('oauth-1.0a');
var crypto  = require('crypto');
var loopback = require('loopback');
var app = require('../../server/server');
var provider=require('../../providers.json');
module.exports = function(TwitterIntegration) {


var oauth = OAuth({
            consumer: {
                key: provider["twitter-login"].consumerKey,
                secret: provider["twitter-login"].consumerSecret
            },
            signature_method: 'HMAC-SHA1',
            hash_function: function(base_string, key) {
                return crypto.createHmac('sha1', key).update(base_string).digest('base64');
            }
});

TwitterIntegration.userTimeline=function(data,cb){
if(data.userId){
 app.models.userIdentity.findOne({where:{'userId':data.userId}},function(err,success){
 if(err){
     cb(err);
 }
    else if(success){

        var request_data = {
                url: 'https://api.twitter.com/1.1/statuses/user_timeline.json',
                method: 'GET',
                data: {
                    //count: 5
                }
        
            };
            var token = {
                    key: success.credentials.token,
                    secret: success.credentials.tokenSecret
                };

        request({
                url: request_data.url,
                method: request_data.method,
               form: request_data.data,
               headers: oauth.toHeader(oauth.authorize(request_data, token))
            }, function(error, response, body) {
                //process your data here 
                if(error){
                    cb(error);
                }
                else if(response.statusCode===200){
                    var newBody=JSON.parse(body); 
                   cb(null,newBody);
                }
                else{
                    cb(null,response);
                }
                
            });


    }
 else{
     cb("No Twitter user dound");
 }
 });
}

};
TwitterIntegration.navigateToTweet=function(data,cb){

};
TwitterIntegration.updateStatus=function(data,cb){
if(data.userId && data.status){
 app.models.userIdentity.findOne({where:{'userId':data.userId}},function(err,success){
 if(err){
     cb(err);
 }
    else if(success){

        var request_data = {
                url: 'https://api.twitter.com/1.1/statuses/update.json',
                method: 'POST',
                data: {
                    status:data.status
                }
        
            };
            var token = {
                    key: success.credentials.token,
                    secret: success.credentials.tokenSecret
                };

        request({
                url: request_data.url,
                method: request_data.method,
               form: request_data.data,
               headers: oauth.toHeader(oauth.authorize(request_data, token))
            }, function(error, response, body) {
                //process your data here 
                if(error){
                    cb(error);
                }
                else if(response.statusCode===200){
                    var newBody=JSON.parse(body); 
                   cb(null,newBody);
                }
                else{
                    cb(null,response);
                }
                
            });


    }
 else{
     cb("No Twitter user dound");
 }
 });
}

};
TwitterIntegration.remoteMethod(
    'updateStatus', {
      http: {
        verb: 'post'
      },
      accepts: {
        arg: 'data',
        type: 'object',
        http: {
          source: 'body'
        }
      },
      description: 'update user status',
      returns: {
        type: 'object',
        root: true
      }
    }
  );
 TwitterIntegration.remoteMethod(
    'userTimeline', {
      http: {
        verb: 'post'
      },
      accepts: {
        arg: 'data',
        type: 'object',
        http: {
          source: 'body'
        }
      },
      description: 'get twitter user timeline',
      returns: {
        type: 'object',
        root: true
      }
    }
  );
};