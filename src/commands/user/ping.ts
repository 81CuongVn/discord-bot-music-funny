import { Message } from 'discord.js';
import { Command, ICommand } from 'helper-package-create-discord-bot';
import { TMetaData } from '../../types/MetaData';
const handleEvent = (
  CommandSessionId: string | undefined,
  CommandObject: Command<TMetaData>
) => {
  CommandObject.on(
    'SuccessPossessOnMessageCreateEvent',
    async ({ messageAfterSend: messageSend, sessionId }) => {
      if (sessionId === CommandSessionId) {
        await messageSend.react('🇵');
        await messageSend.react('🇴');
        await messageSend.react('🇳');
        await messageSend.react('🇬');
      }
    }
  );
  CommandObject.on(
    'SuccessPossessOnInteractionCreateEvent',
    async ({ InteractionSend, sessionId }) => {
      if (sessionId === CommandSessionId) {
        if (InteractionSend instanceof Message) {
          await InteractionSend.react('🇵');
          await InteractionSend.react('🇴');
          await InteractionSend.react('🇳');
          await InteractionSend.react('🇬');
        }
      }
    }
  );
};
export default {
  name: 'ping',
  description: 'Ping',
  category: 'user',
  aliases: ['p'],
  isSlash: true,
  callback: async ({ client, CommandObject, sessionId: CommandSessionId }) => {
    handleEvent(CommandSessionId, CommandObject);
    return 'Pong! ping : ' + client.ws.ping + 'ms';
  },
} as ICommand<TMetaData>;
