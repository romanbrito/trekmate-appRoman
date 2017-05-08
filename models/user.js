module.exports = function (sequelize, Datatypes) {
    var User = sequelize.define("User", {
        first_name: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        last_name: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        email_address: {
            type: Datatypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        phone_number: {
            type: Datatypes.STRING,
            allowNull: true,
            validate: {
                len: [10]
            }
        },
        twitter_link: {
            type: Datatypes.STRING,
            allowNull: true
        },
        facebook_link: {
            type: Datatypes.STRING,
            allowNull: true
        }
    },
        { // Associations

        });
    return User;

    };