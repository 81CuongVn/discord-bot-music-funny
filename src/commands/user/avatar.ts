import { Command, ICommand } from 'helper-package-create-discord-bot';
import { TMetaData } from '../../types/MetaData';
const handleEvent = (
  _CommandSessionId: string | undefined,
  _CommandObject: Command<TMetaData>
) => {
  // handle some event if you want
};
export default {
  name: 'avatar',
  description: 'get user avatar',
  category: 'user',
    aliases: ['av'],
  callback: async ({
    client,
    CommandObject,
    sessionId: CommandSessionId,
    Message,
    Interaction,
  }) => {
    handleEvent(CommandSessionId, CommandObject);
  },
} as ICommand<TMetaData>;
