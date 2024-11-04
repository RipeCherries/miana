import React from 'react';
import { MessageSquareWarning } from 'lucide-react';
import Player from './components/Player.tsx';
import { useSearchParams } from './hooks/useSearchParams.ts';

import './App.css';

export default function App(): React.JSX.Element {
  const { id, title, loading } = useSearchParams(-1, 'Miana');

  return (
    <>
      <div className="background" />
      {
        !loading && (
          <div className="container">
            {
              (id === -1 || title === 'Miana')
                ? (
                  <div className="message">
                    <MessageSquareWarning size={64} />
                    <p>По Вашему запросу ничего не найдено</p>
                  </div>
                )
                : (
                  <Player id={id} title={title} />
                )
            }
          </div>
        )
      }
    </>
  );
}
