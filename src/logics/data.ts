interface Item {
  fuzzyName: string;
  status: 'unidentified' | 'predicted' | 'identified';
  price: number | null;
  concreteItem: ConcreteItem | null;
}

interface ConcreteItem {
  id: number;
  name: string;
  price: number;
}

export type { Item, ConcreteItem as Card };

// data from https://chu-a-ko.ssl-lolipop.jp/choco-dan2/01_item.htm

export const cards: Array<ConcreteItem> = [
  { id: 1, name: '識別のカード', price: 100 },
  { id: 2, name: '確信のカード', price: 500 },
  { id: 3, name: 'わき水のカード', price: 300 },
  { id: 4, name: 'マップカード', price: 300 },
  { id: 5, name: '迷子カード', price: 500 },
  { id: 6, name: 'ワープカード', price: 500 },
  { id: 7, name: '分裂カード', price: 500 },
  { id: 8, name: 'リペアカード', price: 500 },
  { id: 9, name: 'サビカード', price: 500 },
  { id: 10, name: 'ツヤ出しカード', price: 500 },
  { id: 11, name: 'ツヤ消しカード', price: 500 },
  { id: 12, name: 'リフレクカード', price: 800 },
  { id: 13, name: 'スリプルカード', price: 100 },
  { id: 14, name: 'ミニマムカード', price: 100 },
  { id: 15, name: 'トードカード', price: 100 },
  { id: 16, name: 'コンフュカード', price: 100 },
  { id: 17, name: '冥界のカード', price: 100 },
  { id: 18, name: '変化カード', price: 200 },
];

export const unidentifiedCardNames = [
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
