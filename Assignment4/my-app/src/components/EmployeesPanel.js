import React, { Component } from "react";
import { Link } from "react-router-dom";

class EmployeesPanel extends Component {
  state = {
    employees: []
  };
  componentDidMount() {
    fetch("https://glacial-hollows-29191.herokuapp.com/employees")
      .then(res => res.json())
      .then(data => {
        this.setState(function() {
          return { employees: data };
        });
      })
      .catch(err => {
        console.log("Error: Unable to connect to heroku-employees." + err);
      });
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Employees</h3>
        </div>
        <div className="panel-body">
          <div className="table-responsive overview-table">
            <table className="table table-striped table-bordered">
              <tbody>
                {this.state.employees.map(function(employee) {
                  return (
                    <tr key={employee._id}>
                      <td>{employee.FirstName + " " + employee.LastName}</td>
                      <td>{employee.Position.PositionName}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <Link to="/employees" className="btn btn-primary form-control">
            View All Employee Data
          </Link>
        </div>
      </div>
    );
  }
}
export default EmployeesPanel;
