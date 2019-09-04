# Capstone Project - Hip to be Square!
Our Capstone Project for HartCode Academy 2019! A site to sign up teams and team members for a crafting charity blitz!  This site uses a Node.js/Express back end and REST API to help manage data services.

![IndexPage](public/images/sitescreenshot.jpg?raw=true "IndexPage")

## Site Author
* **Pamela W Belknap** - HartCode Academy 2019

## Purpose and goals of this site
- To display the leagues, teams, and members for a charity knitting and crocheting drive.
- To sign up teams and members for the drive.

## Audience
- Prospective and current team managers
- Prospective and current knitting and crocheting team members  

- ### What do they want from my site?
- To view the leagues, teams, and members for a charity knitting and crocheting drive.
- To sign up teams and members for the drive.
- To edit team and member information.
- To be able to unregister members and delete a team.
- To access some simple knitting and crocheting patterns to get started with their squares.

## Technologies
- HTML5/CSS3/Bootstrap4
- JavaScript
- jQuery
- AJAX
- REST API
- Node.js

## Server setup and start
This assumes that the user has Node.js installed globally on their machine.

### Installing the Express framework into the application and setting up the folders:

- First, clone or copy project from GitHub down to a folder on your machine.  
- Your folder setup should look like this (folder is an example):

**Main Folder:**  
c:>HipToBeSquare
place the server.js under here

**subfolders under LearningIsFun:**
data (where the JSON data files would be placed)
public (this is your "root" directory)

**subfolders under public:**
css (your styles.css)
images (any images)
scripts (your js scripts other than server.js)

- Go to your Command Prompt
- Under your folder for the application, install the Express framework using NPM by typing:
> npm install express --save <enter>

- Then you'd install the body-parser package using NPM by next typing:
> npm install body-parser --save <enter>

- Now, you'd start the server by typing:
> node server.js <enter>

- You will get a response saying:
**App listening at port 8081**

- To view your page in the browser, you would go to:
http://localhost:8081/

## Acknowledgments

* Dana Wyatt (for her fantastic instruction on JavaScript, jQuery, and all things coding!)
* Rob Frenette (for being a great instructor, and for his instance on standards of excellence.)
* Denise Fraser (for checking in with us, arranging for visitors, and being a great manager!)
* Renisa Sizer (for checking in with us, and arranging for visitors)
* Franca Lewis (for supporting us and arranging for visitors)
* Sudesh Pamidi (for his invaluable help!)
* Joe Rybczyk (for paving the way for me to go to HartCode Academy!)


