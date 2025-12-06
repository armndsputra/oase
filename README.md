# `O A S E` 
*a framework for creating a simple weblog. such as posting articles, stories, and tutorials*

| Layer | Technology |
|-|-|
| ![js Logo](./icons/js.png) | JavaScript |
| <img src="https://nodejs.org/static/images/logo.svg" width="100" alt="Node.js Logo">  | Node.js |
| <img src="https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png" width="100" alt="MongoDB"> | Mongodb |


# Authentication & User Management API
## Overview
*API for user management with role-based authentication and authorization system ( admin & user )*
### Role-based Features
 | Role  | Permissions |
|-------|-------------|
| ADMIN | delete user, fetch all user, fetch user by ID |
| USER  | update user, post content, update content |
| GENERAL  | fetch all contents, fetch content by id, fetch content by keywords |

---
1. > npm install
2. > create a file with name .env
   ```
    #server
    PORT='3000'
    #DATABASE MONGODB URL
    MONGODB_URL = ''
    #JSON Web Token (JWT) Key
    JWT_KEY = ''
   ```
  
3. > npm start | npm run dev
---

### Register
- **Endpoint** : `POST /register`
  ##### Request Body :
  ```json
  {
    "name" : "adipati suryanegara", // required
    "username" : "adipati", // required
    "email" : "adipati@mail.com", // required
    "password" : "admin", // required
    "confirm_password" : "admin", // required
    "birthday" : "12-13-1997", // required
    "gender" : "laki-laki", // required 
  }
  ```

  ##### Response Success :
  ```json
    {
    "success": true,
    "message": "success : user has successfully registered",
    "data": {
        "name": "adipati suryanegara",
        "username": "adipati",
        "email": "adipati@gmail.com",
        "password": "*********",
        "gender": "laki-laki",
        "birhtday": "12-13-1997",
        "avatar": "default",
        "role": "user",
        "created": "2025-12-06T02:14:17.840Z"
    }
  }
  ```


### Login
- **Endpoint** : `POST /login`

##### Request Body :
```json
{
    "email" : "------@mail.com",
    "password" : "------"
}
```
##### Response Success :
```json
{
    "message": "you have successfully logged in",
    "access_token": "--- --- --- ---",
    "token_type": "Bearer",
    "expires_in": "1h"
}
```
  
#### Implementation Authentication

##### Request Header :
```json
{
    "Authorization" : "Bearer --- --- --- ---" // access token code
}
```
## ADMIN ACCESS
***FEATURE :***
- [x] `GET /user` - fetch all user
- [x] `DELETE /user/id_user` - delete user
- [x] `GET /user/id_user` - fetch user by ID


### 1. Fetch All User
  - **Endpoint :** `GET /user`
  ##### Response Success :
  ```json
    {
    "message": "success",
    "data": [
        {
            "id": "-------",
            "name": "--- --- ---",
            "username": "------",
            "email": "------@mail.com",
            "gender": "female",
            "birthday": "00-00-0000",
            "avatar": "default",
            "role": "admin",
            "created": "--- --- ---"
        },
        {
            "id": "-------",
            "name": "--- --- ---",
            "username": "------",
            "email": "------@mail.com",
            "gender": "female",
            "birthday": "00-00-0000",
            "avatar": "default",
            "role": "user",
            "created": "--- --- ---"
        }
    ]
    }
  ```
  
### 2. Delete User By ID
- **Endpoint** : `DELETE /user/id_user`
##### Response Success :
```json
    {
        "message": "the user has been successfully deleted",
        "deleted": {
            "id": "-------",
            "name": "--- --- ---",
            "user": "user",
            "email": "------@mail.com"
        }
    }
```
### 3. Fetch User By ID
- **Endpoint** : `GET /user/id_user`
##### Response Success :
```json
{
    "message": "success",
    "data": {
        "id": "692699b11ddb0f69336fd4fd",
        "email": "example@mail.com",
        "gender": "famele",
        "birthday": "28-01-1997",
        "role": "user",
        "created": "2025-11-26T06:09:53.239Z"
    }
}
```


## USER ACCESS
***FEATURE :***
- [x] `POST /postal` - posting content
- [x] `DELETE /postal/id_content` - delete content
- [x] `PATCH /postal/id_content` - update content

### 1. Posting Content
  - **Endpoint** : `POST /postal`
  ##### Request Body :
  ```json
  {
    "title" : "--- --- ---",
    "content" : "--- --- ---"
  }
  ```
  ##### Response Success :
  ```json
  {
    "message": "succeed",
    "data": {
        "user": "------",
        "title": "--- --- ---",
        "content": "--- --- ---",
        "thumbnail": "uploads/contents/------",
        "created": "--- --- ---",
    }
  }
  ```
  ### 2. Delete Content
  - **Endpoint** : `DELETE /postal/id_content`
  
   ##### Response Success :
   ```json
   {
    "message": "deleted",
    "deleted": {
        "id": "------",
        "title": "--- --- ---"
    }
  }
   ```

   ### 3. Update Content
  - **Endpoint** : `PATCH /postal/id_content`
##### Request Body :
```json
{
  "title" : "--- --- ---",
  "content" : "--- --- ---",
  "thumbnail" : "image"
}
```
##### Response Success :
```json
{
    "message": "success",
    "data": {
        "id": "--- --- ---",
        "user": "--- --- ---",
        "title": "--- --- ---",
        "content": "---",
        "thumbnail": "uploads/contents/--- ---- ---",
        "created": "00-00-000"
    }
}
```


## GENERAL ACCESS
***FEATURE :***
- [x] `GET /postal` - fetch all content
- [x] `GET /postal/id_user` - fetch by id content
- [x] `POST /postal/keyword` - fetch by keyword
  
### 1. Fetch All Content
  - **Endpoint** : `GET /postal/?limit=0&offset=0`
  ##### `Pagination` Params :
  ```json
  {
    "limit" : 0,
    "offset" : 0
  }
  ```
  ##### Response Success : 

```json
{
    "message": "success",
    "data": [
        {
            "id": "------",
            "user": "------",
            "title": "--- --- ---",
            "content": "--- --- ---",
            "thubnail": "uploads/contents/------",
            "created": "--- --- ---",
            "author": {
                "_id": "---------",
                "name": "--- --- ---"
            }
        }
    ]
}
```

### 2. Fetch Content By ID
- **Endpoint** : `GET /postal/id_content`
##### Response Success :
```json
{
    "message": "success",
    "data": {
        "id": "------",
        "user": "------",
        "title": "--- --- ---",
        "content": "--- --- ---",
        "thubnail": "uploads/contents/------",
        "created": "--- --- ---",
    }
}
```

### 3. Fetch Content By Keywords
- **Endpoint** : `POST /postal/keywords`
##### Request Body :
```json
{
  "keywords" : "--- --- ---"
}
```
##### Response Success : 
```json
{
    "message": "success",
    "data": [
        {
        "id": "------",
        "user": "------",
        "title": "--- --- ---",
        "content": "--- --- ---",
        "thubnail": "uploads/contents/------",
        "created": "--- --- ---",
        }
    ]
}
```
---

## Other Features
***ADMIN :***
- [ ] `GET /` - 

  
***USER :***
- [ ] `GET /postal/id_user` - fetch all content by user ID 