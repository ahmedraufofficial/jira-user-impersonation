export default function routes(app, addon) {
    // Redirect root path to /atlassian-connect.json,
    // which will be served by atlassian-connect-express.
    app.get('/', (req, res) => {
        res.redirect('/atlassian-connect.json');
    });

    app.get("/atlassian-connect.json", (req, res) => { 
      //const isHttps = req.secure || req.header("x-forwarded-proto") === "https";
      return res.status(200).json({ 
        name: "Jira User App", 
        description: "This plugin acts as a user", 
        key: "jira-user-app",
        baseUrl: "https://jira-teams-bot.herokuapp.com", 
        "lifecycle": {
          "installed": "/installed"
        },
          "authentication": {
            "type": "jwt"
        },
          "scopes": [
              "read",
              "write",
              "ACT_AS_USER",
              "ADMIN"
            ],
          "apiMigrations":{
              "signed-install": true,
          },
          "modules": {
              "generalPages": [
                  {
                      "key": "hello-world-page-jira",
                      "location": "system.top.navigation.bar",
                      "name": {
                          "value": "Hello World"
                      },
                      "url": "/hello-world",
                      "conditions": [{
                          "condition": "user_is_logged_in"
                      }]
                  },
                  {
                      "key": "hello-world-page-confluence",
                      "location": "system.header/left",
                      "name": {
                          "value": "Hello World"
                      },
                      "url": "/hello-world",
                      "conditions": [{
                          "condition": "user_is_logged_in"
                      }]
                  }
              ]
          } }); });
    

    // This is an example route used by "generalPages" module (see atlassian-connect.json).
    // Verify that the incoming request is authenticated with Atlassian Connect.
    app.get('/hello-world', (req, res) => {
        // Rendering a template is easy; the render method takes two params: the name of the component or template file, and its props.
        // Handlebars and jsx are both supported, but please note that jsx changes require `npm run watch-jsx` in order to be picked up by the server.
        res.render(
          'hello-world.hbs', // change this to 'hello-world.jsx' to use the Atlaskit & React version
          {
            title: 'Atlassian Connect'
            //, issueId: req.query['issueId']
            //, browserOnly: true // you can set this to disable server-side rendering for react views
          }
        );
    });

    // Add additional route handlers here...
}
