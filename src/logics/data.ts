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

type Category = 'card' | 'liquid' | 'collar';

export type { Item, ConcreteItem, Category };

// data from https://chu-a-ko.ssl-lolipop.jp/choco-dan2/01_item.htm

export const allCards: Array<ConcreteItem> = [
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

export const allLiquids: Array<ConcreteItem> = [
  { id: 1, name: 'ポーション', price: 50 },
  { id: 2, name: 'ハイポーション', price: 200 },
  { id: 3, name: 'エクスポーション', price: 500 },
  { id: 4, name: 'エリクサー', price: 1000 },
  { id: 5, name: '解毒剤', price: 100 },
  { id: 6, name: '万能薬', price: 500 },
  { id: 7, name: '爆発薬', price: 50 },
  { id: 8, name: 'ダメージ薬', price: 500 },
  { id: 9, name: 'ヘイストの薬', price: 500 },
  { id: 10, name: 'スロウの薬', price: 500 },
  { id: 11, name: '毒薬', price: 500 },
  { id: 12, name: 'サイレスの薬', price: 800 },
  { id: 13, name: '目にいい薬', price: 100 },
  { id: 14, name: 'くらやみの薬', price: 100 },
  { id: 15, name: '変化の薬', price: 100 },
  { id: 16, name: '忘れんぼうの薬', price: 200 },
  { id: 17, name: '透明薬', price: 300 },
  { id: 18, name: 'デスペルの薬', price: 300 },
  { id: 19, name: 'スペルの薬', price: 300 },
];

export const unidentifiedLiquidNames = [
  'ペロペロのくすり',
  'ジュルジュルのくすり',
  'ワクワクなくすり',
  'プルプルしたくすり',
  'ガシガシなくすり',
  'トロトロなくすり',
  'ギトギトのくすり',
  'ピカーンとくるくすり',
  'ギラギラしたくすり',
  'クエエエのくすり',
  'デロデロなくすり',
  'ドキドキのくすり',
  'グニャグニャのくすり',
  'ベタベタなくすり',
  'ヌメヌメなくすり',
  'サラサラしたくすり',
  'フニフニしたくすり',
  'プクプクしたくすり',
  'ペタペタするくすり',
];

export function getAllItems(category: Category): Array<ConcreteItem> {
  switch (category) {
    case 'card':
      return allCards;
    case 'liquid':
      return allLiquids;
    default:
      return allCards; // TODO: 他の種類
  }
}
