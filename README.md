# Mirage ![](https://img.shields.io/badge/Version-0.1.0b1-orange.svg?longCache=true&style=popout-square) ![](https://img.shields.io/badge/Production%20Status-Stable%2FBeta-green.svg?longCache=true&style=popout-square) ![](https://img.shields.io/badge/Platform-Cross%20Platform-blue.svg?longCache=true&style=popout-square)
> Damn easy To do manager web app for personal use only

**_Mirage_** is an slimline and damn easy web application to manage all your To Dos. I works on [Firebase](https://firebase.google.com) Database. 

Since its a web app, you can use it on any device (in mobile phone) that has browser.

**Note:** [Here](https://tbhaxor.me/mirage/test) is the link of how live demo of _Mirage_. Let it be clear, if you see any bad/abussive content plz do report or delete for FOSS community. Prior concern: that was not added by my

# Features
1. No need of backend server. Firebase Credentials are sufficent
2. Fast
3. Elegant Look
4. Once built, can be used on any device with any browser (i am not sure it it will be compatible with IE)
5. Cross Platform
6. Progress Tracking
7. One time config

# Screen Shots
## Home
![image](https://user-images.githubusercontent.com/28386721/46574499-f3be3480-c9c1-11e8-838f-30b121d4c780.png)
## Viewing particular To Do
![image](https://user-images.githubusercontent.com/28386721/46574507-08023180-c9c2-11e8-9f73-8527146a3f88.png)

# Requirement
1. [Firebase Account](https://firebase.google.com/)
2. [Node JS and NPM](https://nodejs.org)
3. Code Editor (any)
4. Browser (any not IE)
5. Stable Internet Connection

# How To Setup
_Before setup make sure you have `node` and `npm` in your path_
1. Install vue cli
   ```
   $ npm i -g @vue/cli
   ```
2. Edit `src/firebaseConfig.js` and add your firbase credentials and replace `ENTER VALUE HERE` with respected value
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
    Dont know how to get these values? see [this](#getting-firebase-crendentials)

2. Compiling all Code
    ```
    $ npm run build
    ```
3. Run application, simple open `dist/index.html` file
**Note:** All code will be compiled and build in `dist/` folder

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
