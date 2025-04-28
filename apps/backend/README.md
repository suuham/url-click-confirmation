# アクセス判定 URL 発行・確認サーバ

> デプロイ先：https://backend.honokarasu.workers.dev

`apps/backend`以下での操作です

## 実行方法

### 0. 準備

#### ライブラリのインストール

```shell
pnpm i
```

#### 環境変数の追加

`.env.example`と同じ場所に以下のファイルを追加

```.env
DATABASE_URL="file:./dev.db"
```

#### D1の設定を追記

`wrangler.jsonc`に追記

```jsonc
"d1_databases": [
    {
        "binding": "DB",
        "database_name": "",
        "database_id": ""
    }
]
```

### 2. サーバの起動

```shell
pnpm dev
```

### 3. サーバにアクセス

`http://localhost:8787/ui`にアクセスすると API ドキュメントが閲覧できます

## その他

### デプロイ

```shell
pnpm run deploy
```

### prisma studioの起動

```shell
npx prisma studio
```
