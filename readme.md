## 💡 Overview

building a MERN project to learn react and node.js fundamentals.

- Use JWT to authenticate a user.
- Use joi to validate data passed to server.
- Use redux to manage user's state.

## 🚀 Run locally

### Frontend

1. Open the **client** project and type the following command in your terminal

```bash
$ npm install
```

2. Continue with this command after finishing installing all the packages

```bash
$ npm run dev
```

3. Open your browser and navigate to the following path: `http://localhost:5173`

4. Type the following command to stop the dev server

```bash
ctrl + c
```

### Backend

1. Open the **backend** project and type the following command in your terminal

```bash
$ npm install
```

2. Continue with this command after finishing installing all the packages

```bash
$ node index.js
or
$ nodemon index.js
```

3. Open your browser and navigate to the following path: `http://localhost:8080`

4. Type the following command to stop the dev server

```bash
ctrl + c
```

#### Notice

- Make sure that you have mongoose connected to mongodb.

```js
// index.js
// ...
mongoose
  .connect("Change Your mongoDB connection string")
  .then(() => {
    console.log("Connecting to MongoDB...");
  })
  .catch((e) => {
    console.log(e);
  });
// ...
```

## 💻 Tech Stack

### Core Technologies

#### Frontend

- react 18.2.0
- react-router-dom 6.23.1
- react-redux 9.1.2
- redux Toolkit 2.2.5
- axios 1.7.2
- bootstrap 5.3.3

#### Backend

- express 4.19.2
- mongoose 8.4.1
- bcrypt 5.1.1
- cors 2.8.5
- dotenv 16.4.5
- jsonwebtoken 9.0.2
- joi 17.13.1
- passport 0.7.0
- passport-jwt 4.0.1
- passport-local 1.0.0
