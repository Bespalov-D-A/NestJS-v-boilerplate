import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'myemail2004@mail.com', description: 'User email'})
    @IsString({message: 'It should be a string'})
    @IsEmail({},{message: 'Incorrect email'})
    readonly email: string;
    @IsString({message: 'It should be a string'})
    @ApiProperty({example: 'MySuperPass!2004', description: 'User password'})
    @Length(4,16,{message: 'Min lenth 4 charaters and Max lenth 16 charaters'})
    readonly password: string;
}