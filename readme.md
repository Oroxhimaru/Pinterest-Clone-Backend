## Guidelines
1. install mongoose, create two models. write this on chatgpt = make a mongoose model for me, which contains user detail as such username, password, posts which is an array, dp,email and fullname. paste it in user.js file one model is complete.
2. now for second model create a file post.js, write in chatgpt make another model for me, now this time for posts, every post contains,posttext, current date and time, likes. paste the result  in file.
3. import both in index.js
4. create a route in index.js for a default user. copy user schema and paste it in this route and give the details.
5. create a route for post, do the same as above.
6. add user id option in postSchema.
7. delete the data from mongodbcompass and then   run the createuser again, copy the id and paste in router of post see commetn (7)
8. run post this route  in browser then check the data in mongodb both will have each other id. which is data asosiattion
9. change the postText and then  run again and check the data again in mongodb.
10. now we have to check how we can find data with id so create a route see comment (10),  run this route you will find id of post but not the data
11. now for finding the real data add populate on that route (11) , codes of above lines are shift to the node details repo of github.
12. we will use this data assosiation later with a little edit.
13. first create a passport, npm i passport passport-local passport-local-mongoose mongoose express-session ,then set the passport setup in app.js
14. flash message work , npm i connect-flash, see code.
15. 