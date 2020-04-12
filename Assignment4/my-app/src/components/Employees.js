import React, { Component } from "react";
import MainContainer from "./MainContainer";
import moment from "moment";

class Employees extends Component {
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
      <MainContainer highlight="Employees">
        <h1 className="page-header">Employees</h1>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name & Position</th>
              <th>Address</th>
              <th>Phone Num</th>
              <th>Hire Date</th>
              <th>Salary Bonus</th>
            </tr>
          </thead>
          <tbody>
            {this.state.employees.map(function(employee) {
              return (
                <tr key={employee._id}>
                  <td>
                    {employee.FirstName} {employee.LastName} -{" "}
                    {employee.Position.PositionName}
                  </td>
                  <td>
                    {employee.AddressStreet} {employee.AddressState}{" "}
                    {employee.AddressCity} {employee.AddressZip}
                  </td>
                  <td>
                    {employee.PhoneNum} ex: {employee.Extension}
                  </td>
                  <td>
                    {moment(employee.HireDate)
                      .utc()
                      .format("LL")}
                  </td>
                  <td>$ {employee.SalaryBonus}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </MainContainer>
    );
  }
}
export default Employees;
