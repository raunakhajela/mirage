# Mirage
Mirage is a simple application to manage your tasks.

# Requirement
1. [Firebase Account](https://firebase.google.com/)
2. [Node JS and NPM](https://nodejs.org)
3. Code Editor (any)
4. Browser (any not IE)
5. Stable Internet Connection

# How To Setup
1. Edit `src/firebaseConfig.js` and add your firbase credentials and replace `ENTER VALUE HERE` with respected value
    ```js
    export default {
        apiKey: "ENTER VALUE HERE",
        authDomain: "ENTER VALUE HERE",
        databaseURL: "ENTER VALUE HERE",
        projectId: "ENTER VALUE HERE",
        storageBucket: "ENTER VALUE HERE",
        messagingSenderId: "ENTER VALUE HERE"
    };
    ```
    Dont know how to get these values? see [this](#Getting-Firebase-Crendentials)

2. Compiling all Code
    ```
    $ npm run build
    ```

**Note:** All code will be compiled and build in `dist/` folder. And to run application, simple open `dist/index.html` file

# Getting Firebase Crendentials
1. Create a Firebase project in the [Firebase console](https://console.firebase.google.com/).

    + If you don't have an existing Firebase project, click **Add project**, then enter either an existing Google Cloud Platform project name or a new project name.
    + If you have an existing Firebase project that you'd like to use, select that project from the console
2. From the project overview page in the Firebase console, click **Add Firebase to your web app**. If your project already has an app, select **Add App** from the project overview page.
3. Now copy the code in between `{` and `}` and replace corresponding values in `src/firebaseConfig.js`

# What we will be storing in db
1. Title - string
2. Description - string
3. Due Date - Timestamp
4. Start Date - Timestamp
5. Tasks - Array of objects with 2 keys (name, done)

# Contribution
Feel free to send Pull Requests on this project.

### Rules
1. Pull Request from master branch won't be merged
2. One should commit file(s) with proper commit message

### Scope of contribution
1. Enhancing documentation
2. Adding more features
    + Real time tracking
3. Adding search filters
    + By `regex` match
    + By `start` or `due` date range
    + By percent completed
    + By ending this month
    + By number of `tasks`
4. More responsive UI
5. Setting Firebase from web (if possible)


### Developer Friendly Commands
1. **npm run serve** - serving for development purpose
2. **npm run lint** - linting and checking for errors

# License
**Mirage** is licensed under [MIT License](https://github.com/tbhaxor/mirage/blob/master/LICENSE)