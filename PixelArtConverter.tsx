import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Upload, Download, Palette, Settings, Sparkles, RotateCcw } from 'lucide-react';

// カラーパレット定義
const COLOR_PALETTES = {
  original: { name: "オリジナル", colors: null },
  famicom: { 
    name: "ファミコン", 
    colors: [
      [84, 84, 84], [0, 30, 116], [8, 16, 144], [48, 0, 136],
      [68, 0, 100], [92, 0, 48], [84, 4, 0], [60, 24, 0],
      [32, 42, 0], [8, 58, 0], [0, 64, 0], [0, 60, 0],
      [0, 50, 60], [0, 0, 0], [0, 0, 0], [0, 0, 0],
      [152, 150, 152], [8, 76, 196], [48, 50, 236], [92, 30, 228],
      [136, 20, 176], [160, 20, 100], [152, 34, 32], [120, 60, 0],
      [84, 90, 0], [40, 114, 0], [8, 124, 0], [0, 118, 40],
      [0, 102, 120], [0, 0, 0], [0, 0, 0], [0, 0, 0],
      [236, 238, 236], [76, 154, 236], [120, 124, 236], [176, 98, 236],
      [228, 84, 236], [236, 88, 180], [236, 106, 100], [212, 136, 32],
      [160, 170, 0], [116, 196, 0], [76, 208, 32], [56, 204, 108],
      [56, 180, 204], [60, 60, 60], [0, 0, 0], [0, 0, 0],
      [236, 238, 236], [168, 204, 236], [188, 188, 236], [212, 178, 236],
      [236, 174, 236], [236, 174, 212], [236, 180, 176], [228, 196, 144],
      [204, 210, 120], [180, 222, 120], [168, 226, 144], [152, 226, 180],
      [160, 214, 228], [160, 162, 160], [0, 0, 0], [0, 0, 0]
    ]
  },
  gameboy: {
    name: "ゲームボーイ",
    colors: [
      [15, 56, 15], [48, 98, 48], [139, 172, 15], [155, 188, 15]
    ]
  },
  gameboy_pocket: {
    name: "ゲームボーイポケット",
    colors: [
      [8, 24, 32], [52, 104, 86], [136, 192, 112], [224, 248, 208]
    ]
  },
  cga: {
    name: "CGA",
    colors: [
      [0, 0, 0], [0, 0, 170], [0, 170, 0], [0, 170, 170],
      [170, 0, 0], [170, 0, 170], [170, 85, 0], [170, 170, 170],
      [85, 85, 85], [85, 85, 255], [85, 255, 85], [85, 255, 255],
      [255, 85, 85], [255, 85, 255], [255, 255, 85], [255, 255, 255]
    ]
  },
  c64: {
    name: "Commodore 64",
    colors: [
      [0, 0, 0], [255, 255, 255], [136, 57, 50], [103, 182, 189],
      [139, 63, 150], [85, 160, 73], [64, 49, 141], [191, 206, 114],
      [139, 84, 41], [87, 66, 0], [184, 105, 98], [80, 80, 80],
      [120, 120, 120], [148, 224, 137], [120, 105, 196], [159, 159, 159]
    ]
  },
  msx: {
    name: "MSX",
    colors: [
      [0, 0, 0], [36, 219, 36], [109, 255, 109], [36, 36, 255],
      [73, 73, 255], [182, 36, 36], [255, 73, 73], [36, 219, 255],
      [0, 0, 0], [219, 219, 36], [255, 255, 73], [36, 182, 36],
      [219, 73, 182], [182, 182, 182], [255, 255, 255]
    ]
  }
};

// プリセット定義
const PRESETS = {
  retro8bit: {
    name: "8-bit レトロ",
    pixelSize: 16,
    palette: "famicom",
    contrast: 20,
    brightness: 10,
    saturation: 15,
    dithering: false,
    colorMode: "color"
  },
  gameboy_classic: {
    name: "ゲームボーイ クラシック",
    pixelSize: 12,
    palette: "gameboy",
    contrast: 30,
    brightness: 0,
    saturation: 0,
    dithering: true,
    colorMode: "grayscale"
  },
  minimal_pixel: {
    name: "ミニマル ピクセル",
    pixelSize: 8,
    palette: "original",
    contrast: 10,
    brightness: 5,
    saturation: -10,
    dithering: false,
    colorMode: "color"
  },
  high_contrast: {
    name: "ハイコントラスト",
    pixelSize: 20,
    palette: "cga",
    contrast: 50,
    brightness: 0,
    saturation: 20,
    dithering: false,
    colorMode: "color"
  }
};

