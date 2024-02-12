import { DataTypes } from "sequelize"
import sequelize from "../db/connection"

export const User = sequelize.define('user',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        unique:true,
        allowNull: false // no acepta valores nulos

    },
    password:{
        type: DataTypes.STRING,
        allowNull: false // no acepta valores nulos

    }
})