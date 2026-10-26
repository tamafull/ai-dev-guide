(() => {
  const form = document.querySelector('#site-search-form');
  const input = document.querySelector('#site-search-input');
  const status = document.querySelector('#site-search-status');
  const results = document.querySelector('#site-search-results');
  if (!form || !input || !status || !results) return;

  const normalize = (s) => (s || '').normalize('NFKC').toLowerCase();
  const escapeHtml = (s) => s.replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const base = new URL('.', window.location.href);
  let pages = [];
  let ready = false;

  function makeSnippet(text, query) {
    const nText = normalize(text);
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    let pos = Infinity;
    for (const term of terms) {
      const p = nText.indexOf(term);
      if (p >= 0 && p < pos) pos = p;
    }
    if (!Number.isFinite(pos)) pos = 0;
    const start = Math.max(0, pos - 70);
    const end = Math.min(text.length, pos + 180);
    return `${start > 0 ? '…' : ''}${text.slice(start, end).replace(/\s+/g, ' ').trim()}${end < text.length ? '…' : ''}`;
  }

  function scorePage(page, terms) {
    const title = normalize(page.title);
    const text = normalize(page.text);
    let score = 0;
    for (const term of terms) {
      if (!text.includes(term) && !title.includes(term)) return -1;
      if (title.includes(term)) score += 10;
      const matches = text.split(term).length - 1;
      score += Math.min(matches, 8);
    }
    if (page.type === '記事') score += 0.25;
    return score;
  }

  function render(query) {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    const url = new URL(window.location.href);
    if (query) url.searchParams.set('q', query); else url.searchParams.delete('q');
    history.replaceState(null, '', url);

    if (!ready) {
      status.textContent = '検索データを準備しています…';
      return;
    }
    if (!terms.length) {
      status.textContent = `${pages.length}ページを検索できます。`;
      results.innerHTML = '';
      return;
    }

    const found = pages
      .map(page => ({ page, score: scorePage(page, terms) }))
      .filter(x => x.score >= 0)
      .sort((a, b) => b.score - a.score || a.page.title.localeCompare(b.page.title, 'ja'));

    status.textContent = `${found.length}件見つかりました。`;
    results.innerHTML = found.map(({page}) => `
      <article class="search-result">
        <div class="meta">${escapeHtml(page.type)}</div>
        <h2><a href="${escapeHtml(page.url)}">${escapeHtml(page.title)}</a></h2>
        <p>${escapeHtml(makeSnippet(page.text, query))}</p>
      </article>`).join('');
  }

  async function load() {
    try {
      const manifestRes = await fetch(new URL('search-pages.json', base));
      if (!manifestRes.ok) throw new Error('manifest');
      const urls = await manifestRes.json();
      const loaded = await Promise.all(urls.map(async path => {
        const res = await fetch(new URL(path, base));
        if (!res.ok) return null;
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const main = doc.querySelector('main');
        const title = doc.querySelector('h1')?.textContent?.trim() || doc.title.replace(/\s*[—|-].*$/, '').trim();
        const text = main?.textContent?.replace(/\s+/g, ' ').trim() || '';
        const type = path.startsWith('articles/') ? '記事' : path === 'glossary.html' ? '用語集' : path === 'articles.html' ? '記事一覧' : 'ガイド';
        return { title, text, type, url: path };
      }));
      pages = loaded.filter(Boolean);
      ready = true;
      render(input.value);
    } catch (e) {
      status.textContent = '検索データを読み込めませんでした。ページを再読み込みしてください。';
    }
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    render(input.value.trim());
  });
  input.addEventListener('input', () => render(input.value.trim()));

  const initial = new URL(window.location.href).searchParams.get('q') || '';
  input.value = initial;
  load();
})();
