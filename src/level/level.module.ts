import { Module } from '@nestjs/common';
import { LevelService } from './level.service';
import { LevelController } from './level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trigger } from 'src/trigger/trigger.entity';
import { User } from 'src/user/user.entity';
import { Rank } from 'src/rank/rank.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Trigger, Response, User, Rank]),  // Регистрируем сущности, используемые в сервисе
  ],
  controllers: [LevelController],
  providers: [LevelService],
})
export class LevelModule {}
