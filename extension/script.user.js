// ==UserScript==
// @name            Miana
// @namespace       miana
// @author          Egoshin Alexey <alexeyegoshin0403@mail.ru>
// @description     A plugin that turns Kinopoisk into a free online movie theater
// @version         2.0.0
// @icon            https://github.com/RipeCherries/miana/raw/main/assets/icon.png
// @updateURL       https://github.com/RipeCherries/miana/raw/main/extension/script.user.js
// @downloadURL     https://github.com/RipeCherries/miana/raw/main/extension/script.user.js
// @run-at          document-idle
// @match           *://www.kinopoisk.ru/*
// ==/UserScript==

(() => {
  let lastUrl = '/';

  const icon = `
    <svg fill="#000000" width="64px" height="64px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M30.335 26.445c-0.128-0.221-0.538-0.289-1.231-0.202-1.275 0.165-2.201-0.251-2.778-1.251-0.437-0.756-0.55-1.516-0.339-2.28s0.836-1.854 1.874-3.272l0.649-0.904c1.928-2.663 2.323-4.979 1.186-6.95-1.157-2.006-4.5-1.837-6.903-0.806-1.944-4.009-6.040-6.78-10.793-6.78-6.628 0-12 5.373-12 12s5.372 12 12 12c6.627 0 12-5.373 12-12 0-1.469-0.277-2.871-0.76-4.171 0.811-0.291 1.781-0.502 2.696-0.536 1.202-0.044 2.29 0.208 2.722 0.956 0.963 1.669 0.498 3.641-1.395 5.913l-0.388 0.466c-2.214 2.657-2.743 4.984-1.591 6.982 0.466 0.806 1.207 1.381 2.225 1.727 1.018 0.345 1.879 0.312 2.585-0.096 0.35-0.202 0.431-0.468 0.241-0.796zM6.5 18.562c-1.381 0-2.5-1.119-2.5-2.5 0-1.38 1.119-2.5 2.5-2.5s2.5 1.119 2.5 2.5c0 1.381-1.119 2.5-2.5 2.5zM12 24.062c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zM11.020 16.062c0-0.552 0.449-1 1.001-1s1 0.447 1 1c0 0.553-0.448 1-1 1s-1.001-0.447-1.001-1zM12 13.062c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5c0 1.381-1.119 2.5-2.5 2.5zM17.5 18.562c-1.381 0-2.5-1.119-2.5-2.5 0-1.38 1.119-2.5 2.5-2.5s2.5 1.119 2.5 2.5c0 1.381-1.119 2.5-2.5 2.5z"></path>
    </svg>
  `;

  const addLink = (id, title) => {
    const link = document.createElement('a');
    link.id = 'miana';
    link.target = '_blank';
    link.style.position = 'fixed';
    link.style.top = '50%';
    link.style.left = '0';
    link.style.zIndex = '1000';
    link.style.background = '#FFCE00';
    link.style.padding = '8px';
    link.style.borderTopRightRadius = '16px';
    link.style.borderBottomRightRadius = '16px';
    link.innerHTML = icon;

    const href = new URL('https://miana.vercel.app/');
    href.searchParams.set('id', id);
    href.searchParams.set('title', title);

    link.setAttribute('href', href.toString());

    document.body.appendChild(link);
  };

  const deleteLink = () => {
    const link = document.getElementById('miana');
    if (link) {
      link.remove();
    }
  };

  const getTitle = () => {
    return document.querySelector('meta[property="og:title"]').content;
  };

  const updateLink = () => {
    const currentUrl = location.href;

    if (currentUrl === lastUrl) {
      return;
    }

    lastUrl = currentUrl;

    const urlInfo = {
      id: currentUrl.split('/').at(4),
      type: currentUrl.split('/').at(3),
    };

    if (!urlInfo.id || !urlInfo.type || !['film', 'series'].includes(urlInfo.type)) {
      deleteLink();
    } else {
      setTimeout(() => {
        addLink(urlInfo.id, getTitle());
      }, 3000);
    }
  };

  const init = () => {
    const observer = new MutationObserver(() => updateLink());
    observer.observe(document, {
      subtree: true,
      childList: true,
    });

    updateLink();
  };

  init();
})();