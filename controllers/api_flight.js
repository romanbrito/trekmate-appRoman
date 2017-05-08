var express = require("express");
var router = express.Router();
var http = require('http');
var https = require('https');
var db = require("../models");
var config = require('../config/config.json');

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

// db.Flight.findAll().then(function (dbFlight) {
//     var hbsObject = {
//       flights: dbFlight
//     };
//     res.render("flight", hbsObject);
// });

router.get("/flights", function (req, res) {

    // read tripid cookie
    var TripId = 1;

    db.Flight.findAll({
        include: [db.Trip],
        where: {
            TripId: TripId
        }
    }).then(function (dbFlight) {
        // var hbsObject = [{
        //     flights: dbFlight
        // }];
        // flight api
        var parameters = "flight/status/" + "AA" + "/" + "5919" + "/arr/" + "2017/5/6";
        var url = FlightQueryURL("flightstatus", "rest", "v2", "json", parameters, "", "flightInfo");

        var request = https.get(url, function (response) {
            var buffer = ""
                ,data;
            response.on("data", function (chunk) {
                buffer += chunk;
            });

            response.on("end", function (err) {
                // console.log(buffer);
                // console.log("\n");
                var hbsObject = {
                    flights: dbFlight,
                    flightStatus: JSON.parse(buffer)
                };

                // data = {
                //     flightStatus: JSON.parse(buffer)
                // };
                //res.json(data);
                // hbsObject.push(data);
                // res.json(hbsObject);
                res.render("flight", hbsObject);
                // console.log(data);
            });
        });

        // res.render("index", hbsObject);
        // res.json(hbsObject);
    });
});


// router.get("/flights", function (req, res) {
//     // res.send("<h1>Flights API</h1>");
//
//
//     var parameters = "flight/status/" + "AA" + "/" + "5919" + "/arr/" + "2017/5/6";
//     var url = FlightQueryURL("flightstatus", "rest", "v2", "json", parameters, "", "flightInfo");
//
//     var request = https.get(url, function (response) {
//         var buffer = "",
//             data;
//         response.on("data", function (chunk) {
//             buffer += chunk;
//         });
//
//         response.on("end", function (err) {
//             // console.log(buffer);
//              // console.log("\n");
//             data = JSON.parse(buffer);
//             res.json(data);
//         });
//     });
// });


// router.get("/flights", function (req, res) {
//     // res.send("<h1>Flights API</h1>");
//
//     db.Flight.findAll().then(function (dbFlight) {
//         var hbsObject = {
//           flights: dbFlight
//         };
//         // res.render("flight", hbsObject);
//
//         res.json((hbsObject));
//     });
// });

module.exports = router;