import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/users.model";

//Данный файл объявляет таблицу и модель 
//по которой данные будут записываться в БД
interface PostCreationAttribues {
    title: string,
    content: string,
    userId: number,
    image: string
}

//Если не укажем имя к декоратору  Table то он его создаст из насзвания класса
@Table
export class Post extends Model<Post, PostCreationAttribues> {
  //ApiProperty - описываем документацию
  @ApiProperty({example: '1', description: 'unique id'})
  //Описываем колонку. Можно не описывать если ts может вывести типы
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true, })
  id: number;

  //Говорим что userId является внешним ключем из User
  @ForeignKey(()=> User)
  @Column
  userId:number

  @ApiProperty({example: 'My super post! Yeah!', description: 'Title for post'})
  @Column({ type: DataType.STRING})
  title: string;


  @ApiProperty({example: 'I was having a coffee morning', description: 'Text for post'})
  @Column({ type: DataType.STRING})
  content: string;

  @ApiProperty({example: 'Base64:sdfsdfsgsfdfs....', description: 'Image in base64'})
  @Column({ type: DataType.STRING})
  image: string;

  //Говорим, что у поста может быть только 1 юзер
  @BelongsTo(() => User)
  author: User

}
