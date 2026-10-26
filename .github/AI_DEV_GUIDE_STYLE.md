# AI活用サイト 編集・更新ルール

このファイルはサイト運用用。GitHub Pagesの公開コンテンツには含めない。

## 共通原則

詳細ページは原則として、読者が先に「何をすればいいか」を理解できる順にする。

1. 現在の結論・推奨
2. 実用例
3. 理由・適用条件・例外
4. 根拠となる論文・一次情報・独立研究

研究者名やベンダー名から始め、読者に結論を推測させない。抽象論だけで終わらせず、必要に応じて実際のファイル名、コマンド、設定、依頼文、失敗例、改善例を示す。

## 開発・実務ガイド

`index.html` は開発・実務ガイドの概要。詳細は `workflow.html`, `specification.html`, `context.html`, `agents.html`, `tools-mcp.html`, `testing-review.html`, `security.html`, `operations.html`, `cost-metrics.html`。

特定言語やフレームワークを一般論にしない。まずWeb/API/バッチ/ライブラリ/CLIなどの一般形で説明する。コードやコマンドが言語依存なら、可能な範囲で `assets/tabs.css` と `assets/tabs.js` を使い Ruby / Python / JavaScript・TypeScript / Java / Go / Rust / C を切り替えられるようにする。7言語すべてが不自然なら適した複数言語へ絞ってよいが、Rubyだけを単独例として優遇しない。

## 普段使いガイドは「発見カタログ」にする

`everyday.html` の第一目的は、すでに目的が決まっている人への索引ではなく、「AIでそんなことまでできるのか」という新しい使い方との出会いを作ること。

トップでは「やりたいことから選ぶ」より「AIでこんなことができる」を先に置く。新しいモデル、コマンド、Plugin、Skill、Work、Voice、Memory、Projects、Scheduled、Computer/Browser、画像、データ分析、成果物作成など、利用方法が広がる機能や組み合わせを積極的に追加する。

各カードは機能名だけでなく、1〜2文で「何ができるか」が具体的に想像できるようにする。既存の目的別ページは第二層として残す。

普段使い詳細:

- `everyday/commands.html` — `/plan`, `/goal`, `/side`, `/fork`, `/compact`, `/review`, `/status` 等。タイトル・導線では「コマンドを使いこなす」と表現する。
- `everyday/plugins-skills.html` — Plugin / Skill とおすすめの組み合わせ
- `everyday/models.html` — モデル・推論量の使い分け
- `everyday/work-computer.html` — Chat / Work / Browser / Computer / Chrome
- `everyday/multimodal.html` — Voice / 画像入力 / 画像生成
- `everyday/memory-projects.html` — Memory / Projects
- `everyday/making-things.html` — 文書 / スライド / データ分析 / Webサイト
- `everyday/planning.html`, `research.html`, `learning.html`, `writing.html`, `decisions.html`, `automation.html`, `life-admin.html`

製品機能は変化が速いので、現在の公式情報で機能名・利用画面・制約を確認する。機能の有無がプラン、OS、アプリ版などで変わる場合はその旨を書く。ライフハックの効果を一般化するときは、可能なら独立研究も確認する。医療・法律・金融など高リスクの個別判断をAIだけで完結する方法として推奨しない。

## AIを学ぶ

`learn.html` はAIそのものを学ぶ入口。`learn/` 配下に1テーマ1ページで置く。現在の基礎テーマは LLM, 小さなLLM, Transformer/Attention, Tokenizer/Embedding, Fine-tuning/LoRA, RAG, Prompt Engineering, Context Engineering, Loop Engineering, AI Agent, Multi-Agent, MCP, Skill/Plugin, Evals, Local LLM/量子化, LLM Security, AITuber, Voice Agent。

学習記事は百科事典にしない。各記事はまず「一言で何か」、次に最小構成・直感・作って試せる入口、最後に関連項目と一次資料を示す。数式が必要なテーマでも、最初の画面で数式を前提にしない。より深い解説が必要になったら同テーマの記事を段階的に増やす。

AITuberやAgentなど実装テーマでは、部品構成を具体的に示す。用語説明だけで終わらせず「最小版なら何をつなぐか」を書く。

## 更新記事と年表

`articles.html` は最新知見。記事本文は `articles/YYYY-MM-DD-short-slug.html`。独立した知見1つにつき1ページにし、調査回単位でまとめない。記事タイトルは研究名ではなく「何が分かったか」が一目で伝わるブログ的な見出しにするが、根拠以上に煽らない。

`timeline.html` はAIの使われ方の変化とサイトの重要更新履歴。単なるモデル発売一覧にはしない。

## 上部ナビゲーション

公開ページの上部メニューは `assets/nav.js` を正本として全ページ共通にする。表示順は次の7項目。

1. 実務ガイド
2. 普段使い
3. AIを学ぶ
4. 最新記事
5. AI年表
6. 用語集
7. 検索

root直下は `assets/nav.js`、`everyday/`, `articles/`, `learn/` 配下は `../assets/nav.js` を読み込む。ページ固有リンクは本文またはfooterへ置く。

## サイト内検索

新しい公開ページは必ず `search-pages.json` に追加する。`.github/` など内部ファイルは検索対象にしない。

## 読みやすさ

- 結論は早めに置く。
- 見出しだけで内容が分かるようにする。
- 1段落1論点を基本にする。
- 手順は番号付き、並列条件は箇条書き。それ以外は普通の文章を優先する。
- 新情報を足す前に既存文を削る・短くする・置き換える余地を確認する。
- 全節を同一テンプレートに揃えない。
- 「結論:」「重要:」「ポイント:」を機械的に繰り返さない。
- 何でも3項目・5項目に揃えない。
- 意味の薄い前置き、要約の要約、最後の言い直しを削る。
- 太字、バッジ、箇条書き、コールアウトを装飾目的で多用しない。

## 根拠

同じベンダーの記事を複数並べても独立した証拠にはしない。可能ならベンダー一次情報、独立研究、実務者の観察を組み合わせる。研究を引用するとき、判断に影響する場合は対象・サンプル数、研究手法、査読状況、主な限界を短く示す。ベンダー事例は可能性の実証として扱い、一般的な効果量の証明とは扱わない。

## 自動更新

開発だけでなく普段使いと学習テーマも継続調査する。新機能や新概念が「こんなことができる」の発見価値を持つなら `everyday.html` への追加を検討する。AIを理解する上で基礎テーマになる新概念・新しい実装パターンなら `learn.html` / `learn/` への追加を検討する。

既存結論を補強するだけなら該当詳細ページの根拠を更新し、重要な新規知見なら記事化を検討する。時代の転換点なら年表にも追加する。重要な新規知見がなければ不要な記事・年表項目・commitを作らない。
