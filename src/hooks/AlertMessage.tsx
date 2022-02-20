import { useEffect, useState } from 'react';
import AlertMessageType from '../interface/AlertMessage';

function AlertMessage() {
  const [messages, setMessages] = useState<AlertMessageType[]>([]);
  const [duration, setDuration] = useState<number>(0);

  const setAlertMessage = (message: string, type: string, durationP: number): void => {
    const id = new Date().getTime();
    setMessages([{ id, message, type }]);
    setDuration(durationP);
  };

  useEffect(() => {
    let timeOut: NodeJS.Timeout;

    if (messages.length > 0) {
      timeOut = setTimeout(() => {
        setMessages(messages.slice(1));
      }, duration);
    }

    return () => {
      clearTimeout(timeOut);
    };
  }, [messages, duration]);

  return {
    messages,
    setAlertMessage,
  };
}

export default AlertMessage;
