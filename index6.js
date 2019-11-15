const axios = require("axios");
const inquirer = require("inquirer");


function Profile(login, location, html_url, public_repos, followers, following) {
    this.login = login;
    this.location = location;
    this.html_url = html_url;
    this.public_repos = public_repos;
    this.followers = followers;
    this.following = following;
  };

  Profile.prototype.printStats = function() {
    console.log("Name: " + this.login + "\nLocation: " + this.location +
    "\nGitHUb Url: " + this.html_url + "\nNumber of Public Repos: " + this.public_repos + "\nNumber of Followers : " +
    this.followers, "\nNumber Following :" + this.following);
    console.log("\n-------------\n");
};

  function promptUser() {
    return inquirer.prompt([
      {
        type: "input",
        name: "username",
        message: "GitHub username"
      }
    ]);
  };

  function generateProfile(input) {
    axios.get(
        `https://api.github.com/users/${input.username}`
    ).then(function (response) {
        //const {login, location, html_url, blog, bio, public_repos, followers, following} = response.data
        //console.log(login, location, html_url, blog, bio, public_repos, followers, following);
        const user = new Profile(response.data.login, response.data.location, response.data.html_url, response.data.public_repos, response.data.followers, response.data.following)
        console.log(user.printStats())
    })
  }

  async function grabInfo() {
    try {
        const input = await promptUser();
        console.log(input)
        const profile = await generateProfile(input);
  
      console.log(profile)
  
    } catch(err) {
      console.log(err);
    }
  };
  
  
  grabInfo();

  