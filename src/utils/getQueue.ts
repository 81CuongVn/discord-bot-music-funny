import { Guild, VoiceBasedChannel } from 'discord.js';
import { TMetaData } from '../types/MetaData';

export const getQueue = (
  metadata: TMetaData,
  guild: Guild,
  userChannel: VoiceBasedChannel | null | undefined
) => {
  const queue = metadata.player?.getQueue(guild);
  if (!queue) {
    return 'Không có nhạc nào đang phát';
  }
  const channel = userChannel;
  if (!channel) {
    return 'Bạn phải ở trong voice channel';
  }
  if (channel.id !== queue.voice.channel.id) {
    return 'Bạn phải ở trong voice channel cùng với bot';
  }
  if (!queue.playing && !queue.songs[0]) {
    return 'không có nhạc nào đang phát';
  }
  return queue;
};
