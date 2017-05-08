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
        // var hbsObject = [{
        //     flights: dbFlight
        // }];
        // flight api
        // var flightDate = dbFlight[0].flight_date.toString();
        // console.log(flightDate);
        // var arrStr = flightDate.split("-");
        // var year = arrStr[0];
        // var month = arrStr[1];
        // var day = arrStr[2];
        // var arrMonth = month.split("");
        // if (arrMonth[0] === "0") {
        //     month = arrMonth[1];
        // }
        // var arrDay = day.split("");
        // if (arrDay[0] === "0") {
        //     day = arrDay[1];
        // }
        //
        // flightDate = year + "/" + month + "/" + day;

        flightDate = "2017/5/5";

        var parameters = "flight/status/" + "AA" + "/" + "5919" + "/arr/" + flightDate;
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
                res.json(hbsObject);
                // res.render("flight", hbsObject);
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