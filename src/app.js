import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 簡易的な認証ミドルウェア
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
      code: 'UNAUTHORIZED',
      error: '認証が必要です'
    });
  }

  // 簡易的なトークン検証（実際はJWTなどを使用）
  const userId = parseInt(token.replace('token_', ''));

  // ユーザーIDをリクエストオブジェクトに保存
  req.userId = userId;

  // 次の処理へ進む
  next();
};

app.get('/health', async (req, res) => {
  try {
    // Prismaを使ってDBに接続テスト
    await prisma.$connect();

    res.json({
      status: 'OK',
      message: 'Server and Database are running!'
    });
  } catch (error) {
    // DB接続エラー時
    res.status(500).json({
      code: 'DB_CONNECTION_ERROR',
      error: 'データベース接続に失敗しました',
    });
  }
});

// 認証API
// ユーザー登録
app.post('/auth/register', async (req, res) => {
  const { username, password } = req.body;

  // ここにユーザー登録の実装を追加
});

app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  // ここにユーザーログインの実装を追加
});

// タスク管理API
app.get('/tasks', authenticate, async (req, res) => {
  // ここにタスク一覧の取得処理を追加
});

app.get('/tasks/:id', authenticate, async (req, res) => {
  // ここにタスクの詳細取得処理を追加
});

app.post('/tasks', authenticate, async (req, res) => {
  const taskId = parseInt(req.params.id);
  // ここにタスク新規作成処理を追加
});

app.put('/tasks/:id', authenticate, async (req, res) => {
  const taskId = parseInt(req.params.id);
  // タスク更新処理を追加
});

app.delete('/tasks/:id', authenticate, async (req, res) => {
  const taskId = parseInt(req.params.id);

  // タスク削除処理を追加
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔍 Prisma Studio: http://localhost:5555`);
});
