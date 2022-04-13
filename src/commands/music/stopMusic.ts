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
  name: 'stopMusic'.toLowerCase(),
  description: 'stop music',
  category: 'user',
  aliases: [],
  isSlash: true,
  callback: async ({
    CommandObject,
    sessionId: CommandSessionId,
    Message: message,
    Interaction: interaction,
    MetaData,
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
      handleEvent(CommandSessionId, CommandObject);
    }
    queue.stop();
    resetEmbedMusic(queue);
    return;
  },
} as ICommand<TMetaData>;
