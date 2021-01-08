# auth

## Routes index
- [login (nested)](./post_my_api_auth_login.md)
- [login](#login)

<!--
(#login)
-->
### login
| <img src="assets/post.png" width="53.3px" height="30px"/> | localhost:8080/v1/auth/login |
| :---------- | :-------- |


Request body:<br/>
```json
{
    "email":"fayazfz07@gmail.com",
    "password":"Fayaz@17"
}
```
Request headers:<br/>
```json

```
Responses:<br/>
> 202 Accepted


**Headers**
```json
Content-Type: application/json; charset=utf-8
Date: Thu, 07 Jan 2021 09:42:20 GMT
Content-Length: 49
```
**Body**
```json
{
    "message": "Login successful",
    "status": "success"
}
```

> 400 Bad Request


**Headers**
```json
Content-Type: application/json; charset=utf-8
Date: Fri, 08 Jan 2021 10:17:27 GMT
Content-Length: 50
```
**Body**
```json
{
    "message": "Incorrect password",
    "status": "failed"
}
```


---
