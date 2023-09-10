import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
import { FileInterceptor } from '@nestjs/platform-express';

//Контроллеры занимаются запросами и ответами
//Общением с внешним миром

//Ставим таг для документации 
@ApiTags('Post controller')
//Создаём контроллер
@Controller('posts')
export class PostsController {

    //Делаем инъекцию сервиса, что бы по каким либо запросам
    //обращаться к сервису, который выполнит логику 
    //и обратиться в posts.model с результатами вычислений
    //а model уже работает с БД
    constructor(private postService: PostsService){}

    //Указываем, что метод Post по адресу /posts (название контроллера)
    //Будет делать что то
    @Post()
    //Для работы с файлами необходим Interceptor
    @UseInterceptors(FileInterceptor('image'))
    //Принимаем тело  которое соответствует CreatePostDto
    async createPost(@Body() dto: CreatePostDto,
    @UploadedFile() image: any
    ) {
        return this.postService.create(dto, image)
    }
}
