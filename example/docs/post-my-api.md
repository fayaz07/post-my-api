# post-my-api
> This is my awesome collection bro, I don't know how to explain

**Authorization**: Bearer

**Usage**: 
```json
Authorization: Bearer {{access_token}}
```
**Variables**: 
```json
baseUrlAPIv1: localhost:8080/v1
```
**Schema**: https://schema.getpostman.com/json/collection/v2.1.0/collection.json

## Routes index
- [auth (nested)](./post_my_api_auth.md)
- [verify user Copy](#verify-user-copy)
- [delete account Copy](#delete-account-copy)
- [update password Copy](#update-password-copy)

<!--
(#verify-user-copy)
-->
### verify user Copy
| <img src="assets/get.png" width="53.3px" height="30px"/> | localhost:8080/v1/auth/token/verify?t=b8725071c46a9f0af208693caf135a177def7c2d77b702720a38eeab3bd6fc79d95e90e3e1be0fdd12bf20a8e345525812a0a75d50545e93c78c1908d7f733f1 |
| :---------- | :-------- |


Description: This is some description bro


---
<!--
(#delete-account-copy)
-->
### delete account Copy
| <img src="assets/delete.png" width="53.3px" height="30px"/> | localhost:8080/v1/auth/ |
| :---------- | :-------- |


```json
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ0b2RvLTcuaGVyb2t1YXBwLmNvbSIsInN1YiI6ImFwaV9BY2Nlc3NUb2tlbiIsImlzcyI6InRvZG8tNy5oZXJva3VhcHAuY29tIiwiZW1haWwiOiJmYXlhemZ6MDdAZ21haWwuY29tIiwiaWF0IjoxNTk3MDQwNTI5LCJleHAiOjE1OTc5MDQ1Mjl9.wHRqp_Yif6lblmcsiZYDJT2qKBTmdpbwANv_SV5Si2TE9wnhhr3Ier1MqRvh_jG20fAZ6Y-_k9FvBvvWbzVdoTuxIRocpvzIUX4q4m9i9y7tT5h23cDwHjtLssE2ZE1ddbdrqVECimyZjxM_Ac6Swfu423vjW8PwZfbPJmgrx3YxCMWwBVsWgZTYJJuJ9bfIWZMh-J4y2NJ30AqGlsYEWjCn6nGf24yzWAp2BmZIA0mjkTw_r4uW8VTA7yJMpV47XmJ22DkgP598RD24p6-NyFub0127egIvJsVzIJT3wGTLw-I7mOzNCNlpZf_Zeacz6BrUAKg4WCSEWUL_v3mWAw
```

---
<!--
(#update-password-copy)
-->
### update password Copy
| <img src="assets/patch.png" width="53.3px" height="30px"/> | localhost:8080/v1/auth/password |
| :---------- | :-------- |


```json
Authorization: Bearer {{access_token}}
```
Request body:<br/>
```json
{
    "oldPassword":"Fayaz@07a",
    "newPassword":"Fayaz@07"
}
```
Request headers:<br/>
```json
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJ0b2RvLTcuaGVyb2t1YXBwLmNvbSIsInN1YiI6ImFwaV9BY2Nlc3NUb2tlbiIsImlzcyI6InRvZG8tNy5oZXJva3VhcHAuY29tIiwiZW1haWwiOiJmYXlhemZ6MDdAZ21haWwuY29tIiwiaWF0IjoxNTk3MDYzNDQ4LCJleHAiOjE1OTc5Mjc0NDh9.mwvCnbqxllnZELmHwibRtHljwMsWvZtAGoHA1b4HYLrnBs7zhaUpvwSli--sJpzTokqyMitFaICEK25TO7S6Y-f2PViK6Hec6GK9fSfA0Rb7obn0NAeEdFEdZg56xsZksYa4UjuSoZwhg8CBAJFD21JNvmo7M4OI6P0oGSYixmms7mh1YCtuH9JbupLU7SVgas9hENqKn4fkTFdOyMR93f7SMCpGXqjZIB_jo0cOdN07V38KaMtYp6BRcJLvc-_9RIbo7di2Om9-JxlqKVdrmOnhMOGIW8RFwRpv3QgJEjOdmCiCf6y8ynjGjzxDZkhAEgO4qxGzXEnOq5vWtER3iQ
```
Responses:<br/>

---
