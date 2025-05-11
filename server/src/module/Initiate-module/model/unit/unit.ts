import { DataTypes } from "sequelize";
import sequelize from "../../db-manage/sequelize";

const unitModel = sequelize.define(
    'Unit',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        unitNAme: { type: DataTypes.STRING, allowNull: false },
        isBlock: { type: DataTypes.INTEGER },
        timeId: { type: DataTypes.INTEGER }
    }
);

export default unitModel