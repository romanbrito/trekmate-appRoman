module.exports = function (sequelize, Datatypes) {
    var CarRental = sequelize.define("CarRental", {
            Rental_Comp: {
                type: Datatypes.STRING,
                allowNull: false,
                validate: {
                    len: [1]
                }
            },
            Rental_Address: {
                type: Datatypes.STRING,
                allowNull: true
            },
            Rental_Date: {
                type: Datatypes.DATE,
                allowNull: true
            },
            Rental_Return: {
                type: Datatypes.DATE,
                allowNull: true
            }
        },
        {// Associations

        });
    return CarRental;
};