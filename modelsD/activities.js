module.exports = function(sequelize, DataTypes) { 
    var Trips = sequelize.define("Activities", { 
         id: { 
            type: DataTypes.INTEGER, 
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true
         }, 
         Activity_Name: { 
             type: DataTypes.STRING,    
             allowNull: false, 
         },
         Description: { 
             type: DataTypes.STRING, 
             allowNull: false
         }, 
         Time_of_Event: { 
             type: DataTypes.TIME, 
             allowNull: false, 
         }
    })
}  