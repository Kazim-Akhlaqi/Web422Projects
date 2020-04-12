/*********************************************************************************
 * WEB422 – Assignment 2
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Kazim Akhlaqi Student ID: 103638177 Date: Feb 30, 2019
 * https://glacial-hollows-29191.herokuapp.com/teams
 ********************************************************************************/
let employeesModel=[];

 (function($){
 $(document).ready(function () {
    console.log("jQuery Working");

    //let employeesModel=[];

    initializeEmployeesModel();

    $("#employee-search").on("keyup", function(event){
        event.preventDefault();
        let filteredEmployeeArray = getFilteredEmployeesModel(this.value);
        refreshEmployeeRows(filteredEmployeeArray);
    });

    $(document.body).on('click', '.body-row' ,function(event){
        event.preventDefault();
        let employee = getEmployeeModelById($(this).attr("data-id"));
        if(employee != null){
            employee.HireDate = moment(employee.HireDate).format('LL');
            let employeeModelTemplate = _.template(
                '<strong>Address:</strong> <%- employee.AddressStreet %> <%- employee.AddressCity %>, <%- employee.AddressState %>. <%- employee.AddressZip %></br>' + 
                '<strong>Phone Number:</strong> <%- employee.PhoneNum %> ext: <%- employee.Extension %></br>' +
                '<strong>Hire Date:</strong> <%- employee.HireDate %>' 
              );
              let result = employeeModelTemplate({'employee':employee});
              showGenericModal(employee.FirstName + ' ' + employee.LastName, result);
        }
    });
});
})(jQuery); 

//This function will populate the "employeesModel" array,
// by issuing an AJAX call to your Teams API 
function initializeEmployeesModel(){
    $.ajax({
        url: "https://glacial-hollows-29191.herokuapp.com/employees",
        type: "GET",
        contentType: "application/json"
    })
    .done(function(data){
        employeesModel=data;
        refreshEmployeeRows(employeesModel);
    })
    .fail(function(err){
        showGenericModal('Error', 'Unable to get Employees');
    });
};

function showGenericModal(title,message){
    $("#genericModal .modal-title").empty()
        .append(title);
    $("#genericModal .modal-body").empty()
        .append(message);
    $("#genericModal").modal('show');
};

function refreshEmployeeRows(employees){
    $("#employees-table").empty();
    let template =_.template(
        '<% _.forEach(employees, function(employee){%>' +
        '<div class="row body-row" data-id="<%- employee._id %>">' +
        '<div class="col-xs-4 body-column"><%- _.escape(employee.FirstName) %></div>'+
        '<div class="col-xs-4 body-column"><%- _.escape(employee.LastName) %></div>'+
        '<div class="col-xs-4 body-column"><%- _.escape(employee.Position.PositionName) %></div>'+
        '</div>'+
        '<% }); %>');
    $("#employees-table").append(template({'employees': employees}));
};

function getFilteredEmployeesModel(filterString){
    let filteredEmployeesModelArray=_.filter(employeesModel, function(emp){
        if(emp.FirstName.toLowerCase().includes(filterString.toLowerCase())
            ||emp.LastName.toLowerCase().includes(filterString.toLowerCase())
            ||emp.Position.PositionName.toLowerCase().includes(filterString.toLowerCase())) return true;
        else return false;            
    });
    return filteredEmployeesModelArray;        
};

function getEmployeeModelById(id){
    let employeeObject = null;
    $.grep(employeesModel, function(n, i) {
        if(n._id==id) 
        employeeObject=_.cloneDeep(n);
        return false;
    });
    return employeeObject;
}


