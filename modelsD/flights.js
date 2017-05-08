module.exports = function(sequelize, DataTypes) { 
    var Flights = sequelize.define("Flights", { 
        id: { 
            type: DataTypes.INTEGER, 
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true
         }, 
         flight_number: { 
             type: DataTypes.INTEGER, 
             allowNull: false
         }, 
         status: { 
             type: DataTypes.STRING, 
             allowNull: true 
         }, 
         arrival_time: { 
             type: DataTypes.TIME,
             allowNull: true
         }
    })
}