import { io, type Socket } from 'socket.io-client';
import { useMainStore } from '@/stores/main';

class SocketManager {
  private socket: Socket | undefined;

  public connect() {
    const mainStore = useMainStore();

    this.socket = io(mainStore.serverAddress, {
      withCredentials: false,
      path: '/server',
      transports: ['websocket'],
      auth: (cb: (props: { token: string | null }) => void) => {
        cb({ token: mainStore.accessToken });
      },
    });

    this.socket.removeAllListeners();

    this.socket.on('connect', () => {
      mainStore.connectionStatus = 2;
      this._onConnected();
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
      mainStore.connectionStatus = 0;
    });

    this.socket.on('connect_error', () => {
      console.log('socket connect error');
      mainStore.connectionStatus = 0;
    });
  }

  private _onConnected() {
    console.log('connected to socket');
  }
}

const socketManager = new SocketManager();

export default socketManager;
