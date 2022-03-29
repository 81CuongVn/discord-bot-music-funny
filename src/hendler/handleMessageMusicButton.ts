import {
  CacheType,
  CollectorFilter,
  InteractionUpdateOptions,
  Message,
  MessageComponentInteraction,
  MessagePayload,
} from 'discord.js';
import { Queue, Song } from 'distube';
import {
  ButtonId,
  GetMessageMusicButton,
} from '../utils/GetMessageMusicButton';
import { getMusicEmbed } from '../utils/sendMusicEmbed';

const getMessageSend = (
  queue: Queue,
  nowSong: Song<unknown>,
  username: string | undefined
): string | MessagePayload | InteractionUpdateOptions => {
  const row = GetMessageMusicButton(queue);
  const embed = getMusicEmbed(queue, nowSong, username);
  return {
    components: [...row],
    embeds: [...embed],
  };
};

export const handleMessageMusicButton = async (
  message: Message<boolean>,
  queue: Queue,
  username: string | undefined
) => {
  const filter: CollectorFilter<[MessageComponentInteraction<CacheType>]> = (
    _m
  ) => true;
  const collector = message.createMessageComponentCollector({
    filter,
  });

  collector.on('collect', async (m) => {
    if (!m.isButton()) return;
    const nowSong = queue.songs[0];
    if (m.customId == ButtonId.PauseMusic) {
      queue.pause();
      m.update(getMessageSend(queue, nowSong, username));
    } else if (m.customId == ButtonId.ResumeMusic) {
      queue.resume();
      m.update(getMessageSend(queue, nowSong, username));
    } else if (m.customId == ButtonId.SkipMusic) {
      queue.skip();
    } else if (m.customId == ButtonId.StopMusic) {
      queue.stop();
    }
  });
};
