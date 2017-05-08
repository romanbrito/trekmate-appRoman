module.exports = function(sequelize, DataTypes) { 
    var CarRental = sequelize.define("Car_Rental", { 
        id: { 
            type: DataTypes.INTEGER, 
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true
         },
         Rental_Comp: { 
             type: DataTypes.STRING, 
             allowNull: false, 
             validate: { len: [1]}
         }
    })
}


    ,
    Rental_Date: {
    type: DataTypes.Date,
        allowNull: true
},
Rental_Return: {
    type: DataTypes.Date,
        allowNull: true
}