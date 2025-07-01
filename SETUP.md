# 事前準備
ハンズオン当日までに、以下の準備を行ってください。  
もし、途中でうまくいかない場合などは、当日講師に声をかけてください。

## ソフトウェア・環境構築
1. Node.js と npm のインストール
  - Node.js のバージョンは22.xを推奨します。
2. Git のインストール
3. Postman のインストール（APIテスト用）
  - [公式ダウンロードページ](https://www.postman.com/downloads/)から自分の環境にあったソフトウェアをインストールしてください。

## GitHub リポジトリの準備
1. リポジトリのクローン
```bash
  git clone https://github.com/copalette/handson-backend-2507
  cd handson-backend-2507
```

2. environment variables の設定
```bash
  cp .env.example .env
```

3. 必要なパッケージのインストール
```bash
  npm install
```

4. データベースのセットアップ
```bash
  npx prisma migrate dev
```
色々表示されたあと、最後の方に`✔ Generated Prisma Client (v6.10.1) to ./node_modules/@prisma/client in 56ms` のようなメッセージが表示されれば成功です。

5. 開発サーバーの起動
```bash
  npm run dev
```
同様に色々表示されたあと、最後の方に
```
🚀 Server running on port 3000
📊 Health check: http://localhost:3000/health
🔍 Prisma Studio: http://localhost:5555
```
のようなメッセージが表示されれば成功です。
