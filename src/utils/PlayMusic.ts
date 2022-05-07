import { TextChannel, VoiceBasedChannel } from 'discord.js';
import DisTube, { Playlist, SearchResult, Song } from 'distube';

export const playMusic = async (
  Player: DisTube,
  voiceChannel: VoiceBasedChannel,
  musicName: string | Song<unknown> | SearchResult | Playlist<unknown>,
  channel: TextChannel,
  userId: string
) => {
  return await Player.play(voiceChannel, musicName, {
    textChannel: channel,
    metadata: {
      channel: voiceChannel,
      textChannelId: channel.id,
      user: userId,
    },
  });
};
