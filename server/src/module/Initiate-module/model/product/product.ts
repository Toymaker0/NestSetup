import { DataTypes } from "sequelize";
import sequelize from "../../../initiate/sequelize/sequelize";

const productModel = sequelize.define(
    'product',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        prodName: { type: DataTypes.STRING, allowNull: false },
        unitId: { type: DataTypes.INTEGER },
        timeId: { type: DataTypes.INTEGER },
        isValid: { type: DataTypes.INTEGER }
    }
);

export default productModel