import React, { Component } from "react";
import MainContainer from "./MainContainer";

class Teams extends Component {
  state = {
    teams: []
  };
  componentDidMount() {
    fetch("https://glacial-hollows-29191.herokuapp.com/teams")
      .then(res => res.json())
      .then(data => {
        this.setState(function() {
          return {
            teams: data
          };
        });
      })
      .catch(err => {
        console.log("Error: Unable to connect to heroku-teams." + err);
      });
  }
  render() {
    return (
      <MainContainer highlight="Teams">
        <h1 className="page-header">Teams</h1>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Projects</th>
              <th>Employees</th>
              <th>TeamLead</th>
            </tr>
          </thead>
          <tbody>
            {this.state.teams.map(function(team) {
              return (
                <tr key={team._id}>
                  <td>{team.TeamName}</td>
                  <td>
                    {team.Projects.map(function(project) {
                      return <li key={project._id}>{project.ProjectName}</li>;
                    })}
                  </td>
                  <td>{team.Employees.length} Employees</td>
                  <td>
                    {team.TeamLead.FirstName} {team.TeamLead.LastName}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </MainContainer>
    );
  }
}
export default Teams;
