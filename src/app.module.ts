import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LevelModule } from './level/level.module';
import { ConfigModule, ConfigService} from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseModule } from './response/response.module';
import { TriggerModule } from './trigger/trigger.module';
import { UserModule } from './user/user.module';
import { RankModule } from './rank/rank.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], 
      inject: [ConfigService],  
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT'), 10),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true, 
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
    }),
    LevelModule,
    TriggerModule,
    ResponseModule,
    UserModule,
    RankModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
