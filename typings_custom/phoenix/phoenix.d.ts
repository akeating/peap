declare namespace phoenix {

  interface Socket {
    new(endPoint: string, options: SocketOptions);
    protocol(): string;
    endPointURL(): string;
    disconnect(callback?: () => void, code?: number, reason?: string): void;
    connect(): void;
    log(kind: string, msg: string, data?: string): void;
    onOpen(callback: () => void): void;
    onClose(callback: () => void): void;
    onError(callback: (err: Error) => void): void;
    onMessage(callback: (payload: { data: string }, ref: number) => string): void;
    isConnected(): boolean;
    channel(topic: string, channelParams?: Object): Channel;
    push(data: any): void;
  }

  interface SocketOptions {
    timeout?: number;
    transport?: any;
    heartbeatIntervalMs?: number;
    reconnectAfterMs?: number;
    logger?: (kind: string, msg: string, data?: string) => void;
    longpollerTimeout?: number;
    params?: Object;
  }

  interface Channel {
    join(timeout?: number): Push;
    on(event: string, callback: <Object>(payload) => void): void;
    off(event: string): void;
    push(event: string, payload: Object, timeout?: number): Push;
  }

  interface Push {
    receive(status: string, callback: <Object>(response?) => void): Push;
  }

  export var Socket: Socket;
  export var SocketOptions: SocketOptions;
}

declare module 'phoenix' {
  export = phoenix;
}
