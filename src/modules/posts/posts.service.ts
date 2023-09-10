import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { CreatePostDto } from './dto/create-post.dto';
import { FilesService } from 'src/files/files.service';

//Тут мы будем описывать логику и работу
//Service самые объемные и бОльшая часть логики тут

//Указывает что этот класс будет инъецироваться куда либо
@Injectable()
export class PostsService {
    //Делаем инъекцию - "вкалываем" Post model для того, что бы
    //записывать что либо в БД
    constructor(@InjectModel(Post) private postReposiory: typeof Post ,
    private fileService: FilesService
    ) {}

    async create(dto: CreatePostDto, image: any) {
        const fileName = await this.fileService.createFile(image)
        const post = await this.postReposiory.create({...dto, image: fileName})
        return post
    }
}
