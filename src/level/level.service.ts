import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Trigger } from '../trigger/trigger.entity';
import { Response } from '../response/response.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Rank } from 'src/rank/rank.entity';

@Injectable()
export class LevelService implements OnModuleInit {
  private bot: TelegramBot;

  constructor(
    private configService: ConfigService,
    @InjectRepository(Trigger)
    private triggerRepository: Repository<Trigger>,
    @InjectRepository(Response)
    private responseRepository: Repository<Response>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Rank) private rankRepository: Repository<Rank>,
  ) {}

  onModuleInit() {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    this.bot = new TelegramBot(token, { polling: true });

    this.bot.onText(/\/салам алейкум/i, (msg) => this.handleHelloCommand(msg));
    this.bot.onText(/нет/i, (msg) => this.handleNotCommand(msg));

    this.bot.onText(/\/register/, (msg) => this.handleRegisterCommand(msg));
    this.bot.onText(/\/level/, (msg) => this.handleLevelCommand(msg));
  }

  private handleHelloCommand(msg: TelegramBot.Message) {
    const chatId = msg.chat.id;
    const userName = msg.from?.first_name;
    const stickerId =
      'CAACAgIAAxkBAAEJ9OtnMkohjJgmcFabTQeMq-qspPdQGQACPkkAAhK7OEi_HNN0ZlYtITYE';

    this.bot.sendMessage(chatId, `${userName}, салам алейкум! 👋🏿`);
    this.bot.sendSticker(chatId, stickerId);
  }

  private async handleNotCommand(msg: TelegramBot.Message) {
    const chatId = msg.chat.id;

    const trigger = await this.triggerRepository.findOne({
      where: {
        phrase: 'нет',
      },
      relations: ['responses'],
    });

    // console.log(trigger);

    if (trigger && trigger.responses.length > 0) {
      const randomResponse =
        trigger.responses[Math.floor(Math.random() * trigger.responses.length)];
      console.log(randomResponse);
      this.bot.sendMessage(chatId, randomResponse.response);
    } else {
      this.bot.sendMessage(chatId, 'Нет ответа для этого триггера');
    }
  }

  private async handleRegisterCommand(msg: TelegramBot.Message) {
    const chatId = msg.chat.id;
    const userName = msg.from?.username || msg.from?.first_name || 'User';
    const rank = await this.rankRepository.findOne({ where: { id: 1 } });

    // Проверка, зарегистрирован ли пользователь
    const existingUser = await this.userRepository.findOne({
      where: [{ name: userName }],
    });
    console.log(existingUser);
    if (existingUser) {
      this.bot.sendMessage(
        chatId,
        `Вы уже зарегистрированы, ${existingUser.name}!`,
      );
      return;
    }

    // Создание нового пользователя
    const newUser = this.userRepository.create({
      chatId,
      name: userName,
      rank: rank,
    });
    await this.userRepository.save(newUser);

    this.bot.sendMessage(
      chatId,
      `Добро пожаловать, ${userName}! Вы успешно зарегистрировались.`,
    );
  }

  private async handleLevelCommand(msg: TelegramBot.Message) {
    const chatId = msg.chat.id;
    const userName = msg.from?.username || msg.from?.first_name || 'User';

    // Поиск пользователя по имени
    const user = await this.userRepository.findOne({
      where: [{ name: userName }],
      relations: ['rank'],
    });
    console.log(user);
    if (!user) {
      this.bot.sendMessage(
        chatId,
        'Вы не зарегистрированы. Введите команду /register, чтобы зарегистрироваться.',
      );
      return;
    }

    this.bot.sendMessage(
      chatId,
      `${user.name}, ваш текущий уровень: ${user.rank.title}`,
    );
  }
}
