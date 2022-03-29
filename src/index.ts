import { Client } from 'discord.js';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({
  path: path.join(__dirname, '../.env'),
});
import { allIntents } from './constants';
import { Command, Log } from 'helper-package-create-discord-bot';
import { TMetaData } from './types/MetaData';
import DisTube from 'distube';
import { getMusicEmbed } from './utils/sendMusicEmbed';
import { GetMessageMusicButton } from './utils/GetMessageMusicButton';
import { handleMessageMusicButton } from './hendler/handleMessageMusicButton';
import { onAppCrash } from './hendler/onerror';

const client = new Client({
  intents: allIntents,
  partials: [
    'MESSAGE',
    'CHANNEL',
    'REACTION',
    'USER',
    'GUILD_MEMBER',
    'GUILD_SCHEDULED_EVENT',
  ],
});
const isDev = process.env.NODE_ENV !== 'production';

const player = new DisTube(client, {
  youtubeDL: true,
  leaveOnEmpty: true,
  leaveOnStop: true,
});
player.on('error', (channel, error) => {
  console.log(error);
  channel.send('bot xảy ra một số lỗi vui lòng thử lại sau');
});

client.login(process.env.BOT_KEY);
const command = new Command<TMetaData>(client, {
  commandDir: path.join(__dirname, './commands'),
  owner: ['889140130105929769'],
  isDev,
  LogForMessageAndInteraction: isDev,
  typescript: true,
  metaData: {
    player,
  },
});

player.on('playSong', (queue, song) => {
  let username: undefined | string = undefined;
  // check song.metadata.user have the user and you can get the username
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const metadata: any = song.metadata;
  if (metadata.user) {
    username = metadata.user;
  }
  if (queue.textChannel) {
    const embed = getMusicEmbed(queue, song, username);
    const row = GetMessageMusicButton(queue);
    queue.textChannel
      .send({
        embeds: [...embed],
        components: [...row],
      })
      .then((message) => {
        metadata.messageId = message.id;
        handleMessageMusicButton(message, queue, username);
      });
  }
});
player.on('addSong', (queue, _song) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const metaData = queue.songs[0].metadata as any;
  if (queue.textChannel && metaData.messageId) {
    const row = GetMessageMusicButton(queue);
    // get message by message id
    queue.textChannel.messages.fetch(metaData.messageId).then((message) => {
      message.edit({
        components: [...row],
      });
    });
  }
});

player.on('finishSong', (queue, song) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const metadata: any = song.metadata;
  if (metadata.messageId) {
    queue.textChannel?.messages.fetch(metadata.messageId).then((msg) => {
      if (msg) {
        if (msg.deletable) msg.delete();
      }
    });
  }
});
client.on('ready', async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }
  command.init();
  onAppCrash();
  Log.Log('Client', 'Ready to go! bot name :', client.user?.tag);
});
client.on('error', (error) => {
  console.log(error);
});
