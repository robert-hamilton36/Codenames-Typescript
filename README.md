# Typescript-React-Express-Boilerplate

# Host
[Spywords](spywords-ts.herokuapp.com)

# About
An online recreation of the popular tabletop game codenames, using Typescript, React and Firebase
This project started with the goal to learn and apply typescript, I also decided to learn to use react context instead of the previously used Redux
Beyond the challenge of using typescript, I also dove into unit-testing, using react-testing-library and jest, something which I had only dabbled in previously

If i was to redo this now, while I would tweak the architeture and add modals for user input, and include socket.io( or paid firebase live connection) to handle the disconnection and reconnection of players. The main thing I would implement would be an error handler. With my improved use of typescript, and with data validation (user input and api calls) with error handling, i'd create a smooth error free codenames experience.

The biggest take away from this project has been typescript and the usefulness of unit testing, two things that I have used in all projects since. Looking back on the project now, another big take away for me is scope, I have a tendency to just jump into projects with all sort of ideas of what to add next, while I generally don't have

# Local Setup
1. Clone Repo
    `git clone https://github.com/robert-hamilton36/Codenames-Typescript`
2. `npm i`
3. Create an .env file based of .env-example: `cp .env-example .env`
4. Create a firebase app. [Following step 1] (https://firebase.google.com/docs/web/setup?authuser=0)
5. Copy Firebase config variables [from step 3] (https://firebase.google.com/docs/web/setup?authuser=0) into the .env file
