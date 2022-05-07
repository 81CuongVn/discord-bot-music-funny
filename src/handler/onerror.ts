import { Log } from 'helper-package-create-discord-bot';
export const onAppCrash = () => {
  process.on('uncaughtException', (err) => {
    Log.Error('AppError', err.message,err.stack);
  });
  process.on('unhandledRejection', (err) => {
    Log.Error('AppError', err);
  });
};
