import { Table, Column, Model, DataType, Default } from 'sequelize-typescript';

@Table({
    tableName: 'products'
})

class Product extends Model {

    @Column({
        type: DataType.STRING(100),
        defaultValue: 'lalal'
    })
    name: string

    @Column({
        type: DataType.FLOAT(10, 2)
    })
    price: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    availability: boolean
}

export default Product;