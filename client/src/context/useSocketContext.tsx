import { useState, useContext, createContext, FunctionComponent, useCallback, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './useAuthContext';

interface ISocketContext {
  socket: Socket | undefined;
  initSocket: () => void;
}

export const SocketContext = createContext<ISocketContext>({
  socket: undefined,
  initSocket: () => null,
});

export const SocketProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const { loggedInUser, profileData } = useAuth();

  const initSocket = useCallback(() => {
    console.log('trying to connect');
    setSocket(
      io('/', {
        withCredentials: true,
      }),
    );
  }, []);
  useEffect(() => {
    profileData && initSocket();
  }, [initSocket, profileData]);
  useEffect(() => {
    socket && profileData && socket.emit('addProfile', profileData._id);
    console.log(socket);
    if (!loggedInUser) {
      socket?.disconnect();
    }
  }, [socket, loggedInUser, profileData]);
  return <SocketContext.Provider value={{ socket, initSocket }}>{children}</SocketContext.Provider>;
};

export function useSocket(): ISocketContext {
  return useContext(SocketContext);
}
