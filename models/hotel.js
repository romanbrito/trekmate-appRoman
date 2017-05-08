module.exports = function (sequelize, Datatypes) {
    var Hotel = sequelize.define("Hotel", {
            hotel_name: {
                type: Datatypes.STRING,
                allowNull: false,
                validate: {
                    len: [1]
                }
            },
            hotel_address: {
                type: Datatypes.STRING,
                allowNull: true
            },
            checkIn_Time: {
                type: Datatypes.TIME,
                allowNull: true
            }
        },
        {// Associations

        });
    return Hotel;
};