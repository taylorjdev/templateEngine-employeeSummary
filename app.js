const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

let employees = [];
function createTeam() {
  inquirer
    .prompt([
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
    ])
    .then(data => {
      const { employeeType } = data;

      switch (employeeType) {
        case "Engineer":
          createEngineer(data);
          break;
        case "Manager":
          createManager(data);
          break;
        case "Intern":
          createIntern(data);
          break;
        default:
          break;
      }
    });
}
function createEngineer(employeeInfo) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your Github",
        name: "github"
      },
      {
        type: "confirm",
        name: "moreEmployees",
        message: "Would you like to add more employees?"
      }
    ])
    .then(data => {
      const { name, id, email } = employeeInfo;
      const { github } = data;

      let newEngineer = new Engineer(name, id, email, github);
      employees.push(newEngineer);
      if (data.moreEmployees) {
        createTeam();
      } else {
        finishedWithCreatingTeamMembers();
      }
    });
}

function createManager(employeeInfo) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your office number?",
        name: "officeNumber"
      },
      {
        type: "confirm",
        name: "moreEmployees",
        message: "Would you like to add more employees?"
      }
    ])
    .then(data => {
      const { name, id, email } = employeeInfo;
      const { officeNumber } = data;

      let newManager = new Manager(name, id, email, officeNumber);
      employees.push(newManager);
      if (data.moreEmployees) {
        createTeam();
      } else {
        finishedWithCreatingTeamMembers();
      }
    });
}

function createIntern(employeeInfo) {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your School Name?",
        name: "school"
      },
      {
        type: "confirm",
        name: "moreEmployees",
        message: "Would you like to add more employees?"
      }
    ])
    .then(data => {
      const { name, id, email } = employeeInfo;
      const { school } = data;

      let newIntern = new Intern(name, id, email, school);
      employees.push(newIntern);
      if (data.moreEmployees) {
        createTeam();
      } else {
        finishedWithCreatingTeamMembers();
      }
    });
}

function finishedWithCreatingTeamMembers() {
  fs.writeFile(outputPath, render(employees), (err, data) => {
    if (err) throw err;

    console.log("File Created in output folder");
  });
}

createTeam();
