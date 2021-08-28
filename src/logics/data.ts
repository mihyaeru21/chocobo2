interface Item<T> {
  fuzzyName: string;
  status: 'unidentified' | 'maybe' | 'identified';
  sellingPrice: number | null;
  concreteItem: T | null;
}

interface Card {
  id: number;
  name: string;
  buyingPrice: number;
  sellingPrice: number;
}

export type { Item, Card };

// data from https://chu-a-ko.ssl-lolipop.jp/choco-dan2/01_item.htm

export const cards: Array<Card> = [
  { id: 1, name: '識別のカード', buyingPrice: 100, sellingPrice: 50 },
  { id: 2, name: '確信のカード', buyingPrice: 500, sellingPrice: 250 },
  { id: 3, name: 'わき水のカード', buyingPrice: 300, sellingPrice: 150 },
  { id: 4, name: 'マップカード', buyingPrice: 300, sellingPrice: 150 },
  { id: 5, name: '迷子カード', buyingPrice: 500, sellingPrice: 250 },
  { id: 6, name: 'ワープカード', buyingPrice: 500, sellingPrice: 250 },
  { id: 7, name: '分裂カード', buyingPrice: 500, sellingPrice: 250 },
  { id: 8, name: 'リペアカード', buyingPrice: 500, sellingPrice: 250 },
  { id: 9, name: 'サビカード', buyingPrice: 500, sellingPrice: 250 },
  { id: 10, name: 'ツヤ出しカード', buyingPrice: 500, sellingPrice: 250 },
  { id: 11, name: 'ツヤ消しカード', buyingPrice: 500, sellingPrice: 250 },
  { id: 12, name: 'リフレクカード', buyingPrice: 800, sellingPrice: 400 },
  { id: 13, name: 'スリプルカード', buyingPrice: 100, sellingPrice: 50 },
  { id: 14, name: 'ミニマムカード', buyingPrice: 100, sellingPrice: 50 },
  { id: 15, name: 'トードカード', buyingPrice: 100, sellingPrice: 50 },
  { id: 16, name: 'コンフュカード', buyingPrice: 100, sellingPrice: 50 },
  { id: 17, name: '冥界のカード', buyingPrice: 100, sellingPrice: 50 },
  { id: 18, name: '変化カード', buyingPrice: 200, sellingPrice: 100 },
];

export const unidentifiedCards = [
  'やぶれかけのカード',
  'アナのあいたカード',
  'いろあせたカード',
  'がさがさしたカード',
  'おれまがったカード',
  'にじんだカード',
  'そりかえったカード',
  'ひやけしたカード',
  'くたびれたカード',
  'ぬくもりのカード',
  'すりきれたカード',
  'しわくちゃのカード',
  'すべすべしたカード',
  'つるつるしたカード',
  'ざらざしたカード',
  'しみつきのカード',
  'つぎはぎのカード',
  'まっさらなカード',
];
