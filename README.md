# CATtention API

## Description

<img height=30 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" style="padding:5px;"/><img height=30 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg" style="padding:5px;" /><img height=30 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" style="padding:5px;"/><img height=30 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg" style="padding:5px;"/>
<img height=30 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg" style="padding:5px;"/>
<img height=30 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg" style="padding:5px;"/><img height=30 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" style="padding:5px;"/>
          
                                               

This is an API built for the web app CATtention, deployed to heroku.

This REST API features some built in websocket functionality, this readme will be updated as updates are released.

## Table of Contents

- [Installation](#installation)
- [Endpoints](#endpoints)
- [License](#license)
- [Contribute](#contribute)
- [Questions](#questions)
- [Features](#features)

## Installation

Not required. Visit the link for the deployed front-end here. Or, if you would like to use our endpoints, see the section below.

## Endpoints

The url prefix for this API is `https://cattention-api.herokuapp.com/api/`

### GET Requests

`GET /rooms/`

    response {
	"id": 1,
	"room_name": "room name",
	"code": "sui7dha",
	"createdAt": "2023-03-04T22:58:08.000Z",
	"updatedAt": "2023-03-04T22:58:08.000Z",
	"UserId": 1
    }

* Returns an array of room objects.
* To only return one item, use the room code. `/rooms/:roomCode/`
    * This example would be `/rooms/sui7dha`

`GET /users/`

    response {
		"id": 3,
		"username": "blaubachs",
		"password": "$2b$04$pliO4OIq22WwhjKBIe1S8uJwPXq9fCmef8xCWFtaiciDNnY84BW6S",
		"work_time": 2147483647,
		"minigame_score": 4,
		"createdAt": "2023-03-13T17:28:34.000Z",
		"updatedAt": "2023-03-13T18:05:37.000Z"
	},

* Returns an array of user objects.
* To only return one item, use the endpoint `/users/:userId`
    * This example would be `/users/3`

`GET /cats/`

    response {
		"id": 5,
		"cat_name": "Scholar Cat",
		"img_src": "scholarly.jpg",
		"min_work_time": 600,
		"createdAt": "2023-03-13T17:27:44.000Z",
		"updatedAt": "2023-03-13T17:27:44.000Z"
	}

* Returns an array of cat objects.
* To only return one item, use the endpoint `/cats/:catId`
 * This example would be `/cats/

`GET users/token/isValidToken`

    request:
    fetch("https://cattention-api.herokuapp.com/api/users/isValidToken", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`
        },
    });


    response
    {
	"isValid": true,
	"user": {
		"id": 5,
		"username": "bungerd",
		"iat": 1677969707,
		"exp": 1678012907
	    }
    }
    
* Must include the token in a string with Bearer, a single space, and then the token.

### PUT Requests

`PUT /users/:userId/cats/:catId`

*:userId is the ID of the user we would like to update. :catId is the ID of the cat to add to the user.*

    response {
		"UserId": 3,
		"CatId": "2",
		"createdAt": "2023-03-13T19:48:30.732Z",
		"updatedAt": "2023-03-13T19:48:30.732Z"
	}

`PUT /users/:userId/time/:mins`

*:userId is the user to add minutes to. The amount of minutes to add are put in the :mins param.*

    response {
	"msg": "User updated",
	"oldMinutes": 5404,
	"newMinutes": 8104
}

* This returns the user's old minutes, and their new minutes.

`PUT /users/:userId/score/:scoreNum`

*scoreNum is the number to add to this user*

    response {
	"msg": "User updated",
	"oldScore": 0,
	"newScore": 1
    }   

## License

Not licensed.

## Contributors

Alex Hall: [alexh3422](https://github.com/alexh3422)

Ben Laubach: [blaubachs](https://github.com/blaubachs)

Emma Waltho: [ewaltho](https://github.com/ewaltho)

Savannah Miller: [VisualViolet](https://github.com/ewaltho)

---

