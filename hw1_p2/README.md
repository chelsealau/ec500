# HOMEWORK ONE: PROBLEM 2 - Group 6
### Members: [Jae Yoon Chung](https://github.com/jcdino) and [Chelsea Lau](https://github.com/chelsealau)

### Design:
- **batch_Submission.html** html for inputing users and ranks, and print groupings
- **findGroupings.html** html for details(max sum, max rank, # of users, group size) input
- **main.css** for design
- **batch_Sub.js** for handling the behavior of the interface, involving interaction with the server and update the HTML elements accordingly.

### Section:
- **login** 
    - enter WikiName and password
    - requires correct password to proceed
- **set detail**
    - set the max rank that can be given to a choice and the max sum of the ranks
    - if max rank is bigger than the max sum, cannot proceed
    - checks for confirmation before preceeding
    - click button SET to move on
- **auction**
    - click button INPUT MATRIX to start the input
    - each row has input for user and ranks given by user
    - ranks should be inputed with a comma in between
    - the rank for itself should be input as zero
    - click button SUBMIT to get grouping
- **grouping**
    - creates an array of all the possible groups
    - group users according to the max sum of ranks
    - if remaining # of users not fit group size, group the rest together 