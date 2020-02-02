# OOP Design Guide Line

## Handling the Question
* **`Communicate`**: A key goal of system design questions is to evaluate your ability to communicate. Stay engaged with the interviewer. Ask them questions. Be open about the issues of your system.
* **`Go broad first`**: Don't dive straight into the algorithm part or get excessively focused on one part.
* **`Use the whiteboard`**: Using a whiteboard helps your interviewer follow your proposed design. Get up to the whiteboard in the very beginning and use it to draw a picture of what you're proposing.
* **`Acknowledge interview concerns`**: Your interviewer will likely jump in with concers. Don't brush them off; validate them. Acknowledge the issues your interviewer points out and make changes accordingly.
Be careful about assumptions: An incorrect assumption can dramatically change the problem.
* **`State your assumptions explicitly`**: When you do make assumptions, state them. This allows your interviewer to correct you if you're mistaken, and shows that you at least know what assumptions you're making.
* **`Estimate when necessary`**: In many cases, you might not have the data you need. You can estimate this with other data you know.
* **`Drive`**: As the candidate, you should stay in the driver's seat. This doesn't mean you don't talk to your interviewer; in fact, you must talk to your interviewer. However, you should be driving through the question. Ask questions. Be open about tradeoffs. Continue to go deeper. Continue to make improvements.


## Design
1. Scope the Problem
2. Make Reasonable Assumption
3. Draw the Major Components
4. Identify the Key Issues
5. Redesign for the Key Issues

## Algorithms that Scale
In some cases, you're being asked to design a single feature or algorithm, but you have to do it in a scalable way.

1. Ask Questiosn
2. Make Believe
3. Get Real
4. Solve Problems

## Considerations
* **`Failures`**: Essentially any part of a system can fail. You'll need to plan for many or all of these failures.
* **`Availability and Reliability`**: Availability is a function of the percentage of time the system is operatoinal. Redliability is a function of the probability that the system is operational for a certain unit of time.
* **`Read-heavy vs. Write-heavy`**: Whether an application will do a lot of reads or a lot of writes implacts the design. If it's write-heavy, you could consider queuing up the writes (but think about potential failure here!). If it's read-heavy, you might want to cache.
* **`Security`**: Security threats can, of course, be devastating for a system. Think about the types of issues a system might face and design around those.
