const message = require("./Dario_Message.js");


  
  // Function to implement the Interface
  async function LoginInterface() {
    while (true) {
      const question1 = "Choose an option:\n" +
      "1. Logon\n" +
      "2. New Account\n" +
      "3. Exit  \n> " ;
      const choices1 = ['1', '2', '3'];
      console.log('Login Confirmed');
      const answer1 = await askMultipleChoiceQuestion(question1, choices1);
  
    
  
      switch (answer1) {
        case '1':
            let username = await getAnswer('Enter Username :');
            console.log('\n')
            let password = await getAnswer('Enter Password :');
            console.log('\n')
            let answer2 = message.loginUser(username,password);
          
            if (answer2 === `Login Confirmed`)
            {
              console.log('Login Confirmed');
              chatInterface(username);
              continue;
            }
            else
            {
              console.log(answer2 + '\n');
              continue;
            }
 
        case '2':
            let newusername = await getAnswer('Enter Username :');
            console.log('\n')
            let newpassword = await getAnswer('Enter Password :');
            console.log('\n')
            console.log(message.createUser(newusername,newpassword));
          continue;
  
        case '3':
          console.log('Exiting\n')
          break;
      }
  
      break;
    }
    console.log('Goodbye\n')
    rl.close();
  }

  async function chatInterface(username) {
  
    while (true) {
      console.log("\n\n\n\n")
      var x = "Type 'logout' to log out\nChoose a message group:\n"; 
      num=0; 
      var y = ['logout'];
      var z = [];
      message.getChatGroups(username).forEach((object) => {
        num += 1

        x += num + ". " + object.groupname + "\n"
        y.push(num.toString());
        z.push(object.groupname);
      });
      num++; y.push(num.toString());
      x += num + ". Create New Message Group\n> ";
      const question1 = x;
      const choices1 = y;
      const answer1 = await askMultipleChoiceQuestion(question1, choices1);

        if(answer1 === 'logout')
        {
          LoginInterface();
          continue;
        }
        else if(answer1 === num.toString())
        {
          let groupname = await getAnswer('Enter groupname :');
            console.log('\n')
            let answer2 = message.CreateChatGroup(groupname, [username], [username]);
            console.log('answer2')
          continue;
        }
        else
        {
          readinterface(username, z[parseInt(answer1) - 1]);
          continue;
        }
      
  
     
      break;
    }
  
    rl.close();
  }
  async function readinterface(username , groupname)
  {
    
    while (true) {
      console.log("\n\n\n\n\n\n\n\n")
      let text = await getAnswer(message.readChatGroup(groupname) + username + '> ');
      if(text === '/exit')
      {
        chatInterface(username);
        continue;
      }
      else if (text === '/adduser')
      {
        let user = await getAnswer('Enter Username :');
        console.log(message.addUsertoGroup(user, groupname));
        continue;
      }
      else
      {
      
      message.addMessage(text,username,groupname)
      continue;
      }
      break;
    }
  
    rl.close();
  }
  // Start the interface
  LoginInterface()
 

  // Function to ask a multiple-choice question
function askMultipleChoiceQuestion(question, choices) {
    return new Promise((resolve) => {
      const validChoices = choices.map(choice => choice.toLowerCase());
      const formattedChoices = choices.join('/');
  
      rl.question(`${question}` , (answer) => {
        
        const normalizedAnswer = answer.toLowerCase();
        if (validChoices.includes(normalizedAnswer)) {
          resolve(normalizedAnswer);
        } else {
          console.log(`Invalid choice. Please choose one of: ${formattedChoices}`);
          resolve(askMultipleChoiceQuestion(question, choices));
        }
      });
    });
  }
function getAnswer(question) {
    return new Promise(resolve => { 
    rl.question(question, (answer) => {
        resolve(answer);
      });
    }); 
}

