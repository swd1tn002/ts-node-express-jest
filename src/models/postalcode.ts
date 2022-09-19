import { Model, DataTypes, Sequelize, Op, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { sequelize } from './index';


export class PostalCode extends Model<InferAttributes<PostalCode>, InferCreationAttributes<PostalCode>> {
    declare id: CreationOptional<number>;
    declare code: string;
    declare name: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    static async findByCode(code: string): Promise<PostalCode | null> {
        return await PostalCode.findOne({ where: { code } });
    }

    static async findByName(name: string): Promise<PostalCode[]> {
        return await PostalCode.findAll({ where: { name: { [Op.like]: name } }, order: [['code', 'ASC']] });
    }
}

PostalCode.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'PostalCode',
        sequelize
    }
);