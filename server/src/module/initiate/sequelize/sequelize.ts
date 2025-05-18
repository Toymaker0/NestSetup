
import { Sequelize } from "sequelize"

const sequelize = new Sequelize('server', 'root', 'rootpassword', {
    host: 'localhost',
    port:3307,
    dialect: 'mariadb'
})
export default sequelize
