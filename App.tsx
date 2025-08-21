import { PixelArtConverter } from "./components/PixelArtConverter";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8 space-y-4">
          <div className="inline-flex items-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
            <div className="p-3 bg-primary/10 rounded-xl">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                PixelArt Studio
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                プロ級のピクセルアート変換ツール
              </p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            画像をアップロードして、様々なレトロゲーム機風のピクセルアートに変換。
            豊富なカラーパレット、詳細な色調整、エフェクトオプションでプロ級の作品を作成できます。
          </p>
        </div>
        <PixelArtConverter />
      </div>
    </div>
  );
}