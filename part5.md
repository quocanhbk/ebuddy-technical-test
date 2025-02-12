# Part 5: Personality & technical Questions

### Question 1: What are the most difficult technical problems in your work experience you have encountered and how do you fix them?

The most difficult technical problem I have encounted is to migrate a notification system from using for one platform to using for all platforms in the ecosystem. I have to make sure that the system is scalable and works well for all platforms.

I update the system to become a standalone service, the system will receive events from the other services through Redis and Kafka.

The system then will broadcast the notification to the users through WebSocket and store the notification to the database.

Another difficult problem is to implement a referral system with a reward system. The point is the referrer will get a reward whenever the user they referred register an account or reach a certain rank.

The problem is to make the system scalable and efficient and to make sure the reward is distributed correctly and will not be missed. I implemented a queue system to handle the reward distribution. Whenever the user register an account or reach a certain rank, the system will add a job to the queue to distribute the reward. This way, the system can handle a large number of users and the reward is distributed correctly and will not be missed.

### Question 2: When you’re working on a project, how do you typically approach it from start to finish?

1. **Initial Analysys and Planning**

- Gather and understand all the requirements from the client
- Define clear goals and objectives for the project
- Break down the project into smaller tasks
- Create a realistic timeline with milestones for the project

2. **Design and Architecture**

- Choose the appropriate tech stack for the project
- Design the system architecture and database schema
- Create high-level architecture diagrams

3. **Implementation**

- Develop the code for each task
- Ensure code quality and maintainability
- Implement testing and debugging
- Document the code

4. **Testing and Validation**

- Test the code thoroughly
- Validate the code against the requirements
- Make sure the code is working as expected
- Perform optimization and refactoring if necessary

5. **Deployment and Maintenance**

- Deploy the code to the production environment
- Monitor the system performance
- Perform maintenance and updates
- Gather feedback from the users and improve the system

### Question 4: “Consistency” vs “fast & efficient”. Choose one.

I will stick to consistency.

### Question 5: Do you own any Apple products? Like IMac, Macbook, Ipad, Iphone, etc…

Yes, I own an iPhone, a Macbook Pro, an iPad Air and an iPad Mini.

### Question 6: What is your immediate availability to start this job?

I can start the job on February 24th, 2025.
