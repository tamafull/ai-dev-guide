(() => {
  const header = document.querySelector('.site-header .header-inner');
  if (!header) return;

  const path = window.location.pathname;
  const nested = /\/(articles|everyday)\//.test(path);
  const prefix = nested ? '../' : '';

  const brand = header.querySelector('.brand');
  if (brand) brand.href = `${prefix}index.html`;

  const nav = header.querySelector('.nav');
  if (!nav) return;

  const items = [
    ['実務ガイド', `${prefix}index.html`, /\/ai-dev-guide\/(?:index\.html)?$/],
    ['普段使い', `${prefix}everyday.html`, /\/everyday(?:\.html|\/)/],
    ['最新記事', `${prefix}articles.html`, /\/articles(?:\.html|\/)/],
    ['AI年表', `${prefix}timeline.html`, /\/timeline\.html$/],
    ['用語集', `${prefix}glossary.html`, /\/glossary\.html$/],
    ['検索', `${prefix}search.html`, /\/search\.html$/]
  ];

  nav.setAttribute('aria-label', '主要ナビゲーション');
  nav.innerHTML = '';
  for (const [label, href, activePattern] of items) {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    if (activePattern.test(path)) a.setAttribute('aria-current', 'page');
    nav.appendChild(a);
  }
})();
