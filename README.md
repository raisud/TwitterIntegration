
Please make sure you have the following installed:

- Node
- NPM
## Client ids/secrets from third party

- [facebook](https://developers.facebook.com/apps)
- [google](https://console.developers.google.com/project)
- [twitter](https://apps.twitter.com/)


## Twitter

### 1. Clone the application

```
$ git clone git@github.com:raisud/TwitterIntegration.git
$ cd TwitterIntegration
$ npm install
```

### 3. Edit providers.json and add Consumer key and secret for your application

    "twitter-login": {
    "provider": "twitter",
    "authScheme": "oauth",
    "module": "passport-twitter",
    "callbackURL": "/auth/twitter/callback",
    "authPath": "/auth/twitter",
    "callbackPath": "/auth/twitter/callback",
    "successRedirect": "/auth/account",
    "failureRedirect": "/login",
    "consumerKey": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "consumerSecret": "XXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "failureFlash": true
  }
  ```

### 6. Run the application
start mongodb on local on port 27017 or change configuration in /server/datasources.json
```
$ node .
```

- Open your browser to http://localhost:3000
- Click on 'Log in' (in the header, on the rigth)
- Click on 'Login with Twitter'.
- Sign up using a local account, then link to your Facebook account.

## Tutorial - LDAP

### 1. Clone the application
Clone the application as describe [above](#1-clone-the-application).

### 2. Create providers.json

- Copy providers.json.template to providers.json
- Update providers.json with your own values for `profileAttributesFromLDAP` and `server` section

```
  "ldap": {
    "provider": "ldap",
    "authScheme":"ldap",
    "module": "passport-ldapauth",
    "authPath": "/auth/ldap",
    "successRedirect": "/auth/account",
    "failureRedirect": "/ldap",
    "session": true,
    "failureFlash": true,
    "profileAttributesFromLDAP": {
      "login": "uid",
      "username": "uid",
      "displayName": "displayName",
      "email": "mail",
      "externalId": "uid"
    },
    "server":{
      "url": "ldap://ldap-server:1234",
      "searchBase": "dc=domain,dc=fr",
      "searchFilter": "(cn={{username}})"
    }
  },
```
Here, in `profileAttributesFromLDAP` section, we have configured the mapping to get
 - `login`, `username` and `extranalId`from LDAP's `uid`,
 - `displayName`from LDAP's `displayName`
 - `email`from LDAP's `mail`

### 6. Run the application

```
$ node .
```

- Open your browser to `http://localhost:3000`
- Click on 'Log in' (in the header, on the rigth)
- Click on 'Login with ldap account'
- Enter credential from your LDAP account and click 'Submit' to see your LDAP data
