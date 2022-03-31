import { Command, ICommand } from 'helper-package-create-discord-bot';
import { TMetaData } from '../../types/MetaData';
import { getQueue } from './../../utils/getQueue';
import { Constants, Message } from 'discord.js';
import { resetEmbedMusic } from '../../utils/resetEmbedMusic';
import { RepeatMode } from 'distube';

const handleEvent = (
  CommandSessionId: string | undefined,
  CommandObject: Command<TMetaData>
) => {
  // handle some event if you want
  CommandObject.on(
    'SuccessPossessOnInteractionCreateEvent',
    ({ InteractionSend,interaction, sessionId }) => {
      if (sessionId == CommandSessionId) {
        setTimeout(() => {
          interaction.deleteReply();
        },5000);
      }
    }
  );
};

export default {
  name: 'LoopThisMusic'.toLowerCase(),
  description: 'stop music',
  category: 'user',
  aliases: [],
  isSlash: true,
  options: [
    {
      name: 'action',
      type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND_GROUP,
      description: 'điều mà bạn muốn làm',
      options: [
        {
          name: 'on',
          description: 'bật lặp lại nhạc',
          type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
        },
        {
          name: 'off',
          description: 'tắt lặp lại nhạc',
          type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
        },
      ],
    },
  ],
  callback: async ({
    Message: message,
    Interaction: interaction,
    MetaData,
    args,
    option,
    sessionId,
    CommandObject
  }) => {
    const guild = message?.guild || interaction?.guild;
    const memberVoiceChannel =
      message?.member?.voice.channel ||
      interaction?.guild?.members.cache.get(interaction.user.id)?.voice.channel;
    if (!guild) {
      return 'bạn phải dùng lệnh trong server';
    }
    const queue = getQueue(MetaData, guild, memberVoiceChannel);
    if (typeof queue == 'string') {
      return queue;
    } else {
      handleEvent(sessionId, CommandObject);
    }
    if (message && args) {
      const command = args[0];
      if (command == 'on') {
        queue.setRepeatMode(RepeatMode.SONG);
        resetEmbedMusic(queue);
        return 'đã bật lặp lại nhạc';
      } else if (command == 'off') {
        queue.setRepeatMode(RepeatMode.DISABLED);
        resetEmbedMusic(queue);
        return 'đã tắt lặp lại nhạc';
      }
    } else if (interaction) {
      const command = option?.getSubcommand();
      if (command == 'on') {
        queue.setRepeatMode(RepeatMode.SONG);
        resetEmbedMusic(queue);
        return 'đã bật lặp lại nhạc';
      } else if (command == 'off') {
        queue.setRepeatMode(RepeatMode.DISABLED);
        resetEmbedMusic(queue);
        return 'đã tắt lặp lại nhạc';
      }
    }

    
    return 'có lỗi xảy ra';
  },
} as ICommand<TMetaData>;
