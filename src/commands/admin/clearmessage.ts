import { Command, ICommand } from 'helper-package-create-discord-bot';
import { TMetaData } from '../../types/MetaData';
import { Constants } from 'discord.js';
import moment from 'moment';
const handleEvent = (
  _CommandSessionId: string | undefined,
  _CommandObject: Command<TMetaData>
) => {
  // handle some event if you want
};

export default {
  name: 'clearMessage'.toLowerCase(),
  description: 'get user clear message',
  category: 'user',
  aliases: ['av'],
  permission: ['MANAGE_MESSAGES'],
  options: [
    {
      name: 'messageCount'.toLowerCase(),
      description: 'message count',
      type: Constants.ApplicationCommandOptionTypes.INTEGER,
      required: true,
    },
  ],
  isSlash: true,
  ephemeralReply: true,
  callback: async ({
    CommandObject,
    sessionId: CommandSessionId,
    Message: message,
    Interaction: interaction,
    args,
    option,
  }) => {
    handleEvent(CommandSessionId, CommandObject);
    const messageCount = Number(
      args?.join(' ') ||
        0 ||
        option?.getInteger('messageCount'.toLowerCase(), true)
    );
    if (isNaN(messageCount) || messageCount < 1) {
      console.log(isNaN(messageCount));
    }
    if (message) {
      try {
        await message.delete();
        // delete message
        if (message.channel.type == 'GUILD_TEXT') {
          const messages = await message.channel.messages.fetch({
            limit: messageCount,
          });

          await message.channel.bulkDelete(messages, true);
        }
        return;
      } catch (error) {
        return 'have some error';
      }
    } else if (interaction) {
      if (interaction.channel?.type == 'GUILD_TEXT') {
        const messages = await interaction.channel.messages.fetch({
          limit: messageCount,
        });

        await interaction.channel.bulkDelete(messages, true);
      }
      return 'đã xoá thành công';
    }
    return 'có lỗi';
  },
} as ICommand<TMetaData>;
