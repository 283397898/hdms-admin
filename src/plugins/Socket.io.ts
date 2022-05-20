import { io, ManagerOptions, SocketOptions } from 'socket.io-client';
import { App } from 'vue';

export default {
  install: (
    app: App<Element>,
    {
      connection,
      options,
    }: {
      connection: string;
      options?: Partial<ManagerOptions & SocketOptions>;
    },
  ) => {
    const socket = io(connection, options);
    app.config.globalProperties.$socket = socket;
    app.provide('socket', socket);
  },
};
