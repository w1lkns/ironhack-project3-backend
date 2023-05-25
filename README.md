# BrainBounce 🧠


## Description

Brainbounce is an online learning platform that democratizes education by making it accessible to everyone, everywhere, much like Udemy. It offers a wide variety of courses across diverse fields such as technology, business, arts, language, and personal development. Designed for self-paced learning, Brainbounce hosts expert-led courses that range from beginner to advanced levels. With Brainbounce, you can learn at your own rhythm, track your progress, and engage with instructors and peers. Whether you're seeking professional development or personal enrichment, Brainbounce provides the tools and resources you need to achieve your learning goals. 

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



### Library resource: 

