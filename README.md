# GroupProject_jsonStatham_API

<h2>Campfire:</h2>
<h3> Group Members: Pedro Cantu, Stefan Hristov, Mustafa Ramadan, Heejun You </h3>

Deployment Link: https://campfire-ui.herokuapp.com/

**As per any authenticated user web application, a user must sign-in to create their own contacts to see all necessary functionality.**

<b>API Repository:</b> https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_jsonStatham_API

<b>UI Repository:</b> : https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_jsonStatham_UI

Our group project is called <b>Campfire</b>. The purpose of this web application is for a user to log into the webapp, and be able to add "contacts" into their personalized address book, and specify the frequencies of reconnecting with said contacts. The web application provides an actionable dashboard with reminders to reconnect with contacts and keep relationships fresh and strong. The application supports the standard CRUD (Create, Read, Update, and Delete) operations when the user manipulates contact data. The basis of this project was inspired by PRO MERN Stack by Vasan Subramanian which was a separate project implemented [here](https://github.com/Stefan-H-H/Issue-Tracker).

## Final Screenshots of Campfire Project

<b>The Welcome page prior to signing in. And if not signed it, will not allow the user to access the Dashboard/ Contacts page.</b>
![](/ReadmeImages/Welcome2.png)

<b>The Dashboard page where a user can view the upcoming contacts based on urgency (date).</b>
![](/ReadmeImages/Dashboard2.png)

<b>The Dashboard page where a user can filter our contacts via urgency (date).</b>
![](/ReadmeImages/DashboardFilter2.png)

<b>The Contacts page where a user can view all of their contacts.</b>
![](/ReadmeImages/Contacts2.png)

<b>The Contacts page where a user can drill down into a specific contact revealing additional details of the selected contact.</b>
![](/ReadmeImages/ContactsDetails2.png)

<b>The Contacts page where a user can filter out contacts according to the filters allowed.</b>
![](/ReadmeImages/ContactsFilter2.png)

<b>The Contacts page where a user can delete/ restore selected contacts. </b>
![](/ReadmeImages/Delete2.png)

<b>The Contacts page where a user can activate/deactivate a selected contact. </b>
![](/ReadmeImages/Toggle2.png)

<b>On the navigation bar, the plus icon allows a user to add a contact to their contact book.</b>
![](/ReadmeImages/Add2.png)

<b>On the navigation bar, the search bar allows the user to search according to contact name or company.</b>
![](/ReadmeImages/Search2.png)

<b>The user has the ability to edit a contact's information including but not limited to reminder frequency, next contact date, etc.</b>
![](/ReadmeImages/Edit2.png)

## Iteration 3.0:

Deployment Link: https://campfire-ui.herokuapp.com/
**As per any authenticated user web application, a user must sign-in to create their own contacts to see all necessary functionality.**

Repository Links:
 - [API](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_jsonStatham_API)
 - [UI](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_jsonStatham_UI)
 
  #### Work completed for Iteration 3:

 1. Has a user friendly, polished CSS styling.
 1. The dashboard also renders ContactDetail on select.
 1. Have a glyphicon associated with the LinkedIn profile upon rendering `ContactDetail`, instead of displaying the whole link.
 1. Deactivating the contact clears out the nextContactDate field even if the contact's contactFrequency is set as Custom. Currently, the nextContactDate clears out on deactivation with all other options for contactFrequency, but not with Custom.
 1. The Welcome page lets the user know that he needs to be signed in to use any functionalities or be redirected to other pages. e.g. Toast message.
 1. Clean up the code to remove any comments made for development purposes, and template components/components.
 1. Add phone number validation, either by a third party library or a regex check.
 1. Toast message for deletion shows a name of a contact instead of the id of a contact.

  #### Contributions:
 Please note that contributions were a team effort, and we've had numerous multiple hour long team coding/meeting sessions to troubleshoot and/or implement functionalities of our application. As such, commit history may not be the best representation of contributions. Below is listing of contributions broken down by individual in which they were the predominant contributor.
 
- **Pedro Cantu de la Garza**:
    - Implemented a user friendly, polished CSS styling.
    - Deactivating the contact clears out the nextContactDate field even if the contact's contactFrequency is set as Custom. Currently, the nextContactDate clears out on deactivation with all other options for contactFrequency, but not with Custom.
    - Add phone number validation, either by a third party library or a regex check.
 - **HeeJun You**:
    - Clean up the code to remove any comments made for development purposes, and template components/components.
    - Installed an external react fontawesome package and applied the icon image to the linkedin button.
    - Assisted in reconfiguring the Heroku application to a unique domain name
 - **Mustafa Ramadan**:
    - The Welcome page lets the user know that he needs to be signed in to use any functionalities or be redirected to other pages. e.g. Toast message.
    - Reconfigured the Heroku application to a unique domain name
    - Updated Readme for Iter3
 - **Stefan Hristov**:
    -  Implemented a user friendly, polished CSS styling.
    -  Toast message for deletion and restore shows a name of a contact instead of the id of a contact.
    -  Clean up the code to remove any comments made for development purposes, and template components/components.
    -  Have a glyphicon associated with the LinkedIn profile upon rendering `ContactDetail`, instead of displaying the whole link.
    -  The dashboard also renders ContactDetail on select.
    -  Implemented NavBar to be mobile responsive

---

## Iteration 2.0:

Deployment Link: https://campfire-ui-mustafaramadan.herokuapp.com/  
**As per any authenticated user web application, a user must sign-in to create their own contacts to see all necessary functionality.**

Repository Links:
 - [API](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_jsonStatham_API)
 - [UI](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_jsonStatham_UI)
 
 
 ![Iteration2 - Welcome Page](/ReadmeImages/WelcomePage.png)
 
 ---
 
 ### Progress:
 
 The significant modifications/improvements as part of iteration 2.0 are as follows:
 1. Persistent user sessions, and corrected CRUD APIs to utilize logged in user information to correctly only access data belonging to said user.
 2. The Dashboard now has date filter that allows the user to filter contacts by upcoming `nextContactDates` ranging from contacts that they should contact today, to those they should contact up to 30 days from today.
 3. The web application now has Welcome landing page.
 4. Route redirection is now implemented upon sign-in and sign-out. Additionally, available routes are restricted based on the user's signed-in status.
 
 Please note that a listing of the GraphQL queries and mutations can be found in the [graphQL.md](/graphQL.md) file.
 
 #### Upcoming things to work on:

 For iteration 3, we're considering to extend the functionality of the app such that:
 1. Has a user friendly, polished CSS styling.
 1. A call to the `updateContact` API resolver also captures the user info to enhance security to the API post request.  
 Currently, a user's info is used for READ operations only to display user specific contacts. Since the user can only perform an UPDATE operation to the contacts shown on the UI, the UPDATE operation behaves without errors. However, it is possible to update any contacts in the database if the request is made directly to the backend.
 1. The Back button on the Edit page redirects the user either to the Dashboard or the Contacts page depending on their history.  
 Currently, it always takes the user back to the Contacts page.
 1. ~~The dashboard also renders ContactDetail on select.~~
 1. ~~Have a glyphicon associated with the LinkedIn profile upon rendering `ContactDetail`, instead of displaying the whole link.~~
 1. ~~Deactivating the contact clears out the nextContactDate field even if the contact's contactFrequency is set as Custom. Currently, the nextContactDate clears out on deactivation with all other options for contactFrequency, but not with Custom.~~
 1. ~~The Welcome page lets the user know that he needs to be signed in to use any functionalities or be redirected to other pages. e.g. Toast message.~~
 1. Clean up the code to remove any comments made for development purposes, and template components/components.
 1. ~~Add phone number validation, either by a third party library or a regex check.~~
 1. ~~Toast message for deletion shows a name of a contact instead of the id of a contact.~~
 
 #### Contributions:
 Please note that contributions were a team effort, and we've had numerous multiple hour long team coding/meeting sessions to troubleshoot and/or implement functionalities of our application. As such, commit history may not be the best representation of contributions. Below is listing of contributions broken down by individual in which they were the predominant contributor.
 
- **Pedro Cantu de la Garza**:
     - Implementation of "User Sessions", including, but not limited to:
        - Changing the mock data supplied to the database;
        - Modification of the existing  *Contact List API* to use signed-in user email information to query only the contacts belonging to said user.
        - Determination of appropriate propogation of UserContext through the React Component hierachy.
        - Implemented persistent user session behavior in the Contacts view.
    - Implemented redirection behavior to Dashboard view upon sign-in, and Welcome view upon sign-out.
    - Assisted in modifying Contact List view to allow for warning-free unmounting component behavior upon redirection.
    - Assisted in troubleshooting the searchbar behavior to properly reflect the change in incorporating user sessions.
 - **HeeJun You**:
    - Implementation of a `DateFilter.jsx` component in the UI for the Dashboard view, to allow the user to filter upcoming dates `nextContactDate` of contacts the user should be following up with.
    - Add Contact behavior modified such that signed in user email information is logged and used to create a databas record of an added contact using the user email so it may be properly indexed.
    - Changed default values of `ContactInput` schema.
    - Refactoring the existing code in which dates are generated for the `nextContactDate` so that it can properly propagate the filtering of the dates that comes from `DateFilter.jsx`'s dropdown menu, to `Dashboard.jsx`'s vars, ultimately to a call to the `listContact` API resolver.
 - **Mustafa Ramadan**:
    - Responsible for configuration settings/ Google developer console modifications and appropriate deployment to Heroku.
    - Modified Dashboard view to utilize signed-in user information and show data owned by the user.
    - Modified Dashboard view to render no contacts when the user is signed-out
 - **Stefan Hristov**:
    - Created new Welcome component and landing page and route, along with appropriate CSS styling.
    - Modification of available website routing and redirection behavior  when the user is signed-in vs. signed-out.
    - Ensured a responsive in-time rerendering of a `ContactDetail` on toggling behavior.
    - Assisted in modifying Contact List view to allow for warning-free unmounting component behavior upon redirection.
    - Assisted in troubleshooting the searchbar behavior to properly reflect the change in incorporating user sessions.
---

<h2> Iteration 1.0: </h2>

#### Build and Run Instructions:
To run and test our Iteration 1.0 application, please perform the following:
 - Clone both the [API](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_jsonStatham_API) and the [UI](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_jsonStatham_UI) repositories to local machine.
 - Please note that we have provided `sample.env` files in both the *API* and *UI* repositoires with the appropriate endpoint configurations necessary to run the application. Rename these files to `.env` in order for the applications to run properly.
 - Navigate into the UI and API and run `npm install` in each to install all necessary dependencies
 - If running on a Mac OS, open two terminal windows:
    - In the first navigate to the *API* directory and run `npm start` to start the API.
    - In the second navigate tothe *UI* directory and run `npm run dev-all`
- If running on a Windows OS, open **three** terminal windows and execute in order:
    - In the first, navigate to the *API* directory and run `npm start` to start the API.
    - In the second, navigate to the *UI* directory and run `npm run watch-server-hmr` to watch files in the UI for hot module replacement recompilation.
    - In the third, navigate to the *UI* directory adn run `npm start` to start the UI.

Following these steps, you should be able to explore our web application and perform the basic CRUD operations.

---

<b>In this iteration, the following was implemented. </b>

The user has the ability to perform CRUD operations in this webapplication which will be defined below.

- <b>Create:</b> The user once logged in has the ability to to create a contact on the top right (plus) icon of the navigation bar, and this will render a popup page which allows the user to input field such as name, as well as a required 1 of 3 contact information pieces (email, phonenumber, or linkedin). Each of these contact information fields have an implemented validation that must occur when the user inputs the data. For example, the linkedin field must require an input that contains the string "linkedin". Once the user creates the contact, it will render the edit page specific to that contact id created, and the user now has the ability to further add in more information and set a frequency date. The contact will now be set as "active" and the "last contact date" will be set as the date it was created.

- <b>Read:</b> The user can view all of their contacts in the Contacts tab on the navigation bar. Upon this display, the user can view their contacts view all the field names described in our schema. These field names include: Name, Company, Title, Frequency, Email, LinkedIn, Priority, Familiarity, Context, Active Status.

- <b>Update:</b> The user has the ability to access all contacts in their personalized contact book from the Contacts tab on the navigation bar. Once doing so, each contact will display an edit button to the right of their name, and by the user clicking on the edit button, the user will now have that chosen contacts edit page rendered on the screen. Any of the contacts fields can now be manipulated and resaved.  
There's a considerable amount of logic involved in setting the nextContactDate for a specific contact, as it is a function of the activeStatus of the contact, contactFrequency the user selects, and the lastContactDate of the contact.
  1. If there's no change in the already active status, set next date based on the last date.  
    Do check if the newly set next date is in the past (from today's date) and if is, set the next date based on today's date.
  1. If there's no change in the inactive status, don't do anything.
  1. If the active status goes from inactive to active, set next date based on today's date.
  1. If the active status goes from active to inactive, clear the nextContactDate.
  1. Let the user choose a custom date he wants overriding the newContactDate that would be set from lastContactDate.

The images below illustrate the contact details of an active status vs an inactive status (view the next contact date)

![](/ReadmeImages/ContactDetailsActive.png)

![](/ReadmeImages/ContactDetailsInactive.png)


- <b>Delete:</b> On the Contacts tab of the navigation bar, the user has the ability to delete any contact they no longer want. This can be done in the far right column on the Contacts page, i.e. Edit column. In the "Edit" column, the user will find an "Edit" button, an "Active/Inactive" Toggler, and a "Delete" button. The delete button when clicked will prompt a Toast message if a succesfful deletion of the contact occured. Also, similarly to delete, our web application implements an active status for each user. This allows the user to filter on contacts they still consider "active" and are wanting to reconnect with. Thus, the active/inactive toggler will update the specified contacts active status which in turn if "inactive" will set the "Next Contact Date" to null.

In addition to the CRUD operations, our web application is set up as follows. The navigation bar currently contains 4 tabs:
- <b>Home page:</b> redirects to the Dashboard page

- <b>Dashboard:</b> Disclaimer- Not fully implemented. But the idea is that the user's upcoming reminders (which could be remidners that are occuring within the week or day) will render on the Dashboard page. And upon clicking on the Reconnect button, this will reset the "Last Contact Date" to the present day the "Reconnect" button was clicked and reupdate the "Next Contact Date". And allows the user to update any information on that specific contact. This in turn will likely render that contact off of the dashboard page as the dashboard page assesses the upcoming contacts based off of "Next Contact Date".

![](/ReadmeImages/Dashboard.png)

- <b>Contacts:</b> Includes all of the user's contacts they've set on this page. The page render 10 contacts at a time, and a next/prev navigation button is located on the button of the page. The contacts page displays the user's contacts according to fields described above. In addition to the display as well as interactivity from the user in the form of the "Edit" button, "Active/Inactive Toggler", "Delete" button, the user has the ability to also filter which is found directly underneath the navigation bar. The user can filter via Active Status (Active/Inactive), Priority (Low, Medium, High), Frequency (Weekly, Biweekly, Monthly, Quarterly, Biannual, Yearly, Custom) and Familiarity(Familiar, Unfamiliar, Intimate, Meaningful). Once applying those filter, a subset of the contacts book will render on the screen of the Contacts page. The user has the ability to reset the filters to none (full contacts page rerenders).


![](/ReadmeImages/ContactsTab.png)

<b>Interactive Functions Summary: </b> 
- A search bar is implemented on every page which allows the user to query based off of the contact fields: name, company. As seen below:

![](/ReadmeImages/Search.png)

- A filter is implemented on every page which allows the user to filter by Active Status, Priority, Frequency and Familiarity As seen below:

![](/ReadmeImages/Filter.png)

- Add contact operation when signed in. As seen below:

![](/ReadmeImages/AddContact.png)


- Reconnect with a contact on the Dashboard which updates the LastContactDate to the day the reconnect button was clicked, and updates the NextContactDate based off the frequency provided for the contact.

- Edit contact operation on Contacts page. As seen below:

![](/ReadmeImages/EditPage.png)

- Toggle the active status of a specific contact on Contacts page
- Delete a contact on the Contacts page

<b>Upcoming things to work on:</b> Report page (might get repurposed), setting the database with user priveledges on their subset of the data, login page, etc.

Current 3rd party libraries used:  
- Implementing the use of a React toggler for our active/inactive status of the contact: http://aaronshaf.github.io/react-toggle/ 
