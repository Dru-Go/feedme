# Feeder
> A nodejs backend API for managing user feeds!

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Test](#test)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info
This API will handle the registration and login of users and send image feeds to a google cloud storage

## Technologies
* Typescript
* Firebase
* Google Cloud Storage

## Setup
   ```sh
    npm i # install nodejs dependancies

    npm run dev # To start the server in developer mode

    npm run build # To build the app

    npm start # To start the built server
   
   ```

## Test

curl -X GET \
 https://feedme12.herokuapp.com/api/test



## Features
List of features ready and TODOs for future development
* Enables one to register to the app
```js
curl -X POST \
 https://feedme12.herokuapp.com/api/user/create \
 -H 'cache-control: no-cache' \
 -H 'content-type: application/json' \
 -d '{
"firstName": "feeder",
"lastName": "2.0",
"email": "feeder@mail.com",
"password": "'\''wYtH65;LBz{=3GW"
}
'
```

* Enables one to login to the app

```js
curl -X POST \
 https://feedme12.herokuapp.com/api/user/login \
 -H 'cache-control: no-cache' \
 -H 'content-type: application/json' \
 -d '{
"email": "feeder@mail.com",
"password": "'\''wYtH65;LBz{=3GW"
}
'

```

* Enables an authenticated to add feed to the database and storage
```sh
# url is https://feedme12.herokuapp.com/api/feeds/create
# same goes here except we add a barier token we get from the login and add a file mapped as image and a caption mapped as caption
```
* Enables an authenticated to access the feeds stored in the database
```sh
# url is https://feedme12.herokuapp.com/api/feeds/my
# here we just add the token to get all the feeds
```
To-do list:
* tsc configuration
* some error handling
* Add some testing

## Status
Project is: _in progress_ since there are some kinks that need some work

## Inspiration
This project serves as a test project for the company Ahun

## Contact
Contact me using email silco2dev@gmail.com
