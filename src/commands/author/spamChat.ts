import { Command, ICommand } from 'helper-package-create-discord-bot';
import { TMetaData } from '../../types/MetaData';
const handleEvent = (
  _CommandSessionId: string | undefined,
  _CommandObject: Command<TMetaData>
) => {
  // handle some event if you want
};
export default {
  name: 'spamText'.toLowerCase(),
  description: ' spam text',
  category: 'user',
  aliases: ['av'],
  OnlyOwner: true,
  callback: async ({
    client: _client,
    CommandObject,
    sessionId: CommandSessionId,
    Message: message,
    args,
  }) => {
    handleEvent(CommandSessionId, CommandObject);
    if (args) {
      if (args.length >= 2) {
        const NumberSpam = Number(args[0]);
        const spamContent = args.slice(1).join(' ');
        if (NumberSpam > 0) {
          for (let i = 0; i < NumberSpam; i++) {
            await message?.channel.send(spamContent);
            console.log(i);
          }
        }
        return;
      } else {
        return 'bạn nhập thiếu agrument';
      }
    } else {
      return;
    }
  },
} as ICommand<TMetaData>;
