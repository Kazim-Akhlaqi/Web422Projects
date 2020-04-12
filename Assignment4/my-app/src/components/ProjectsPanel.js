import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

class ProjectsPanel extends Component {
  state = {
    projects: []
  };

  componentDidMount() {
    fetch("https://glacial-hollows-29191.herokuapp.com/projects")
      .then(res => res.json())
      .then(data => {
        this.setState(function() {
          return { projects: data };
        });
      })
      .catch(err => {
        console.log("Error: Unable to connect to heroku-projects." + err);
      });
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Projects</h3>
        </div>
        <div className="panel-body">
          <div className="table-responsive overview-table">
            <table className="table table-striped table-bordered">
              <tbody>
                {this.state.projects.map(function(project) {
                  let activeNumDays = moment().diff(
                    moment(project.ProjectStartDate),
                    "Days"
                  );
                  return (
                    <tr key={project._id}>
                      <td>{project.ProjectName}</td>
                      <td>{"Active " + activeNumDays + " Days"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Link to="/projects" className="btn btn-primary form-control">
            View All Project Data
          </Link>
        </div>
      </div>
    );
  }
}
export default ProjectsPanel;
