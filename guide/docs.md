# Authentication & User Management API
## Overview
*API for user management with role-based authentication and authorization system (Admin/User)*
### Role-based Features
 | Role  | Permissions |
|-------|-------------|
| ADMIN | delete user, fetch all user |
| USER  | update user |
## Example :
### Login
- **Endpoint** : `POST /login`

**Request Body:**
```json
{
    "email" : "account@mail.com",
    "password" : "******"
}
```
### Response
```json
{
    "message": "you have successfully logged in",
    "access_token": "AccessTokenCode",
    "token_type": "Bearer",
    "expires_in": "1h"
}
```
  
##### Implementation Authentication
*In the access token there are 2 roles admin and user*
***Header***
```json
{
    "Authorization" : "Bearer AccessTokenCode"
}
```
---
## Feature | Admin
### Fetch All User
- **Endpoint** : `GET /user`
  ### Response
  ```json
    {
    "message": "success",
    "data": [
        {
            "id": "***",
            "name": "***",
            "username": "***",
            "email": "***@mail.com",
            "gender": "female",
            "birthday": "00-00-0000",
            "avatar": "default",
            "role": "admin",
            "created": "--- --- ---"
        },
        {
            "id": "***",
            "name": "***",
            "username": "***",
            "email": " ***@gmail.com",
            "gender": "famele",
            "birthday": "00-00-0000",
            "avatar": "***.jpeg",
            "role": "user",
            "created": "--- --- ---"
        }
    ]
    }
  ```