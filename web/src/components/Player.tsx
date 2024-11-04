import React, { useState } from 'react';
import { CircleX, Loader } from 'lucide-react';
import { useFetchSources } from '../hooks/useFetchSources.ts';

import './Player.css';

interface Props {
  id: number;
  title: string;
}

export default function Player({ id, title }: Props): React.JSX.Element {
  const { sources, loading, isError } = useFetchSources(id);
  const [currentSource, setCurrentSource] = useState<number>(0);

  if (loading) {
    return (
      <div className="message">
        <Loader size={64} />
        <p>Загрузка</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="message">
        <CircleX size={64} />
        <p>Произошла ошибка, попробуйте ещё раз</p>
      </div>
    );
  }

  return (
    <div className="player">
      <p className="title">{title}</p>
      <div className="content">
        <iframe src={sources[currentSource].iframeUrl} allowFullScreen={true} />
      </div>
      <div className="sources">
        {
          sources.map((source, id) => (
            <button
              key={id}
              className={`source ${currentSource === id ? 'selected' : ''}`}
              onClick={() => setCurrentSource(id)}
            >
              {source.source}
            </button>
          ))
        }
      </div>
    </div>
  );
}