<div align=center>

# Tap Room

#### By **Andrew Philpott**

[About](#About) | [Setup/Installation Requirements](#Setup/Installation-Requirements) | [User Stories](#User-Stories) | [URLs](#URLs) | [API Endpoints](#API-Endpoints) | [Parking Lot](#Parking-lot) | [Bugs](#Known-Bugs) | [Technologies](#Technologies-Used) | [Contact](#Support-and-Contact-Details)

</div>

## About

This is a website for the fake restuarant Tap House that allows users to browse beers and their reviews. The application features authentication and authorization to provide exclusive deals to registered customers, update functionality for employees, and full CRUD functionality for admins.

Log in with the email 'admin@gmail.com', 'employee@gmail.com', or 'member@gmail.com' and password 'test' to view authorization in action.

## Setup/Installation Requirements

- _Clone this repository._
- _[Download and install .NET Core SDK v3.1.7](https://dotnet.microsoft.com/download/dotnet-core/3.1)_
- _[Download and install Sql Server Management Studio](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15)_
- _Navigate to api directory_
- _\$dotnet build_
- _\$dotnet ef migrations add initial_
- _\$dotnet ef database update_
- _\$dotnet watch run_
- _Api will run on localhost:5000_
- _Open a seperate terminal_
- _Navigate to app directory_
- _\$npm install to download dependencies_
- _\$npm test to run tests_
- _\$npm run start to run the application_
- _Application will run on localhost:3000_

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

## URLs

| URL Path         | Purpose                             |
| :--------------- | :---------------------------------- |
| /                | Landing page                        |
| /login           | Form to login                       |
| /register        | Form to register                    |
| /account         | Member exclusive deals              |
| /about           | About the company                   |
| /beers           | List of beers                       |
| /beers/:id       | Beer details                        |
| /beers/edit/:id  | Form to update beer information     |
| /beers/new       | Form to add a beer to the beer list |
| /reviews/new     | Form to add a review for any beer   |
| /reviews/:id/new | Form to add a review for a beer     |

## API Endpoints

| HTTP Method | Endpoint                   | Purpose                    |
| :---------- | :------------------------- | :------------------------- |
| POST        | /api/v1/users/register     | Create a user              |
| POST        | /api/v1/users/authenticate | Authenticate a user        |
| GET         | /api/v1/users/{id}         | Retrieve a user            |
| PUT         | /api/v1/users/{id}         | Edit a user                |
| DELETE      | /api/v1/users/{id}         | Delete a user              |
| GET         | /api/v1/beers              | Retrieve a list of beers   |
| POST        | /api/v1/beers              | Create a beer              |
| GET         | /api/v1/beers/{id}         | Retrieve a beer            |
| PUT         | /api/v1/beers/{id}         | Update a beer              |
| GET         | /api/v1/reviews            | Retrieve a list of reviews |
| POST        | /api/v1/reviews            | Create a review            |
| GET         | /api/v1/reviews/{id}       | Retrieve a review          |
| PUT         | /api/v1/reviews/{id}       | Update a review            |

## Parking Lot

- Restrict users to only 1 review per beer.
- Add pagination.
- Save data into local storage.
- Return less data for Get All queries.
- Implement JWT refresh tokens.
- Implement authorization filters.

## Known Bugs

No known bugs at this time.

## Technologies Used

- Azure Active Directory
- Azure Active Directory B2C
- Azure Sql Server
- HTML
- CSS
- JavaScript
- Material UI
- React
- C#
- RESTful API
- Entity Framework

## Support and Contact Details

Feel free to provide feedback via email: andrewphilpott92@gmail.com

## MIT License

Copyright (c) Andrew Philott. All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE
