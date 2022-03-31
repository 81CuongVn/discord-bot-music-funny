import { Queue } from "distube";
import { getMessageSend } from "../handler/handleMessageMusicButton";

export const resetEmbedMusic = (queue: Queue) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const metaData = queue.songs[0].metadata as any;
  if (queue.textChannel && metaData.messageId) {
    // get message by message id
    queue.textChannel.messages.fetch(metaData.messageId).then((message) => {
      message.edit(getMessageSend(queue, queue.songs[0], metaData.user));
    });
  }
};