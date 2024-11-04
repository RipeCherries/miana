import { useEffect, useState } from 'react';

export function useSearchParams(initialId, initialTitle) {
  const [id, setId] = useState<number>(initialId);
  const [title, setTitle] = useState<string>(initialTitle);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    const searchParams = new URLSearchParams(window.location.search);
    const idParam = searchParams.get('id');
    const titleParam = searchParams.get('title');

    if (idParam) {
      setId(parseInt(idParam, 10));
    }

    if (titleParam) {
      setTitle(titleParam);
    }

    setLoading(false);
  }, []);

  return { id, title, loading };
}
