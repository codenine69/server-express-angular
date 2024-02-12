import { Sequelize } from "sequelize";

const sequelize = new Sequelize('rrhh','root','Rolando',{
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;