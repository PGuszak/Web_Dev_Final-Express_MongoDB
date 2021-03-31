# Orbit Code Collaboration Platform

This is the repository for the Orbit Code Collaboration Platform, a social media platform with the intention of sharing code with fellow users, similar to the likes of Github or BitBucket. The website will be more focused on the networking aspect as opposed to the code sharing with features such as visible work history, education and friends similar to LinkedIn.

NodeJS, Express, and MongoDB Implementations:  

## File Structure
```
+-- controllers/
|     +-- errorController.js
|     +-- homeController.js
|     +-- usersController.js
+-- models/
|	  +-- user.js
+-- node_modules/
+-- public/
|     +--css/
|	  +--images/
|	  +--js/
+-- views/
|     +-- error.ejs
|     +-- home.ejs
|     +-- layout.ejs
|     +-- signin.ejs
|     +-- signup.ejs
|     +-- userPage.ejs
+-- main.js
+-- package.json
+-- package-lock.json
+-- README.md <- You are here
+-- seed.ejs
```
## Display Design Choices

To start with our project uses four main pages for display, those being sign up, sign in, a user page and a homepage. These are all currently mock ups to give an idea of final design, with the emphasis on user page customization for sharing projects as well as previous experience. The main homepage as a complement will feature feeds from other users as well as other people's projects, selected based on who you follow or are friends with. The overall color scheme is focused on a rich blue and white to match the custom made logo which can be found in the images directory.

As for technologies used there were only a couple.  The main was the normal HTML5 styles, CSS3 customization and bootstrap libraries.  From these specifically the main technologies and implementations used were flex containers and fluid containers for simple but flexible designs. For the pictures and icons we used the icon library from fontawesome to get good icons that can be used as buttons and convey ideas as well as having nice form and design.

All pages are responsive to screen sizes and there is good formatting so information and content is not to cluttered for user experience.  There are some unique features as well for this assignment.  For the responsiveness there are menus and header bars that will collapse and disappear for best user experience based on screen size.  

Using the HTML checker for errors there are no errors that are harming the working functionality and is clear.  Please contact Paul if there are questions about future/current errors in HTML checker for explanation.

## NodeJS, Express and MongoDB Design Choices

To start with, the navigation bar is only present on the homepage and error pages, as we felt design wise it didn't match much sense to have a user be able to use a navigation bar if they aren't signed in. Thus, the sign in and sign up pages only display the required inputs for doing each of those functions. The nav bar is templated to be present on every page except for those two.

npm seed can be used to run seed.js which will populate the mongoose database with a few starting records as well as clearing any previously entered ones. 

Error templating also shows a default page with a nav bar on page not found (404), but a blank page with just the error code on all other errors such as an internal server error (500). 

Clientside validation is done the sign up form to make sure all required fields are filled out. Those that are required are highlighted in red, page will update with an error message if a field isn't filled or is filled out improperly (i.e passwords don't match).

## EXTRA FEATURES
  This version there are extra styles for better UI experience. On the signup page there are red highlights for better user experience.  This meaning there are red highlights to indicate which of the fields are required for sign up and to explicitly show the ones that are not required.  And the fields that are optional are in black/grey. As well as some simple touches added in to show responsiveness to the whole page. When a entry box is selected the barrier and color become more apparent when selected. As well as when the cursor from the user hover overs the user entry box the box will highlight in its specific color to show prominence.

## To Run

Download the repository into a particular folder and make sure npm is installed.

From there once in the repository run the commands:
npm install
npm start  

From there the website will be running on localhost at port 3000.

## Current Responsibilities

Cesar Ramirez - Logo and Overall Design, User Page (accompanying JS and CSS), Sign in (Routing and Templating).

Paul Guszak - Sign Up (accompanying JS and CSS), Sign in (accompanying JS and CSS), Homepage, Sign Up (Routing and Templating), MongoDB

Gabriel Jones - Documentation and Report, Seeding, Error Templating
## Credits
@CeRaTech (2021 - )
