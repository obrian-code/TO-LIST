import { BaseEntity, Column, Entity } from "typeorm";

@Entity({ name: 'user' })
export class User extends BaseEntity {
    @Column()
    nombre: string

    @Column({
        unique: true,
    })
    correo: string

    @Column()
    contrasena: string
}