interface PixelArtConverterProps {}

export function PixelArtConverter({}: PixelArtConverterProps) {
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [pixelSize, setPixelSize] = useState<number>(8);
  const [selectedPalette, setSelectedPalette] = useState<string>("original");
  const [colorMode, setColorMode] = useState<"color" | "grayscale" | "sepia">("color");
  const [contrast, setContrast] = useState<number>(0);
  const [brightness, setBrightness] = useState<number>(0);
  const [saturation, setSaturation] = useState<number>(0);
  const [dithering, setDithering] = useState<boolean>(false);
  const [pixelShape, setPixelShape] = useState<"square" | "circle">("square");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const originalCanvasRef = useRef<HTMLCanvasElement>(null);
  const pixelCanvasRef = useRef<HTMLCanvasElement>(null);

  const findClosestPaletteColor = (r: number, g: number, b: number, palette: number[][]): [number, number, number] => {
    let minDistance = Infinity;
    let closestColor = palette[0];
    
    for (const color of palette) {
      const distance = Math.sqrt(
        Math.pow(r - color[0], 2) +
        Math.pow(g - color[1], 2) +
        Math.pow(b - color[2], 2)
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        closestColor = color;
      }
    }
    
    return closestColor as [number, number, number];
  };

  const applyDithering = (imageData: ImageData, width: number, height: number) => {
    const data = imageData.data;
    
    for (let y = 0; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        
        for (let c = 0; c < 3; c++) {
          const oldPixel = data[idx + c];
          const newPixel = Math.round(oldPixel / 255) * 255;
          data[idx + c] = newPixel;
          
          const error = oldPixel - newPixel;
          
          // Floyd-Steinbergディザリング
          data[idx + 4 + c] += error * 7 / 16;
          data[idx + width * 4 - 4 + c] += error * 3 / 16;
          data[idx + width * 4 + c] += error * 5 / 16;
          data[idx + width * 4 + 4 + c] += error * 1 / 16;
        }
      }
    }
  };

  const adjustColors = (r: number, g: number, b: number) => {
    // 明度調整
    const brightnessFactor = 1 + brightness / 100;
    r = Math.min(255, Math.max(0, r * brightnessFactor));
    g = Math.min(255, Math.max(0, g * brightnessFactor));
    b = Math.min(255, Math.max(0, b * brightnessFactor));

    // コントラスト調整
    const contrastFactor = (259 * (contrast + 255)) / (255 * (259 - contrast));
    r = Math.min(255, Math.max(0, contrastFactor * (r - 128) + 128));
    g = Math.min(255, Math.max(0, contrastFactor * (g - 128) + 128));
    b = Math.min(255, Math.max(0, contrastFactor * (b - 128) + 128));

    // 彩度調整
    const gray = 0.299 * r + 0.587 * g + 0.114 * b;
    const satFactor = 1 + saturation / 100;
    r = Math.min(255, Math.max(0, gray + satFactor * (r - gray)));
    g = Math.min(255, Math.max(0, gray + satFactor * (g - gray)));
    b = Math.min(255, Math.max(0, gray + satFactor * (b - gray)));

    return [Math.round(r), Math.round(g), Math.round(b)];
  };

  const processImage = useCallback(() => {
    if (!originalImage || !originalCanvasRef.current || !pixelCanvasRef.current) return;
    
    setIsProcessing(true);
    
    const originalCanvas = originalCanvasRef.current;
    const pixelCanvas = pixelCanvasRef.current;
    const originalCtx = originalCanvas.getContext('2d');
    const pixelCtx = pixelCanvas.getContext('2d');
    
    if (!originalCtx || !pixelCtx) return;

    // 元画像をキャンバスに描画
    originalCanvas.width = originalImage.width;
    originalCanvas.height = originalImage.height;
    originalCtx.drawImage(originalImage, 0, 0);

    // ピクセル化用のサイズを計算
    const pixelWidth = Math.ceil(originalImage.width / pixelSize);
    const pixelHeight = Math.ceil(originalImage.height / pixelSize);
    
    // ピクセル化された画像用のキャンバスサイズを設定
    pixelCanvas.width = originalImage.width;
    pixelCanvas.height = originalImage.height;
    
    // 一時的な小さいキャンバスを作成してピクセル化
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;
    
    tempCanvas.width = pixelWidth;
    tempCanvas.height = pixelHeight;
    
    // 元画像を小さいキャンバスに描画（ピクセル化効果）
    tempCtx.imageSmoothingEnabled = false;
    tempCtx.drawImage(originalCanvas, 0, 0, pixelWidth, pixelHeight);
    
    // 小さいキャンバスから画像データを取得
    const imageData = tempCtx.getImageData(0, 0, pixelWidth, pixelHeight);
    const data = imageData.data;
    
    // ディザリング適用
    if (dithering) {
      applyDithering(imageData, pixelWidth, pixelHeight);
    }
    
    // 色処理を適用
    const selectedPaletteData = COLOR_PALETTES[selectedPalette as keyof typeof COLOR_PALETTES];
    
    for (let i = 0; i < data.length; i += 4) {
      let [r, g, b] = adjustColors(data[i], data[i + 1], data[i + 2]);
      
      // カラーモード処理
      if (colorMode === "grayscale") {
        const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
        r = g = b = gray;
      } else if (colorMode === "sepia") {
        const tr = 0.393 * r + 0.769 * g + 0.189 * b;
        const tg = 0.349 * r + 0.686 * g + 0.168 * b;
        const tb = 0.272 * r + 0.534 * g + 0.131 * b;
        r = Math.min(255, tr);
        g = Math.min(255, tg);
        b = Math.min(255, tb);
      }
      
      // パレット適用
      if (selectedPaletteData.colors) {
        const [pr, pg, pb] = findClosestPaletteColor(r, g, b, selectedPaletteData.colors);
        r = pr;
        g = pg;
        b = pb;
      }
      
      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
    }
    
    // 処理された画像データを小さいキャンバスに戻す
    tempCtx.putImageData(imageData, 0, 0);
    
    // 最終的なキャンバスに拡大して描画
    pixelCtx.imageSmoothingEnabled = false;
    
    if (pixelShape === "circle") {
      // 円形ピクセル効果
      pixelCtx.clearRect(0, 0, originalImage.width, originalImage.height);
      const pixelRatio = originalImage.width / pixelWidth;
      
      for (let y = 0; y < pixelHeight; y++) {
        for (let x = 0; x < pixelWidth; x++) {
          const pixelData = tempCtx.getImageData(x, y, 1, 1).data;
          const centerX = x * pixelRatio + pixelRatio / 2;
          const centerY = y * pixelRatio + pixelRatio / 2;
          const radius = pixelRatio * 0.4;
          
          pixelCtx.beginPath();
          pixelCtx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
          pixelCtx.fillStyle = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
          pixelCtx.fill();
        }
      }
    } else {
      pixelCtx.drawImage(tempCanvas, 0, 0, originalImage.width, originalImage.height);
    }
    
    setIsProcessing(false);
  }, [originalImage, pixelSize, selectedPalette, colorMode, contrast, brightness, saturation, dithering, pixelShape]);

  useEffect(() => {
    if (originalImage) {
      processImage();
    }
  }, [processImage]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setOriginalImage(img);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!pixelCanvasRef.current) return;
    
    const link = document.createElement('a');
    link.download = 'pixel-art.png';
    link.href = pixelCanvasRef.current.toDataURL();
    link.click();
  };

  const applyPreset = (presetKey: string) => {
    const preset = PRESETS[presetKey as keyof typeof PRESETS];
    if (!preset) return;
    
    setPixelSize(preset.pixelSize);
    setSelectedPalette(preset.palette);
    setContrast(preset.contrast);
    setBrightness(preset.brightness);
    setSaturation(preset.saturation);
    setDithering(preset.dithering);
    setColorMode(preset.colorMode as "color" | "grayscale" | "sepia");
  };

  const resetSettings = () => {
    setPixelSize(8);
    setSelectedPalette("original");
    setColorMode("color");
    setContrast(0);
    setBrightness(0);
    setSaturation(0);
    setDithering(false);
    setPixelShape("square");
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* ヘッダーカード */}
      <Card className="border-2">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              画像ピクセルアート変換スタジオ
            </CardTitle>
            <div className="flex gap-2">
              <Button onClick={resetSettings} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                リセット
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* ファイルアップロード */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button 
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="w-full h-40 border-dashed border-2 hover:bg-accent/50 transition-colors"
            >
              <div className="text-center space-y-3">
                <div className="p-3 bg-primary/10 rounded-full mx-auto w-fit">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="font-medium">画像をアップロードしてください</p>
                  <p className="text-sm text-muted-foreground">JPG, PNG, GIF対応 • 最大10MB</p>
                </div>
              </div>
            </Button>
          </div>

          {/* プリセット */}
          {originalImage && (
            <div className="mt-6">
              <Label className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4" />
                クイックプリセット
              </Label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(PRESETS).map(([key, preset]) => (
                  <Button
                    key={key}
                    onClick={() => applyPreset(key)}
                    variant="outline"
                    size="sm"
                    className="h-auto p-3"
                  >
                    <div className="text-center">
                      <div className="font-medium">{preset.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {preset.pixelSize}px • {COLOR_PALETTES[preset.palette as keyof typeof COLOR_PALETTES].name}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* メインコンテンツ */}
      {originalImage && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* コントロールパネル */}
          <div className="xl:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  設定パネル
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">基本</TabsTrigger>
                    <TabsTrigger value="color">色調整</TabsTrigger>
                    <TabsTrigger value="effects">エフェクト</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-6">
                    {/* ピクセルサイズ */}
                    <div className="space-y-3">
                      <Label>ピクセルサイズ: {pixelSize}px</Label>
                      <Slider
                        value={[pixelSize]}
                        onValueChange={(value) => setPixelSize(value[0])}
                        min={2}
                        max={50}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>細かい</span>
                        <span>粗い</span>
                      </div>
                    </div>

                    <Separator />

                    {/* カラーパレット */}
                    <div className="space-y-3">
                      <Label>カラーパレット</Label>
                      <Select value={selectedPalette} onValueChange={setSelectedPalette}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(COLOR_PALETTES).map(([key, palette]) => (
                            <SelectItem key={key} value={key}>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{palette.name}</Badge>
                                {palette.colors && (
                                  <span className="text-xs text-muted-foreground">
                                    {palette.colors.length}色
                                  </span>
                                )}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    {/* ピクセル形状 */}
                    <div className="space-y-3">
                      <Label>ピクセル形状</Label>
                      <Select value={pixelShape} onValueChange={(value) => setPixelShape(value as "square" | "circle")}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="square">正方形</SelectItem>
                          <SelectItem value="circle">円形</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  <TabsContent value="color" className="space-y-6">
                    {/* カラーモード */}
                    <div className="space-y-3">
                      <Label>カラーモード</Label>
                      <Select value={colorMode} onValueChange={(value) => setColorMode(value as "color" | "grayscale" | "sepia")}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="color">フルカラー</SelectItem>
                          <SelectItem value="grayscale">グレースケール</SelectItem>
                          <SelectItem value="sepia">セピア</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator />

                    {/* 明度 */}
                    <div className="space-y-3">
                      <Label>明度: {brightness > 0 ? '+' : ''}{brightness}</Label>
                      <Slider
                        value={[brightness]}
                        onValueChange={(value) => setBrightness(value[0])}
                        min={-50}
                        max={50}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    {/* コントラスト */}
                    <div className="space-y-3">
                      <Label>コントラスト: {contrast > 0 ? '+' : ''}{contrast}</Label>
                      <Slider
                        value={[contrast]}
                        onValueChange={(value) => setContrast(value[0])}
                        min={-50}
                        max={50}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    {/* 彩度 */}
                    <div className="space-y-3">
                      <Label>彩度: {saturation > 0 ? '+' : ''}{saturation}</Label>
                      <Slider
                        value={[saturation]}
                        onValueChange={(value) => setSaturation(value[0])}
                        min={-50}
                        max={50}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="effects" className="space-y-6">
                    {/* ディザリング */}
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label>ディザリング</Label>
                        <p className="text-xs text-muted-foreground">
                          Floyd-Steinbergアルゴリズム
                        </p>
                      </div>
                      <Switch
                        checked={dithering}
                        onCheckedChange={setDithering}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* 画像表示エリア */}
          <div className="xl:col-span-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>元画像</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full aspect-square bg-muted/30 rounded-lg overflow-hidden flex items-center justify-center">
                    <canvas
                      ref={originalCanvasRef}
                      className="max-w-full max-h-full object-contain rounded"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    ピクセルアート
                    <Button
                      onClick={handleDownload}
                      size="sm"
                      disabled={isProcessing}
                      className="gap-2"
                    >
                      <Download className="w-4 h-4" />
                      ダウンロード
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full aspect-square bg-muted/30 rounded-lg overflow-hidden flex items-center justify-center">
                    {isProcessing ? (
                      <div className="text-center space-y-3">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="text-sm text-muted-foreground">処理中...</p>
                      </div>
                    ) : (
                      <canvas
                        ref={pixelCanvasRef}
                        className="max-w-full max-h-full object-contain rounded"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* 隠しキャンバス（元画像用） */}
      <canvas ref={originalCanvasRef} className="hidden" />
    </div>
  );
}