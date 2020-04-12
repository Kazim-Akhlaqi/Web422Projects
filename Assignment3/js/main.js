/*********************************************************************************
 * WEB422 – Assignment 3
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Kazim Akhlaqi Student ID: 103638177 Date: Feb 15, 2019
 * https://glacial-hollows-29191.herokuapp.com/teams
 ********************************************************************************/
var viewModel = {
    teams: ko.observable([]),
    employees: ko.observable([]),
    projects: ko.observable([])
};

function showGenericModal(title, message) {
    $(".modal-title").empty()
        .append(title);
    $(".modal-body").empty()
        .append(message);
    $("#genericModal").modal('show');
};

function initializeTeams() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "https://glacial-hollows-29191.herokuapp.com/teams-raw",
            type: "GET",
            contentType: "application/json"
        })
            .done(function (data) {
                let sortedData = _.sortBy(data,function (team) {    
                    return parseInt(team.TeamName.slice(-2), 10);
                 });
                viewModel.teams = ko.mapping.fromJS(sortedData);
                resolve();
            })
            .fail(function () {
                reject("Error loading the team data");
            });
    });
};

function initializeEmployees() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "https://glacial-hollows-29191.herokuapp.com/employees",
            type: "GET",
            contentType: "application/json"
        })
            .done(function (data) {
                viewModel.employees = ko.mapping.fromJS(data);
                resolve();
            })
            .fail(function () {
                reject("Error loading the employee data");
            });
    });
};

function initializeProjects() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "https://glacial-hollows-29191.herokuapp.com/projects",
            type: "GET",
            contentType: "application/json"
        })
            .done(function (data) {
                viewModel.projects = ko.mapping.fromJS(data);
                resolve();
            })
            .fail(function () {
                reject("Error loading the 'project' data");
            });
    });
};

function saveTeam() {
    var currentTeam = this;
    $.ajax({
        url: "https://glacial-hollows-29191.herokuapp.com/team/" + currentTeam._id(),
        type: "PUT",
        data: JSON.stringify(
            {
                Projects: currentTeam.Projects(),
                Employees: currentTeam.Employees(),
                TeamLead: currentTeam.TeamLead()
            }
        ),
        contentType: "application/json"
    }).done(function () {
            showGenericModal("Success", currentTeam.TeamName() + " Updated Successfully");
        })
        .fail(function () {
            showGenericModal("Error", "Error updating the team information.");
        });
};

$(document).ready(function () {
    console.log("jQuery Working");
    try{
    initializeTeams()
        .then(initializeEmployees)
        .then(initializeProjects)
        .then(() => {
            ko.applyBindings(viewModel, $("body")[0]);
            $("select.multiple").multipleSelect({ filter: true });
            $("select.single").multipleSelect({ single: true, filter: true });
        })
    } catch(err) {
            showGenericModal("Error", err);
        };
});