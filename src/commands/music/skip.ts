import { Command, ICommand } from 'helper-package-create-discord-bot';
import { TMetaData } from '../../types/MetaData';
import { getQueue } from './../../utils/getQueue';
import { resetEmbedMusic } from '../../utils/resetEmbedMusic';

const handleEvent = (
  CommandSessionId: string | undefined,
  CommandObject: Command<TMetaData>
) => {
  // handle some event if you want
  CommandObject.on(
    'SuccessPossessOnInteractionCreateEvent',
    ({ interaction, sessionId }) => {
      if (sessionId == CommandSessionId) {
        setTimeout(() => {
          interaction.deleteReply();
        }, 5000);
      }
    }
  );
};

export default {
  name: 'skip',
  description: 'skip music',
  category: 'user',
  aliases: [],
  isSlash: true,
  callback: async ({
    Message: message,
    Interaction: interaction,
    MetaData,
    sessionId,
    CommandObject,
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
    if (!(queue.songs.length > 1)) {
      return 'không có bài hát tiếp theo nếu muốn dừng phát thì dùng lệnh stopMusic'.toLowerCase();
    }
    queue.skip();
    resetEmbedMusic(queue);
    return;
  },
} as ICommand<TMetaData>;
