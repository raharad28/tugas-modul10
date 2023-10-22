const { UniqueConstraintError } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Device = sequelize.define("devices", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            unique: true,
            validate: {
                isUnique: async function(value) {
                    const existingDevice = await Device.findOne({ where: { name: value } });
                    if (existingDevice) {
                        throw new Error('nama tidak boleh sama');
                    }
                }
            },
        },
        location: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        },
        sensor_spesifications: {
            type: Sequelize.STRING
        },
        gps_location_latitude: {
            type: Sequelize.DECIMAL(10, 6)
        },
        gps_location_longitude: {
            type: Sequelize.DECIMAL(10, 6)
        },
        device_notification: {
            type: Sequelize.BOOLEAN 
        },
    });

    return Device;
}
