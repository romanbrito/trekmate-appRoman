module.exports = function (sequelize, Datatypes) {
    var Flight = sequelize.define("Flight", {
            flight_number: {
                type: Datatypes.STRING,
                allowNull: false
            },
            flight_date: {
                type: Datatypes.DATE,
                allowNull: true
            },
            city_departure: {
                type: Datatypes.STRING,
                allowNull: true
            }
        },
        {// Associations
            classMethods: {
                associate: function (models) {
                    Flight.belongsTo(models.Trip, {
                        foreignKey: {
                            allowNull: true
                            // foreignKey created TripId
                        }
                    });
                }
            }
        });
    return Flight;
};