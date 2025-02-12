#### **EBUDDY PTE. LTD. Technical Test**

There are 3 technical coding tests and 1 personality and knowledge test.

#### **Part 1: Backend Setup**

1. Create a Backend Repository
   - Repository Name: backend-repo
   - Framework: Express.js
   - Setup: Initialize Firebase SDK in your project.
2. Directory Structure
   - Create the following folders: routes, controller, middleware, config.
3. Endpoint and Middleware Creation
   - Endpoint Name: update-user-data
     1. Functionality: Updates Firestore data in the USERS collection.
   - Endpoint Name: fetch-user-data
     1. Functionality: Fetch Firestore data in the USERS collection.
   - Middleware: Create a simple authMiddleware to validate the request token.
   - **Both endpoint should have the same User Object interface**

Example Directory Structure and Code:  
backend-repo/  
├── config/  
│ └── firebaseConfig.ts  
├── controller/  
│ └── api.ts  
├── core/  
│ └── app.ts  
├── entities/  
│ └── user.ts  
├── middleware/  
│ └── authMiddleware.ts  
├── repository/  
 | └── userCollection.ts  
├── routes/  
│ └── userRoutes.ts  
└── package.json

####

#### **Part 2: Frontend Setup**

1. Create a Frontend Repository
   - Repository Name: frontend-repo
   - Framework: Next.js
   - UI Library: React MUI
2. Directory Structure
   - Create the following folders: apis, components (atomic design structure), store,theme,app.
3. Setup Redux
   - Configure Redux for state management.
4. Setup and configure basic React-MUI Theme.
5. Setup Firebase auth login and create a basic Logic Form
   - Your Logic Form needs to be mobile responsive with the help of React MUI configuration
6. Use App Router (Next.js 14+) to navigate between login and main page
7. Button and update data API Integration
   - Button: Create a button to fetch and display user information
   - API Abstraction: Ensure proper abstraction for API calls.
   - State Management: Use Redux to manage and display the state of the update process, including loading, success, and error messages using Typography.
8. Make FE repo able to test API calling locally using Firebase Emulator if I  
   run npm run build && firebase emulators:start \--only functions on BE repo

### Example Directory Structure and Code:

frontend-repo/  
├── apis/  
│ └── userApi.ts  
 | └── user.ts  
├── theme/…  
├── app/…  
├── components/  
│ └── UpdateButton.tsx  
├── store/  
│ ├── actions.ts  
│ ├── reducers.ts  
│ └── store.ts  
└── package.json

**Part 3: Monorepo setup via Turborepo https://turbo.build/**

Identify what is the shared logics between the FE and BE repo and combine the (FE & BE) together into a monorepo via the Turborepo **framework.** _Hint: The user.ts is one of the common shared objects._

Make sure we are able to run the project using turbo repo.

**Part 4: Bonus Firebase technical questions**

In a Firestore **USERS** collection, each document contains the following keys:

- `totalAverageWeightRatings` (e.g., 4.3)
- `numberOfRents` (e.g., 30\)
- `recentlyActive` (epoch time, e.g., 1738938812\)

For example,

User A {  
 `totalAverageWeightRatings: 4.3,`  
 `numberOfRents: 30,`  
 `recentlyActive:` 1738938812, (7th feb, 2025\)  
 }

User B {  
 `totalAverageWeightRatings: 4.3,`  
 `numberOfRents: 30,`  
 `recentlyActive:` 1738679612, (4th feb, 2025\)  
 }

User C {  
 `totalAverageWeightRatings: 4.3,`  
 `numberOfRents: 28,`  
 `recentlyActive:` 1738679612, (4th feb, 2025\)  
 }

To determine the **most potential user**, we prioritize:

1. **Total Average Weighted Ratings** (highest priority)
2. **Number of Rents**
3. **Recent Activity**

How should we structure a Firestore query that supports pagination to efficiently retrieve the highest potential users? Please include all mathematical formulas used in the query.

The query should return results in the following order: **User A → User B → User C**

**Hint:** db.collection("USERS") .orderBy("totalAverageWeightRatings", "desc") .orderBy("numberOfRents", "desc").orderBy("recentlyActive", "desc") This answer from ChatGPT is wrong, you cannot do pagination with this. Your goal is to **consider all three factors together**, not sequentially. Firestore sorts the documents **hierarchically**, rather than applying a true multi-factor ranking system. Please think out of the box.

How do you ensure that the 'recently active' field in a Firestore document remains updated? Please explain the method you use to keep the data fresh and the reasoning behind your approach.

**Part 5: Personality & technical Questions**  
Please answer truthfully so that we can assign tasks accordingly to your workflow. There is no right and wrong answer for these.

1. What are the most difficult technical problems in your work experience you have encountered and how do you fix them?
2. When you’re working on a project, how do you typically approach it from start to finish?
3. How do you usually approach learning a new topic to absorb as much as possible?
4. “Consistency” vs “fast & efficient”. Choose one.
5. Do you own any Apple products? Like IMac, Macbook, Ipad, Iphone, etc…
6. What is your immediate availability to start this job?

Please submit your monorepo github public repo link to [hello@ebuddy.gg](mailto:hello@ebuddy.gg) when you are done. Bonus for candidates who use clean code and best practices.
