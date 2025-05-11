import { DataTypes } from "sequelize";
import sequelize from "../../db-manage/sequelize";

const UserModel = sequelize.define(
    'User',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING },
        userName: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING },
        roleId: { type: DataTypes.INTEGER, defaultValue: null },
        isBlock: { type: DataTypes.INTEGER, defaultValue: 1 },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        }
    }
)

export default UserModel