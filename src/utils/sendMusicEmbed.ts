import { MessageEmbed } from 'discord.js';
import { Queue, RepeatMode, Song } from 'distube';

export const getMusicEmbed = (
  queue: Queue,
  song: Song<unknown>,
  username: undefined | string
) => {
  const embed = new MessageEmbed()
    .setTitle(song.name || '')
    .setURL(song.url)
    .setTimestamp();
  if (song.name) embed.addField('tên bài hát', song.name || '', false);
  if (song.source) embed.addField('trên', song.source, true);
  if (username)
    embed.addField('được yêu cầu bới', `<@${username}>` || '', true);
  if (song.formattedDuration)
    embed.addField(
      'thời lượng',
      song.formattedDuration || 'không xác định',
      true
    );
  if (song.duration)
    embed.addField('tổng thời gian', (song.duration || 0) + 's', true);
  if (song.likes) embed.addField('likes', String(song.likes || 0), true);
  if (song.dislikes)
    embed.addField('dislikes', String(song.dislikes || 0), true);
  if (queue.paused) {
    embed.addField(
      'status',
      `tạm dừng${queue.repeatMode == RepeatMode.SONG ? '(đang lập)' : ''}`,
      true
    );
  } else {
    embed.addField(
      'status',
      `đang phát${queue.repeatMode == RepeatMode.SONG ? '(đang lập)' : ''}`,
      true
    );
  }

  if (song.thumbnail) {
    embed.setThumbnail(song.thumbnail);
    embed.setImage(song.thumbnail);
  }
  return [embed];
};
