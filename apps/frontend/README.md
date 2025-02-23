# 営業リスト作成クライアント

## 実行方法

### 0. 事前準備

#### 環境変数の追加

`frontend`ディレクトリ直下(`.env.example`と同階層)に`.env`ファイルを追加してください

```.env
VITE_BACKEND_URL=http://localhost:4000
```

#### スクレイピングサーバの起動

[こちらのドキュメント](https://github.com/suuham/url-click-confirmation/blob/dev/apps/backend/README.md)を参考にしてください

### 1. `frontend`ディレクトリへ移動

```shell
cd apps/frontend
```

### 2. ライブラリのインストール

```shell
pnpm install
```

### 3. 開発者サーバの起動

```shell
pnpm dev
```

`http://localhost:5173/`にアクセスすると画面が表示されます

## 設計やコーディングのルール

### ディレクトリの説明

[こちら](https://github.com/suuham/sales-list-scraping/blob/main/frontend/src/README.md)を参照してください

## その他以外のコマンド説明

### リンター・フォーマッターの適用

> [!NOTE]
> pre-commit 時にも以下のコマンドは実行されます

```
pnpm format
```
