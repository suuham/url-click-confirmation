# アクセス判定 URL 発行・確認サーバ

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
# db container
POSTGRES_CONTAINER_NAME=url-click-confirmation-db
POSTGRES_DB=url-click-confirmation
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_HOST_AUTH_METHOD=trust
POSTGRES_PORT=5432

# prisma
DATABASE_URL=postgresql://user:password@localhost:5432/url-click-confirmation?schema=public
```

### 2. DBの立ち上げ・マイグレーション

```shell
make up
```

```shell
npx prisma migrate dev --name init
```

### 3. サーバの起動

```shell
pnpm run dev
```

### 4. サーバにアクセス

`http://localhost:4000/ui`にアクセスすると API ドキュメントが閲覧できます

## その他

### DBに接続したい場合

```shell
make connect-db
```
