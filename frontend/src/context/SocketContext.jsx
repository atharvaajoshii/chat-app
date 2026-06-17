import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext)
}


export const SocketContextProvider = ({ children }) => {

    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useContext(AuthContext);

    useEffect(() => {
        if (authUser) {
            const socket = io("https://chat-me-rtjj.onrender.com/", {
                query: {
                    userId: authUser.id
                }
            });

            setSocket(socket);
            socket.on("onlineUsers", (users) => {
                setOnlineUsers(users);
            });

            return () => {
                socket.off("onlineUsers");
                socket.close();
            };
        } else {
            setSocket(null);
        }
    }, [authUser]);


    return <SocketContext.Provider value={{ socket, onlineUsers }}>
        {children}
    </SocketContext.Provider>
};