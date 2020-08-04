<div align=center>

# Tap Room

#### Pub website, 05.07.2020

#### By **Andrew Philpott**

[About](#About) | [User Stories](#User-Stories) | | [View URLs](#View-URLs) | [API Endpoints](#API-Endpoints) | [Setup/Installation Requirements](#Setup/Installation-Requirements) | [Bugs](#Known-Bugs) | [Technologies](#Technologies-Used) | [Contact](#Support-and-Contact-Details)

</div>

## About

This is a website for the fake restuarant Tap House that allows users to browse the different types of beers offered at the establishment. The application features authentication and authorization to provide exclusive deals to registered customers, update functionality for employees, and full CRUD functionality for admins. Additionally, create, update, and read data transfer objects were made for the beer entity. This project is a work in progress and will include the ability for users to leave reviews on beers.

Log in with the username 'admin', 'employee', or 'member' and password 'test' to view authorization in action.

## User Stories

- As a user, I want to see a list/menu of all available beers. For each beer, I want to see its name, brand, price and alcoholContent.
- As a user, I want to be able to click on a beer to see its detail page.
- As a user, I want to see how many pints are left in a keg.
- As a user, I want a beer to update to say "Out of Stock" once it's empty.
- As a user, I want beers with less than 10 pints to include a message that says "Almost Empty" so I can try a pint before it's gone!
- As a user, I want this application to be nicely styled.
- As a user, I want to have beer prices to be color-coded for easy readability. This should be based on their price.
- As a user, I want to return to the homepage when I try to navigate to a protected route.
- As an employee, I want to have the added functionality of being able
  to incrase
- As an employee, I want to be able to click a button next to a beer whenever I sell a pint of it. This should decrease the number of pints left by 1. Pints should not be able to go below 0.
- As an admin, I want to submit a form to add a new beer to a list.
- As an admin, I want the option to edit a beer's properties after entering them just in case I make a mistake.
- As an admin, I want to be able to delete a beer.
- As an admin, on clicking remove I want a popup notification asking me to confirm that I want to delete a beer from the list.

## View URLs

| URL Path         | Purpose                                  |
| :--------------- | :--------------------------------------- |
| /                | Landing page                             |
| /login           | Form to login                            |
| /register        | Form to register                         |
| /account         | Member exclusive deals                   |
| /beers           | List of beers                            |
| /beers/:id       | Beer details                             |
| /beers/edit/:id  | Form to update beer information          |
| /beers/new       | Form to add a beer to the beer list      |
| /reviews/new     | Form to add a review for any beer        |
| /reviews/:id/new | Form to add a review for a specific beer |

## API Endpoints

| HTTP Method | Endpoint            | Purpose                  |
| :---------- | :------------------ | :----------------------- |
| POST        | /users/register     | Create a user            |
| POST        | /users/authenticate | Authenticate a user      |
| GET         | /users/{id}         | Retrieve a user by id    |
| PUT         | /users/{id}         | Edit a user              |
| DELETE      | /users/{id}         | Delete a user            |
| GET         | /beers              | Retrieve a list of beers |
| POST        | /beers              | Create a beer            |
| GET         | /beers/{id}         | Retrieve a specific beer |
| PUT         | /beers/{id}         | Update a specific beer   |
| GET         | /beers              | Retrieve a list of beers |
| POST        | /beers              | Create a beer            |
| GET         | /beers/{id}         | Retrieve a specific beer |
| PUT         | /beers/{id}         | Update a specific beer   |

## Setup/Installation Requirements

- _Clone this repository._
- _[Download Sql Server Management Studio](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15)_
- _Navigate to api directory_
- _\$dotnet build_
- _\$dotnet ef migrations add initial_
- _\$dotnet ef database update_
- _\$dotnet watch run_
- _Api will run on localhost:5000_
- _Open a seperate terminal_
- _Navigate to app directory_
- _\$npm install to download dependencies_
- _\$npm run start to run the application_
- _Application will run on localhost:3000_

## Known Bugs

No known bugs at this time.

## Technologies Used

- HTML
- CSS
- JavaScript
- Material UI
- Bootstrap
- React
- C#
- RESTful API
- Entity Framework
- Sql Server

## Support and Contact Details

Feel free to provide feedback via email: andrewphilpott92@gmail.com

## License

This application is licensed under the MIT license.

Copyright (c) 2020 **Andrew Philpott**
