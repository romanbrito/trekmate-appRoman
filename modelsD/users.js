module.exports = function(seqelize, DataTypes) { 
    var Users = sequelize.define("Users", { 
        id: { 
            type: DataTypes.INTEGER, 
            allowNull: false, 
            primaryKey: true,
            autoIncrement: true
         },
         first_name:{ 
            type: DataTypes.STRING, 
            allowNull: false,
            validate: { len: [1]}
         },
         last_name: { 
             type: DataTypes.STRING, 
             allowNull: false,
             validate: { len: [1]}
         },
         email_address: { 
             type: DataTypes.STRING,
             allowNull: false,
             validate: {len: [1]}
         }, 
         phone_number: { 
            type: DataTypes.INTEGER, 
            allowNull: true, 
            validate: { len: [10]}
         },
         twitter_link: {
             type: DataTypes.STRING, 
             allowNull: true, 
         }, 
         facebook_link: { 
             type: DataTypes.STRING, 
             allowNull: true
         }   
    });
    return Users;
};