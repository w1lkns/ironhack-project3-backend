# BrainBounce 🧠


## Description

Brainbounce is an online learning platform that democratizes education by making it accessible to everyone, everywhere, much like Udemy. It offers a wide variety of courses across diverse fields such as technology, business, arts, language, and personal development. Designed for self-paced learning, Brainbounce hosts expert-led courses that range from beginner to advanced levels. With Brainbounce, you can learn at your own rhythm, track your progress, and engage with instructors and peers. Whether you're seeking professional development or personal enrichment, Brainbounce provides the tools and resources you need to achieve your learning goals. 

## Getting Started
Clone the repository to your local machine and run npm install to install all the dependencies mentioned in the package.json file.

```bash
git clone https://github.com/w1lkns/ironhack-project3-backend.git
cd ironhack-project3-backend
npm install
```

## Running the Application
Use the following commands to run the application:

To start the application:
```bash
npm start
```
To build the application:
```bash
npm run build
```
To test the application:
```bash
npm run test
```

## MVP (DOM)

- User authentication and authorization
  - Log in and sign up
  - Google, Amazon anf Facebook log in option
  - Email verification after signing up
  - Forget password option
  - Profile image and nick name personalization
- For Lecturer: Upload new courses and chapters
- For User: 
  - Browse, buy and learn courses 
  - Track course learning progress
  - Add courses to wishlist
- User-friendly and visually appealing interface

## Backlog
- Personalized course recommendation based on tags and interests

## Data Structure

```bash
├── README.md
├── app.js
├── config
│   ├── app-config.json
│   └── index.js
├── db
│   └── index.js
├── error-handling
│   └── index.js
├── lib
│   └── cognitoAuth.js
├── middleware
│   └── jwt.middleware.js
├── models
│   ├── Chapter.model.js
│   ├── Course.model.js
│   ├── Lecturer.model.js
│   ├── Review.model.js
│   ├── User.model.js
│   └── Wishlist.model.js
├── package-lock.json
├── package.json
├── routes
│   ├── auth.routes.js
│   ├── chapter.routes.js
│   ├── course.routes.js
│   ├── index.routes.js
│   ├── lecturer.routes.js
│   ├── review.routes.js
│   └── user.routes.js
├── seeds
│   ├── seedCourses.js
│   ├── seedLecturers.js
│   ├── seedTags.js
│   └── seedUsers.js
├── server.js
└── uploads
```


## Links

### Git
URls for the project repo and deploy

Frontend Repo: [https://github.com/Cocalynn/ironhack-project3-frontend](https://github.com/Cocalynn/ironhack-project3-frontend)

Backend Repo: [https://github.com/w1lkns/ironhack-project3-backend](https://github.com/w1lkns/ironhack-project3-backend)

Frontend Deployment: [https://friendly-hare-pea-coat.cyclic.app/](https://main--harmonious-starburst-2c594b.netlify.app/)

Backend Deployment: [https://adorable-bear-coat.cyclic.app](https://adorable-bear-coat.cyclic.app)

### Slides
URls for the project presentation (slides)


### Main Dependencies: 
- Express.js: The server for handling and routing HTTP requests
- Mongoose: A MongoDB object modeling tool designed to work in an asynchronous environment.
- JSON Web Tokens (jsonwebtoken & express-jwt): An open, industry standard RFC 7519 method for representing claims securely between two parties.
- Axios: Promise-based HTTP client for the browser and node.js.
- Stripe: A set of tools for building and running an internet business. It helps with handling payments and managing businesses online.
- Multer: A node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
- Morgan: HTTP request logger middleware for Node.js.
- Cookie-parser: Parse Cookie header and populate req.cookies with an object keyed by the cookie names.


### Contact: 

If you have any questions, feel free to open an issue in this repository.

Enjoy using Brainbounce!
