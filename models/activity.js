module.exports = function (sequelize, Datatypes) {
    var Activity = sequelize.define("Activity", {
            Activity_Name: {
                type: Datatypes.STRING,
                allowNull: false
            },
            Description: {
                type: Datatypes.TEXT,
                allowNull: true
            },
            Activity_Date: {
                type: Datatypes.DATE,
                allowNull: true
            },
            Activity_Time: {
                type: Datatypes.TIME,
                allowNull: true
            }
        },
        {// Associations

        });
    return Activity;
};