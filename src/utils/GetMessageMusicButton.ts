import { MessageActionRow, MessageButton } from 'discord.js';
import { Queue, RepeatMode } from 'distube';
export const ButtonId = {
  SkipMusic: 'SkipMusic'.toLowerCase(),
  PauseMusic: 'PauseMusic'.toLowerCase(),
  ResumeMusic: 'ResumeMusic'.toLowerCase(),
  StopMusic: 'StopMusic'.toLowerCase(),
  loopMusic: 'loopMusic'.toLowerCase(),
};

export const GetMessageMusicButton = (queue: Queue) => {
  const row = new MessageActionRow();

  // resume button
  row.addComponents(
    new MessageButton()
      .setCustomId(ButtonId.ResumeMusic)
      .setLabel('tiếp tục')
      .setEmoji('⏯️')
      .setStyle('PRIMARY')
      .setDisabled(!queue.paused)
  );
  // pause button
  row.addComponents(
    new MessageButton()
      .setCustomId(ButtonId.PauseMusic)
      .setLabel('tạm dừng')
      .setEmoji('⏸️')
      .setStyle('PRIMARY')
      .setDisabled(queue.paused)
  );

  // skip button
  row.addComponents(
    new MessageButton()
      .setCustomId(ButtonId.SkipMusic)
      .setLabel('bỏ qua')
      .setEmoji('⏭️')
      .setStyle('PRIMARY')
      .setDisabled(queue.songs.length > 1 ? false : true)
  );
  // stop button
  row.addComponents(
    new MessageButton()
      .setCustomId(ButtonId.StopMusic)
      .setLabel('dừng')
      .setEmoji('⏹️')
      .setStyle('PRIMARY')
      .setDisabled(false)
  );
  row.addComponents(
    new MessageButton()
      .setCustomId(ButtonId.loopMusic)
      .setLabel(
        queue.repeatMode == RepeatMode.SONG
          ? 'tắt loop bài hát'
          : 'loop bài hát này'
      )
      .setEmoji('🔁')
      .setStyle('PRIMARY')
  );

  return [row];
};
