import { Constants } from 'discord.js';
import { Command, ICommand } from 'helper-package-create-discord-bot';
import { TMetaData } from '../../types/MetaData';
import { isValidURL } from '../../utils/isValidURL';
import { playMusic } from './../../utils/PlayMusic';
import { CheckVoiceChannel } from './../../utils/CheckVoiceChannel';

const handleEvent = (
  CommandSessionId: string | undefined,
  CommandObject: Command<TMetaData>
) => {
  CommandObject.on(
    'SuccessPossessOnMessageCreateEvent',
    ({ messageAfterSend, sessionId }) => {
      if (CommandSessionId === sessionId) {
        setTimeout(() => {
          if (messageAfterSend.deletable) messageAfterSend.delete();
          // if (message.deletable) message.delete();
        }, 10000);
      }
    }
  );
};

export default {
  name: 'play',
  description: 'play the music',
  category: 'music',
  aliases: ['pl'],
  options: [
    {
      name: 'musicName'.toLowerCase(),
      description: 'music name',
      type: Constants.ApplicationCommandOptionTypes.STRING,
      required: true,
    },
  ],
  isSlash: true,
  ephemeralReply: true,
  DeferReply: true,
  callback: async ({
    Message: message,
    Interaction: interaction,
    CommandObject,
    args,
    option,
    sessionId,
  }) => {
    if (!message?.guildId && !interaction?.guildId) {
      return 'You must be in a guild to use this command';
    }
    const Player = CommandObject.MetaData.player;
    const musicName =
      args?.join(' ') || option?.getString('musicName'.toLowerCase());
    if (!musicName) {
      return 'You must enter a music name';
    }
    handleEvent(sessionId, CommandObject);
    if (message) {
      const VoiceChannel = CheckVoiceChannel(
        message.member?.voice.channel,
        message.guild?.me?.voice.channel
      );

      if (typeof VoiceChannel === 'string') {
        return VoiceChannel;
      }

      if (message.channel.type !== 'GUILD_TEXT') {
        return 'bạn phải ở trong kênh nhạc của mình';
      }
      if (isValidURL(musicName)) {
        await playMusic(
          Player,
          VoiceChannel,
          musicName,
          message.channel,
          message.author.id
        );
      } else {
        await playMusic(
          Player,
          VoiceChannel,
          musicName,
          message.channel,
          message.author.id
        );
      }
      return 'đã thêm bài hát vào danh sách phát';
    } else if (interaction) {
      const member = interaction.guild?.members.cache.get(interaction.user.id);
      const VoiceChannel = CheckVoiceChannel(
        member?.voice.channel,
        interaction.guild?.me?.voice.channel
      );
      if (typeof VoiceChannel === 'string') {
        return VoiceChannel;
      }
      if (!interaction.channel) {
        return;
      }
      if (interaction.channel.type !== 'GUILD_TEXT') {
        return;
      }
      if (isValidURL(musicName)) {
        await playMusic(
          Player,
          VoiceChannel,
          musicName,
          interaction.channel,
          interaction.user.id
        );
      } else {
        await playMusic(
          Player,
          VoiceChannel,
          musicName,
          interaction.channel,
          interaction.user.id
        );
      }
      return 'đã thêm bài hát vào danh sách phát';
    }
    return 'có lỗi';
  },
} as ICommand<TMetaData>;
