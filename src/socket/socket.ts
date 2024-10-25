import { io, type Socket } from 'socket.io-client';
import { useMainStore } from '@/stores/main';
import { ConnectionStatus } from '@/enums/ConnectionStatus'

class SocketManager {
  private socket: Socket | undefined;

  public disconnect() {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
    }
    this.socket = undefined;
  }

  public connect() {
    const mainStore = useMainStore();

    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
    }

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
      mainStore.connectionStatus = ConnectionStatus.CONNECTED;
      this._onConnected();
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
      // mainStore.connectionStatus = ConnectionStatus.DISCONNECTED;
    });

    this.socket.on('connect_error', () => {
      console.log('socket connect error');
      mainStore.connectionStatus = ConnectionStatus.DISCONNECTED; // todo: handle reconnect later
    });
  }

  private _onConnected() {
    console.log('connected to socket');
  }
}

const socketManager = new SocketManager();

export default socketManager;
