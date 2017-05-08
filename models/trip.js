module.exports = function (sequelize, Datatypes) {
    var Trip = sequelize.define("Trip", {
            // uuid: {
            //     type: Datatypes.UUID,
            //     primaryKey: true
            // },
            Departing_To: {
                type: Datatypes.STRING,
                allowNull: false,
                validate: {
                    len: [1]
                }
            },
            Departure_Date: {
                type: Datatypes.DATE,
                allowNull: false
            },
            Return_Date: {
                type: Datatypes.DATE,
                allowNull: false
            }
            },
        {// Associations
            classMethods: {
                associate: function (models) {
                    Trip.hasMany(models.Flight, {
                        onDelete: "cascade"
                    });
                }
            }
        });
    return Trip;
};