import { useEffect, useState } from 'react';

type Translation = {
  id: number;
  name: string;
  quality: string;
  iframeUrl: string;
}

interface Source {
  source: string;
  iframeUrl: string;
  translations: Translation[];
  success: boolean;
  updatedAt: string;
}

export function useFetchSources(id: number) {
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchSources = async () => {
      const response = await fetch(`https://kinobox.tv/api/players?kinopoisk=${id}`, {
        method: 'GET',
        referrerPolicy: 'no-referrer',
      });

      if (!response.ok) {
        setIsError(true);
      }

      setSources(await response.json());
      setLoading(false);
    };

    fetchSources();
  }, [id]);

  return { sources, loading, isError };
}