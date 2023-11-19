
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});
//a database of messages
const chatlogs = [
    { messageid: 1, text: "Hello world", groupname: "First chat group", user: "TestUser1", datetime: new Date() },
    { messageid: 2, text: "Helol world", groupname: "First chat group", user: "TestUser1", datetime: new Date() },
];
//a database of users
const users = [
    {
        username: "TestUser1", password: "Password"
    },
    {
        username: "TestUser2", password: "Password"
    },
];
//a database of chatgroups
const chatgroups = [
    { groupname: "First chat group", users: ["TestUser1", "TestUser2"], admins: ["TestUser1"], },
    { groupname: "chat group", users: ["TestUser1"], admins: ["TestUser1"] },
];


module.exports = {
    rollingNumber() {
        let newID = 0;
        do {
            newID = newID + 1
        } while (chatlogs[chatlogs.findIndex(x => x.messageid === newID)] != undefined);
        return newID;
    },
 
    // This function create an account
    createUser(username, password) {

        if (users.find(x => x.username === username) == undefined) {
            if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
                try {
                    const user = { username: username, password: password };
                    users.push(user);
                    return `Success`;
                }
                catch (e) {
                    console.log(e.message);
                    throw new Error(`Unable to add user to the system.`);
                }
            }
            else {
                return `Password must have at least 8 characters and contain 1 number and letter`;
            }
        }
        else {
            return `Username already exist`;
        }

    },
    // This function validate a log into account
    loginUser(username, password) {
        
        if (users.find(x => x.username === username) != undefined) {
            if (users.find(x => x.password === password) != undefined) {
                return `Login Confirmed`;
            }
            else {
                return `Wrong Password`;
            }
        }
        else {
            return `Username not found`;
        }

    },
    // This function add a message  into an database
    addMessage(text, user, groupname) {
        if (users.find(x => x.username === user) != undefined & chatgroups.find(x => x.groupname === groupname) != undefined) {
            try {
                const chat = { messageid: this.rollingNumber(), text: text, groupname: groupname, user: user, datetime: new Date() };
                chatlogs.push(chat)
                return `Success`;
            }
            catch (e) {
                console.log(e.message);
                throw new Error(`Unable to send text to the system.`);
            }
        }
        else {
            return 'Username or groupname does not exist'
        }

    },
    // This function add a user into a group
    addUsertoGroup(username, groupname) {
        if (chatgroups.find(x => x.groupname === groupname) != undefined & users.find(x => x.username === username) != undefined) {
            const group = chatgroups.find(x => x.groupname === groupname);
            if(group.users.find(x => x === username) != undefined)
            {
                return `user already in group`;
            }
            else
            {
            try {
                chatgroups.find(x => x.groupname === groupname).users.push(username);
                return `Success`;
            }
            catch (e) {
                console.log(e.message);
                throw new Error(`Unable to add chat group to the system.`);
            }
        }
        }
        else {
            return 'Username does not exist'
        }
    },
    // This functions returns a string that consists of all the chat logs from a chat group
    readChatGroup(groupname) {
        if (chatgroups.find(x => x.groupname === groupname) != undefined) {
            var chatLog = groupname + "\n";
            var currentUser;
            chatlogs.filter(x => x.groupname === groupname).forEach((object) => {


                currentUser = object.user;
                chatLog = chatLog + '[' + object.datetime.toLocaleString('en-US', { hour12: false, }) + '] ' +
                    object.user + "> " + object.text + "\n";

            });


            return chatLog;
        }
    },
    //this function returns all chat groups the given user is in
    getChatGroups(inputusername) {
        return chatgroups.filter(x => x.users.find(x => x === inputusername) === inputusername)
    },
     //this function create a chat group
    CreateChatGroup(groupname, users, admins) {
        try {
            const chatgroup = {
                groupname: groupname,
                users: users,
                admins: admins
            };
            chatgroups.push(chatgroup);
            return `Success`;
        }
        catch (e) {
            console.log(e.message);
            throw new Error(`Unable to add chat group to the system.`);
        }

    },

    

}
