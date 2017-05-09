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

// function flightObject (dbFlight, cb) {
//     var apFlight = [];
//     for (var i = 0; i < dbFlight.length; i++) {
//         var flightDate =  dbFlight[i].flight_date;
//         var flightNumber =  dbFlight[i].flight_number;
//         var flightNumberArrStr = flightNumber.split(" ");
//         var airlineCode = flightNumberArrStr[0];
//         var flight = flightNumberArrStr[1];
//         flightDate = dateFormat(flightDate, "yyyy/m/d");
//
//
//         var parameters = "flight/status/" + airlineCode + "/" + flight + "/arr/" + flightDate;
//         var url = FlightQueryURL("flightstatus", "rest", "v2", "json", parameters, "", "flightInfo");
//
//         var request = https.get(url, function (response) {
//             var buffer = ""
//                 ,data;
//             response.on("data", function (chunk) {
//                 buffer += chunk;
//             });
//             response.on("end", function (err) {
//                 apFlight.push(JSON.parse(buffer));
//             });
//         });
//     }
//     cb(apFlight);
// }

function apiObject (counter, flightInfo, dbFlight, i, cb)
{
    console.log("the index is " + i);
    console.log("the counter is " + counter);

    var flightDate =  dbFlight[i].flight_date;
    var flightNumber =  dbFlight[i].flight_number;
    var flightNumberArrStr = flightNumber.split(" ");
    var airlineCode = flightNumberArrStr[0];
    var flight = flightNumberArrStr[1];
    flightDate = dateFormat(flightDate, "yyyy/m/d");


    var parameters = "flight/status/" + airlineCode + "/" + flight + "/arr/" + flightDate;
    var url = FlightQueryURL("flightstatus", "rest", "v2", "json", parameters, "", "flightInfo");

    // var request = https.get(url, function (response) {
    //     var buffer = ""
    //         ,data;
    //     response.on("data", function (chunk) {
    //         buffer += chunk;
    //     });
    //     response.on("end", function (err) {
    //         flightInfo.push(JSON.parse(buffer));
    //     });
    // });
    if(counter > 1) {
        request(url, function (error, response, body) {

            // If the request is successful
            if (!error && response.statusCode === 200) {

                flightInfo.push(JSON.parse(body));


                // console.log("counter " + counter);
                console.log(flightInfo);
                return cb(flightInfo);

            }
        });
    } else {
        // console.log("this is the request var " + request);
        return apiObject(counter-1, flightInfo, dbFlight, i+1);
    }

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
        apiObject(dbFlight.length,[], dbFlight,0, function (data) {
            var hbsObject = {
                flights: dbFlight,
                flighStatus: data
            };
            res.json(hbsObject);
            // res.render("flight", hbsObject);
        });

        // flight api

        // var flightDate = dbFlight[0].flight_date;
        //
        // var flightNumber = dbFlight[0].flight_number;
        // var flightNumberArrStr = flightNumber.split(" ");
        // var airlineCode = flightNumberArrStr[0];
        // var flight = flightNumberArrStr[1];
        // flightDate = dateFormat(flightDate, "yyyy/m/d");
        //
        // // console.log(flightDate);
        // // console.log(airlineCode);
        // // console.log(flight);
        //
        //
        // var parameters = "flight/status/" + airlineCode + "/" + flight + "/arr/" + flightDate;
        //
        // var url = FlightQueryURL("flightstatus", "rest", "v2", "json", parameters, "", "flightInfo");
        //
        // var request = https.get(url, function (response) {
        //     var buffer = ""
        //         ,data;
        //     response.on("data", function (chunk) {
        //         buffer += chunk;
        //     });
        //
        //     response.on("end", function (err) {
        //         var hbsObject = {
        //             flights: dbFlight,
        //             flightStatus: JSON.parse(buffer)
        //         };
        //         res.json(hbsObject);
        //         // res.render("flight", hbsObject);
        //     });
        // });
        //
        //     var hbsObject = {
        //         flights: dbFlight,
        //         flightStatus: apiObject(dbFlight.length-1,[], dbFlight,0)
        //     };

    });
});

module.exports = router;