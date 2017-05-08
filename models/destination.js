module.exports = function (sequelize, Datatypes) {
    var Destination = sequelize.define("Destination", {
            country: {
                type: Datatypes.STRING,
                allowNull: false
            },
            city: {
                type: Datatypes.STRING,
                allowNull: false
            },
            longitude: {
                type: Datatypes.INTEGER,
                allowNull: false
            },
            latitude: {
                type: Datatypes.INTEGER,
                allowNull: false
            }
        },
        {// Associations

        });
    return Destination;
};