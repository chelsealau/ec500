# HOMEWORK ONE: PROBLEM 0
### Members: JaeYoon Chung and Chelsea Lau

### Design:
Our code is broken up into 3 files: an HTML file for structure, a CSS file for design, and a JavaScript file for handling the behavior of the interface, which involves interacting with the server and updating the HTML elements accordingly. 

The first page of our interface prompts the user to login with a username and password, the password being each student's assigned password. The password is salted and hashed and a request is made to the server to validate the password. If the request is made successfully, meaning the password is valid, the user will be brought to the next page which includes a command line and output screen. If the command inputted is one accepted by the class server REDIS, the server response will be shown on the output window. 

The user can either hit the **ENTER** key or click **SUBMIT** to submit their command. The **ENTER** key can also be used for login.

**CLEAR** can be used to clear the output history. 
