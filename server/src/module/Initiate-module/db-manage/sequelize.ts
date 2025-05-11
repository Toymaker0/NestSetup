
import { Sequelize } from "sequelize"

const sequelize = new Sequelize('server', 'root', 'rootpassword', {
    host: 'localhost',
    dialect: 'mariadb'
})
export default sequelize
