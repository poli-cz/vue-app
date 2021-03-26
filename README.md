# Vue demonstration

Example of Vue + node fullstack. 

For testing purposes whole server is available here:

[App link](http://37.46.209.112:8080/)



## Backend setup 
Backend is configured by default to run on port 4000. If you wish to change it please edit app.js in server file.
Server setup:
```
node server/app.js
```
### Server got 3 simple endpoints:

[/get_users](http://37.46.209.112:4000/get_users) returns list of all users <br/>
[/register](http://37.46.209.112:4000/register)register new user by given name <br/>
[/get_rand_user](http://37.46.209.112:4000/get_rand_user) API call, get random user <br/>

## Frontend setup
Backend is configured by default to run on port 8080. 
Fontend setup:
```
cd client && npm run serve
```

