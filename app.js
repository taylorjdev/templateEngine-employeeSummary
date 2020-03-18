const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
let employees = []
function createTeam() {
  inquirer.prompt([
    {
      type: "list",
      name: "employeeType",
      message: "Select the Employee type you wish to create",
      choices: ["Engineer", "Manager", "Intern"]
    },
    {
      type: "input",
      name: "name",
      message: "What is the Employee's name?"
    },
    {
      type: "input",
      name: "id",
      message: "What is the Employee's id?"
    },
    {
      type: "input",
      name: "email",
      message: "What is the Employee's email?"
    }
  ]).then((data) => {
    const { employeeType } = data

    switch (employeeType) {
      case "Engineer":
        createEngineer(data)
        break;
      case "Manager":
        createManager(data)
        break;
      case "Intern":
        createIntern(data)
        break;
      default:
        break;
    }
  })
}

function createEngineer(employeeInfo) {
  inquirer.prompt([{
    type: "input",
    message: "What is your Github",
    name: "github"
  },
  {
    type: "confirm",
    name: "moreEmployees",
    message: "Would you like to add more employees?"
  }]).then((data) => {

    const { name, id, email } = employeeInfo
    const { github } = data

    let newEngineer = new Engineer(name, id, email, github)
    employees.push(newEngineer)
    if(data.moreEmployees){
      createTeam()
    } else {
      finishedWithCreatingTeamMembers()
    }
  })
}

function createManager(employeeInfo) {
  inquirer.prompt([{
    type: "input",
    message: "What is your office number?",
    name: "officeNumber"
  },
  {
    type: "confirm",
    name: "moreEmployees",
    message: "Would you like to add more employees?"
  }
]).then((data) => {

    const { name, id, email } = employeeInfo
    const { officeNumber } = data

    let newManager = new Manager(name, id, email, officeNumber)
    employees.push(newManager)
    if(data.moreEmployees){
      createTeam()
    } else {
      finishedWithCreatingTeamMembers()
    }
  })
}

function createIntern(employeeInfo) {
  inquirer.prompt([{
    type: "input",
    message: "What is your School Name?",
    name: "school"
  },
  {
    type: "confirm",
    name: "moreEmployees",
    message: "Would you like to add more employees?"

  }
]).then((data) => {

    const { name, id, email } = employeeInfo
    const { school } = data

    let newIntern = new Intern(name, id, email, school)
    employees.push(newIntern)
    if(data.moreEmployees){
      createTeam()
    } else {
      finishedWithCreatingTeamMembers()
    }
  })
}

function finishedWithCreatingTeamMembers(){

 fs.writeFile(outputPath,render(employees), (err,data)=>{
   if (err) throw err;

    console.log("File Created in output folder")
 })
}

createTeam()



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
