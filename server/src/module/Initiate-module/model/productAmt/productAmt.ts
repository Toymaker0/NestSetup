import { DataTypes } from "sequelize";
import sequelize from "../../db-manage/sequelize";

const productAmtModel = sequelize.define(
    'productAmt',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        prodId: { type: DataTypes.INTEGER, allowNull: false },
        amt: { type: DataTypes.INTEGER },
        timeId: { type: DataTypes.INTEGER },
        isValid: { type: DataTypes.INTEGER }
    }
);

export default productAmtModel