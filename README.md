# Atlassian Connect App for user impersonation

An Atlassian Connect App to impersonate users on a Jira Cloud Tenant.

## Setup
Follow the default Atlassian Connect Express App deployment and installation on Jira.
The guide is [here](https://www.npmjs.com/package/atlassian-connect-express).

## What's next?

### Create token
> You can get these values also once app is installed on Jira Tenant, but here is a workaround function incase you can't access the logs on deployment
https://github.com/ahmedraufofficial/jira-user-impersonation/blob/09a5309edf168ed677697a9cb5fe8eabf699facb/app.js#L101

Here is the sample code for token data
```
const tokenData = {
    "iss": `urn:atlassian:connect:clientid:${data.oauthClientId}`,
    "iat": now.unix(),                  
    "exp": now.add(2, 'minutes').unix(),  
    "sub": `urn:atlassian:connect:useraccountid:userIdToImpersonateOnJira`,
    "tnt": 'https://jiraTenant.atlassian.net',
    "aud": 'https://oauth-2-authorization-server.services.atlassian.com'
  };
```

### Create Jira User Token
> After getting the token data, we can create the user app token to create/access issues on their behalf
https://github.com/ahmedraufofficial/jira-user-impersonation/blob/09a5309edf168ed677697a9cb5fe8eabf699facb/app.js#L133

Here is the sample code for User token data
```
const postToken = (userToken) => {
    const options = {
        'method': 'POST',
        'url': 'https://oauth-2-authorization-server.services.atlassian.com/oauth2/token',
        'headers': {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            'scope': 'READ WRITE',
            'assertion': userToken
        }
    };

    return new Promise((resolve, reject) => {
        request(options, function (error, res, body) {
            if (!error && res.statusCode === 200) {
                resolve(body);
            } else {
                reject(error);
            }
        });
    })
}
```


