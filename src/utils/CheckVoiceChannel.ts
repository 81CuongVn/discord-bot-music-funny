import { VoiceBasedChannel } from "discord.js";

export const CheckVoiceChannel = (
  UserVoiceChannel: VoiceBasedChannel | null | undefined,
  BotVoiceChannel: VoiceBasedChannel | null | undefined
) => {
  if (!UserVoiceChannel) {
    return "bạn đang không ở trong phòng voice"
  }
  // if bot in another voice channel
  if (BotVoiceChannel) {
    if (BotVoiceChannel.id !== UserVoiceChannel.id) {
      return "bạn đang không ở trong phòng voice cùng với bot"
    }
    }
  return UserVoiceChannel;
};