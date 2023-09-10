import { ConsoleLogger, Global, Module  } from "@nestjs/common";
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
import { ASYNC_CHECK_AND_CREATE_ROLES, CONFIG_OPTIONS } from "./helpers/constants";
import { RolesService } from "./modules/roles/roles.service";
import { defaultRoles, defaultRolesName } from "./modules/roles/assests/defaultRoles";
import { DefaultConfigOptionsModule } from "./modules/default-config-options/default-config-options.module";
import { defaultConfig } from "./modules/default-config-options/config/defaultConfig";

@Module({
  controllers: [],
  providers: [
    {
      provide: ASYNC_CHECK_AND_CREATE_ROLES, //create base data (roles)
      useFactory: async (rolesService: RolesService) => {
        for(let i = 0; i < defaultRoles.length; i++) {
        await rolesService.createRole(defaultRoles[i], 'init')  
        }
      },
      inject: [RolesService]
    },
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
    DefaultConfigOptionsModule.forRoot(defaultConfig),
  ]
})
export class AppModule {}
