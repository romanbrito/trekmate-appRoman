module.exports = function(sequelize, DataTypes) { 
    var Trips = sequelize.define("Trips", { 
         id: { 
            type: DataTypes.INTEGER, 
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true
         }, 
         uuid: {
             type: DataTypes.UUID,
             defaultValue: DataTypes.UUIDV1,
             primaryKey: true
         },
         Departing_to: {
             type: DataTypes.STRING, 
             allowNull: false,
             validate: { len: [1]} 
         },
         Departure_Date: {
             type: DataTypes.Date, 
             allowNull: false, 
         }, 
         Return_Date: { 
             type: DataTypes.Date, 
             allowNull: false, 
         }
    })
}