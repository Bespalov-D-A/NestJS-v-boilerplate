import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './posts.model';
import { FilesModule } from 'src/files/files.module';
import { User } from '../users/users.model';

//Главные комбайн всей  этой сущности (Post)
@Module({
 imports: [
    SequelizeModule.forFeature([User, Post]),
    FilesModule
 ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
