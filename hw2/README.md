# HOMEWORK ONE: PROBLEM 1 - Group 6
### Members: [Jae Yoon Chung](https://github.com/jcdino) and [Chelsea Lau](https://github.com/chelsealau)

### Design:
- **index.html** for structure
- **main.css** for design
- **app.js** for handling the behavior of the interface, involving interaction with the server and update the HTML elements accordingly.

### Section:
- **login** 
    - enter WikiName and password
    - requires correct password to proceed
- **menu direct**
    - menu1: go to history log
    - menu2: go to submit new auction
- **history log**
    - check most recent auction submission of the Wikiname user 
- **set detail**
    - set the max rank that can be given to a choice and the max sum of the ranks
    - if max rank is bigger than the max sum, cannot proceed
    - checks for confirmation before preceeding
- **auction**
    - set a choice with rank
    - a set of a choice and rank can be created or removed
    - the most previous auction result can be seen as a reference to the new submission
    - if rank is higher than max rank, alert user and marks the rank input box red
    - if sum of ranks is higher than max sum, alert user and marks the sum red
    - on submission, if choice name or rank is empty alert user the choices that are empty and stays on page
    - on submission, if the sum of ranks is smaller than the max sum, ask for confirmation to preceed from user 
    - on submission, send the auction submission to the Redis Server to be stored
- **confirm submission**
    - retrive auction submission results from the server to confirm what has been sent
    - if wrong, go to resubmit