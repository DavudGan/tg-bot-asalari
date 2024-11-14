import { Controller, Get } from '@nestjs/common';
import { RankService } from './rank.service';

@Controller('rank')
export class RankController {
  constructor(private readonly rankService: RankService) {}

  @Get()
  async get(){
      return 'Мы еще не передаем данные прости('
  }
}
