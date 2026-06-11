# Peace of take ｜ イベントLP

2026.7.5(日) 高円寺アトレノワで開催するファン交流イベントのランディングページ。
**静的HTML/CSS/JSのみ**で構成。ビルド不要・そのままブラウザで開けます。

## 構成

```
peace-of-take-lp/
├── index.html         … ページ本体（意味ベースの骨組み＝構造とコピー）
├── css/
│   ├── variables.css  … ★デザイントークン（色/余白/フォント等）。ChatGPTはここ中心
│   └── style.css      … ★レイアウト/セクションの土台。ChatGPTはここで装飾を足す
├── js/
│   ├── main.js        … カウントダウン等の挙動（デザインに無関係）
│   └── easter-egg.js  … 合言葉/謎解きの仕掛け（SECRET_CONFIG だけ触ればOK）
└── assets/            … 画像・ロゴ置き場（README.txt 参照）
```

## デザインの差し替え（ChatGPTに渡すときの説明）

- **色・フォント・余白・角丸・影** → `css/variables.css` の `:root` を書き換えるだけで全面変更できる
- **セクションごとの装飾** → `css/style.css`。クラス名は `.hero` `.program` `.cast` `.access` `.faq` など意味ベース
- **HTML構造（index.html）は原則そのままでOK**。文言の微調整は `★` コメント箇所を参照

## ローカルで確認

`index.html` をダブルクリックでも見られますが、地図やJSの挙動を含め確認するなら簡易サーバ推奨：

```bash
cd peace-of-take-lp
python3 -m http.server 8000
# → http://localhost:8000
```

## デプロイ（Surge）

```bash
npm install -g surge   # 初回のみ
cd peace-of-take-lp
surge                  # 案内に従いドメインを決めて公開
```

> ⚠️ デプロイ＝**インターネット公開**です。公開して問題ない内容か確認のうえ実行してください。

## まだ未確定（捏造していない箇所）

- FAQの「撮影可否 / 物販の支払い方法 / 再入場」→ `※確認中` 表示。確定したら本文に差し替え
- ファンクラブ登録URL（注意事項内のリンク `href="#"`）
- 出演者写真・ロゴ・OGP画像
- 計測タグ（未導入。`<!-- ANALYTICS -->` 枠あり）
