# Express SQLite API Server Template

Node.js + Express + SQLite + Prisma を使用した開発用 API サーバーテンプレートです。

## 機能

- Express.js による REST API サーバー
- SQLite データベース統合
- **Prisma ORM** - タイプセーフなデータベースアクセス
- **Prisma Studio** - データベース可視化・管理ツール
- ヘルスチェックエンドポイント (`/health`)

## 構成

```
.
├── src/
│   └── app.js             # Express アプリケーション
├── prisma/
│   ├── migrations/        # Prisma マイグレーションファイル
│   └── schema.prisma      # Prismaスキーマ定義
├── data/                  # SQLite データベースファイル（自動生成）
├── .env                   # 環境変数設定
├── package.json           # Node.js 依存関係
├── nodemon.json           # nodemon 設定
└── README.md
```

## クイックスタート

```bash
# 依存関係のインストール
npm install

# データベースのセットアップ
npx prisma migrate dev

# 開発サーバー起動
npm run dev

# 別ターミナルでPrisma Studio起動
npx prisma studio
```

これで以下にアクセスできます：
- API サーバー: http://localhost:3000
- **Prisma Studio**: http://localhost:5555

### ヘルスチェック

```bash
curl http://localhost:3000/health
```

レスポンス例：
```json
{
  "status": "OK",
}
```

## 利用可能なスクリプト

### 開発用
- `npm run dev` - ローカル開発サーバー起動（nodemon使用）

### データベース操作
- `npx prisma migrate dev` - データベースマイグレーションの実行
- `npx prisma migrate reset` - データベースのリセット（全データ削除）
- `npx prisma studio` - Prisma Studio を起動

## エンドポイント

### GET /health

サーバーとデータベースの状態を確認するヘルスチェックエンドポイント。

**レスポンス:**
- `200 OK` - サーバーとデータベースが正常
- `503 Service Unavailable` - データベース接続エラー

## 環境変数
| 変数名 | デフォルト値 | 説明 |
|--------|-------------|------|
| `PORT` | `3000` | サーバーポート |
| `DATABASE_URL` | `file:./data/database.sqlite` | データベース接続URL |

## Prisma Studio
Prisma Studio は http://localhost:5555 でアクセスできる Web ベースのデータベース管理ツールです。

### 機能:
- テーブルデータの閲覧・編集
- リレーションの可視化
- データの検索・フィルタリング
- レコードの追加・更新・削除

### データベーススキーマ
初期状態では以下のテーブルが定義されています：
- User
- Task
スキーマは `prisma/schema.prisma` で管理されています。

## ポート設定
- `3000` - API サーバー
- `5555` - Prisma Studio

## カスタマイズ
### 新しいエンドポイントの追加
`src/app.js` にルートを追加する場合
```javascript
app.get('/api/users', async (req, res) => {
  const users = await db.getPrisma().user.findMany();
  res.json({ users });
});
```

### データベーステーブルの追加
1. `prisma/schema.prisma` にモデルを追加
2. `npx prisma migrate dev --name add_new_table` を実行
3. Prisma Studio で新しいテーブルを確認
