import { Injectable, OnModuleInit } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { ConfigService } from '@nestjs/config';

const notArray = [
  'Ты что каконати ?',
  'Рот закрой!',
  'Каканаточки ответ',
  'Бичихи ответ',
];

@Injectable()
export class LevelService implements OnModuleInit {
  private bot: TelegramBot;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    this.bot = new TelegramBot(token, { polling: true });

    this.bot.onText(/\/салам алейкум/, (msg) => this.handleHelloCommand(msg));
    this.bot.onText(/\/level/, (msg) => this.handleLevelCommand(msg));
    this.bot.onText(/нет/, (msg) => this.handleNotCommand(msg));
  }

  private handleHelloCommand(msg: TelegramBot.Message) {    
    const chatId = msg.chat.id;
    const userName = msg.from?.first_name;
    const stickerId =
      'CAACAgIAAxkBAAEJ9OtnMkohjJgmcFabTQeMq-qspPdQGQACPkkAAhK7OEi_HNN0ZlYtITYE';

    this.bot.sendMessage(chatId, `${userName}, салам алейкум! 👋🏿`);
    this.bot.sendSticker(chatId, stickerId);
  }

  private handleLevelCommand(msg: TelegramBot.Message) {
    const chatId = msg.chat.id;
    const userName = msg.from?.first_name;
    this.bot.sendMessage(chatId, `${userName} кажется ты каконати`);
  }

  private handleNotCommand(msg: TelegramBot.Message) {
    const chatId = msg.chat.id;
    const randomElement = notArray[Math.floor(Math.random() * notArray.length)];
    this.bot.sendMessage(chatId, randomElement);
  }
}
