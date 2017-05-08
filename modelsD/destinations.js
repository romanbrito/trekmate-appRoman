module.exports = function(sequelize, DataTypes) { 
    var Destinations = sequelize.define("Destinations", { 
            id: { 
                type: DataTypes.INTEGER, 
                allowNull: false, 
                primaryKey: true,
                autoIncrement: true
            },
            country: {
                type: DataTypes.STRING, 
                allowNull: false
            }, 
            city: { 
                type: DataTypes.STRING, 
                allowNull: false
            },
            longitude: { 
                type: DataTypes.INTEGER, 
                allowNull: false, 
            }, 
            latitude: { 
                type: DataTypes.INTEGER, 
                allowNull: false
            }
    })
}

            