import { DataTypes } from "sequelize";
import sequelize from "../../../initiate/sequelize/sequelize";

const MoniterModel = sequelize.define(
    'moniter',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        timeId: { type: DataTypes.INTEGER }
    }
);

export default MoniterModel