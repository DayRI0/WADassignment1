# Messaging module

This is a messaging module made to allow the user to create accounts, create chatgroups and send messages in groups
use the given app.js to test module
### create User
```bash
createUser(username, password)
```
  This function create an account
### login User
```bash
loginUser(username, password)
```
 This function validate a log into account
### add Message
```bash
addMessage(text, user, groupname)
```
 This function add a message into an database 

### add User to Group 
```bash
addUsertoGroup(username, groupname)
```
This function add a user into a group

### read Chat Group
```bash
readChatGroup(groupname)
```
This functions returns a string that consists of all the chat logs from a chat group  
### get Chat Groups
```bash
getChatGroups(inputusername)
```
this function returns all chat groups the given user is in
### Create Chat Group
```bash
CreateChatGroup(groupname, users, admins)
```
this function create a chat group

