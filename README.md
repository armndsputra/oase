## `OASE` `Personal` `Website`
# Authentication & User Management API
## Overview
*API for user management with role-based authentication and authorization system ( Admin/User )*
### Role-based Features
 | Role  | Permissions |
|-------|-------------|
| ADMIN | delete user, fetch all user |
| USER  | update user, post content |

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
    "name" : "--- --- ---", // required
    "username" : "------", // required
    "email" : "------@mail.com", // required
    "password" : "------", // required
    "confirm_password" : "------", // required
    "birthday" : "00-00-0000", // required
    "gender" : "------", // required 
  }
  ```

  ##### Response :
  ```json
    {
    "message": "succed",
        "data": {
            "name": "--- --- ---",
            "username": "------",
            "email": "------@mail.com",
            "birhtday": "00-00-0000",
            "gender": "famele",
            "avatar": "default.jpg",
            "role": "user", // default role
            "created": "--- --- ---"
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
##### Response :
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

<div style="text-align: right;letter-spacing: 6px;">
<h3>ADMIN FEATURE</h3>
</div>

***FEATURE :***
- [x] `GET /user` - fetch all user
- [x] `DELETE /user/id_user` - delete user


### 1. Fetch All User
  - **Endpoint :** `GET /user`
  ##### Response :
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
            "role": "admin",
            "created": "--- --- ---"
        }
    ]
    }
  ```
  
### Delete User By ID
- **Endpoint** : `DELETE /user/id_user`
##### Response :
```json
    {
        "message": "the user has been successfully deleted",
        "deleted": {
            "id": "***",
            "name": "***",
            "user": "***",
            "email": " ***@mail.com"
        }
    }
```

<div style="text-align: right;letter-spacing: 6px;">
<h3>USER FEATURE</h3>
</div>

***FEATURE :***
- [x] `POST /postal` - posting content
- [x] `DELETE /postal/id_user` - delete content

### Posting Content
  - **Endpoint** : `POST /postal`
  ##### Request Body :
  ```json
  {
    "title" : "--- --- ---",
    "content" : "--- --- ---"
  }
  ```
  **Response** :
  ```json
  {
    "message": "succeed",
    "data": {
        "user": "------",
        "title": "--- --- ---",
        "created": "--- --- ---",
        "thumbnail": "uploads/contents/------",
        "content": "--- --- ---"
    }
  }
  ```
  ### Delete Content
  - **Endpoint** : `DELETE /postal/id_content`
  
   ##### Response :
   ```json
   {
    "message": "deleted",
    "deleted": {
        "id": "------",
        "title": "--- --- ---"
    }
  }
   ```