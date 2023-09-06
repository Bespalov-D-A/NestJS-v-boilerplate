import { ConsoleLogger, Module  } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './modules/auth/auth.module';
import { FilesService } from './files/files.service';
import { FilesModule } from "./files/files.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";
import { User } from "./modules/users/users.model";
import { Role } from "./modules/roles/roles.model";
import { UserRoles } from "./modules/roles/userroles.model";
import { Post } from "./modules/posts/posts.model";
import { UsersModule } from "./modules/users/users.module";
import { RolesModule } from "./modules/roles/roles.module";
import { PostsModule } from "./modules/posts/posts.module";
import { GoogleStrategy } from "./modules/auth/strategies/google.strategy";

@Module({
  controllers: [],
  providers: [
    {
        provide: ConsoleLogger,
        useValue: new ConsoleLogger(),
      },
    FilesService,
    GoogleStrategy
  ],
  imports: [
    ConfigModule.forRoot({
        envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Post, ],
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ],
})
export class AppModule {}
