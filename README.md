# PixelArt Studio

![PixelArt Studio](https://img.shields.io/badge/PixelArt-Studio-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

プロ級のピクセルアート変換ツール - 画像を様々なレトロゲーム機風のピクセルアートに変換できるWebアプリケーション。

## 🎮 主な機能

### 📱 多様なカラーパレット
- **ファミコン** - 任天堂ファミリーコンピュータの64色パレット
- **ゲームボーイ** - 4段階グリーンモノクロ
- **ゲームボーイポケット** - 改良された4段階グレー
- **CGA** - IBM PC初期の16色パレット
- **Commodore 64** - C64の特徴的な16色
- **MSX** - MSXコンピューターの15色

### 🎨 高度な色調整機能
- **明度調整** - 画像の明るさを±50の範囲で調整
- **コントラスト調整** - メリハリを±50の範囲で調整  
- **彩度調整** - 色の鮮やかさを±50の範囲で調整
- **カラーモード** - フルカラー/グレースケール/セピア

### ✨ エフェクト機能
- **ディザリング** - Floyd-Steinbergアルゴリズムによる高品質なディザリング
- **ピクセル形状** - 正方形/円形ピクセルの選択
- **リアルタイムプレビュー** - 設定変更と同時にプレビュー更新

### 🚀 プリセット機能
- **8-bit レトロ** - クラシックなファミコン風
- **ゲームボーイ クラシック** - 懐かしのモノクロ携帯機風
- **ミニマル ピクセル** - シンプルで洗練されたスタイル
- **ハイコントラスト** - CGA風の鮮明な色合い

## 🛠️ 技術スタック

- **React 18** - モダンなUIフレームワーク
- **TypeScript** - 型安全な開発
- **Tailwind CSS v4** - ユーティリティファーストCSS
- **Vite** - 高速ビルドツール
- **ShadCN/UI** - 美しいUIコンポーネント
- **Lucide React** - アイコンライブラリ

## 🚀 始め方

### 前提条件
- Node.js 18以上
- npm または yarn

### インストール

1. リポジトリをクローン
\`\`\`bash
git clone https://github.com/yourusername/pixelart-studio.git
cd pixelart-studio
\`\`\`

2. 依存関係をインストール
\`\`\`bash
npm install
\`\`\`

3. 開発サーバーを起動
\`\`\`bash
npm run dev
\`\`\`

4. ブラウザで http://localhost:5173 を開く

### ビルド

プロダクション用ビルドを作成：
\`\`\`bash
npm run build
\`\`\`

ビルドをプレビュー：
\`\`\`bash
npm run preview
\`\`\`

## 📦 デプロイ

### GitHub Pages
このプロジェクトはGitHub Pagesに自動デプロイされます。

1. GitHubリポジトリにプッシュ
2. GitHub ActionsがCI/CDパイプラインを実行
3. 自動的にGitHub Pagesにデプロイ

手動デプロイ：
\`\`\`bash
npm run deploy
\`\`\`

## 🎯 使い方

1. **画像アップロード** - 「画像をアップロード」エリアをクリックしてファイルを選択
2. **プリセット選択** - クイックプリセットから好みのスタイルを選択
3. **詳細調整** - 設定パネルで細かくカスタマイズ
   - **基本タブ** - ピクセルサイズ、カラーパレット、ピクセル形状
   - **色調整タブ** - 明度、コントラスト、彩度、カラーモード
   - **エフェクトタブ** - ディザリングなどの特殊効果
4. **ダウンロード** - 完成したピクセルアートをPNG形式で保存

## 🤝 コントリビューション

プルリクエストやイシューを歓迎します。大きな変更を行う場合は、まずイシューを開いて議論してください。

## 📄 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照

## 🙏 謝辞

- [ShadCN/UI](https://ui.shadcn.com/) - 美しいUIコンポーネント
- [Lucide](https://lucide.dev/) - シンプルで美しいアイコン
- [Tailwind CSS](https://tailwindcss.com/) - ユーティリティファーストCSS

---

⭐ このプロジェクトが役に立ったら、ぜひスターをお願いします！