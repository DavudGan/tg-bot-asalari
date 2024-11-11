import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LevelModule } from './level/level.module';

@Module({
  imports: [LevelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
