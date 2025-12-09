> ### Commenter
- **Endpoint** : `POST /commenter/id_content`
  ##### Request Body :
  ```json
  {
    "comment" : "ini cerita yang kelam", // required
  }
  ```
  ### Response Success : 
  ```json
    {
    "scuccess": true,
    "message": "Comment added to post 6934d128ecdef486863838c4",
    "comment": {
        "id": "6937c6f13246344302cf374a",
        "commenter": "6937b3560ef2caf0ec4deda4",
        "content": "6934d128ecdef486863838c4",
        "comment": "ini cerita yang kelam",
        "created": "2025-12-09T06:51:29.102Z"
    }
    }
  ```