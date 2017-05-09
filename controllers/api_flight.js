var express = require("express");
var router = express.Router();
var request = require("request");
var db = require("../models");
var config = require('../config/config.json');
var dateFormat = require('dateformat');

function FlightQueryURL(APIname, protocol, version, format, parameters, options) {

    const baseURI = config.flightStats.baseURL;
    const appId = config.flightStats.appId;
    const appKey = config.flightStats.appKey;

    var queryURL = baseURI +
        "/" + APIname +
        "/" + protocol +
        "/" + version +
        "/" + format +
        "/" + parameters +
        appId + appKey +
        options;

    return queryURL;
}

// function flightObject

function apiObject (flightNumber, flightDate ,cb)
{
    var flightNumberArrStr = flightNumber.split(" ");
    var airlineCode = flightNumberArrStr[0];
    var flight = flightNumberArrStr[1];
    flightDate = dateFormat(flightDate, "yyyy/m/d");


    var parameters = "flight/status/" + airlineCode + "/" + flight + "/arr/" + flightDate;
    var url = FlightQueryURL("flightstatus", "rest", "v2", "json", parameters, "", "flightInfo");

    request(url, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {

            var flightInfo = JSON.parse(body);
            // console.log(flightInfo);
            return cb(flightInfo);
        }
    });
}

router.post("/flights", function (req, res) {
    db.Flight.create({
        flight_number: req.body.FlightNumber
    }).then(function (dbFlight) {
        res.redirect("/");
    });
});


router.get("/flights", function (req, res) {

    // read tripid cookie
    var TripId = 1;

    db.Flight.findAll({
        include: [db.Trip],
        where: {
            TripId: TripId
        }
    }).then(function (dbFlight) {

        var hbsObject = {
            flights: dbFlight
        };
        // res.json(hbsObject);
        res.render("flight", hbsObject);
    });
});

router.post("/flightStats", function (req, res) {
var flightNumber = req.body.flightNumber;
var flightDate = req.body.flightDate;
    console.log(flightNumber);
    console.log(flightDate);
    apiObject(flightNumber, flightDate, function (data) {
        res.render("flightStats", data);
        // res.json(data);
    });
});

module.exports = router;