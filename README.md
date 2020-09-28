<div align=center>

# Tap Room

#### By **Andrew Philpott**

[About](#About) | [User Stories](#User-Stories) | [URLs](#URLs) | [API Endpoints](#API-Endpoints) | [Parking Lot](#Parking-lot) | [Bugs](#Known-Bugs) | [Technologies](#Technologies-Used) | [Contact](#Support-and-Contact-Details)

</div>

## About

This is a website for the fake restuarant Tap House that lists their beer menu and reviews for each beer. The application features authentication and authorization to provide members the ability to write reviews for beers, and admins CRUD functionality for beers and reviews.

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

| URL Path           | Purpose                                              |
| :----------------- | :--------------------------------------------------- |
| /                  | Landing page with list of beers on tap and favorites |
| /account           | List of user reviews and member deals                |
| /admin             | Page for admin signin                                |
| /about             | About the company                                    |
| /beers             | List of beers                                        |
| /beers/details/:id | Beer details                                         |
| /beers/edit/:id    | Form to update beer information                      |
| /beers/new         | Form to add a beer to the beer list                  |
| /reviews/new       | Form to add a review for a beer                      |
| /reviews/new/:id   | Form to add a review for a specific beer             |
| /reviews/edit/:id  | Form to edit a review for a specific beer            |

## API Endpoints

| HTTP Method | Endpoint                     | Purpose                            |
| :---------- | :--------------------------- | :--------------------------------- |
| GET         | /api/v1/beers                | Retrieve a list of beers           |
| POST        | /api/v1/beers                | Create a beer                      |
| GET         | /api/v1/beers/{id}           | Retrieve a beer                    |
| PUT         | /api/v1/beers/{id}           | Update a beer                      |
| PUT         | /api/v1/beers/{id}/increment | Increase the # of pints for a beer |
| PUT         | /api/v1/beers/{id}/decrement | Decrease the # of pints for a beer |
| GET         | /api/v1/reviews              | Retrieve a list of reviews         |
| POST        | /api/v1/reviews              | Create a review                    |
| GET         | /api/v1/reviews/{id}         | Retrieve a review                  |
| PUT         | /api/v1/reviews/{id}         | Update a review                    |
| DELETE      | /api/v1/reviews/{id}         | Delete a review                    |
| GET         | /api/v1/reviews/me           | Retrieve a user's reviews          |
| POST        | /api/v1/reviews/like         | Create a reviewlike for a review   |
| DELETE      | /api/v1/reviews/like/{id}    | Delete a reviewlike for a review   |

## Parking Lot

- Add pagination.
- Save data into local storage.
- Return less data for Get All queries.

## Known Bugs

No known bugs at this time.

## Technologies Used

- Azure Active Directory
- Azure Active Directory B2C
- Azure App Service
- Azure Devops
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
