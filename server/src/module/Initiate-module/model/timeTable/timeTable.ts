import { DataTypes } from "sequelize";
import sequelize from "../../db-manage/sequelize";

const TimeModel = sequelize.define(
    'time',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        time: { type: DataTypes.TIME, allowNull: false },
        date: { type: DataTypes.DATE },
        userId: { type: DataTypes.INTEGER ,allowNull: false}
    }
);

export default TimeModel