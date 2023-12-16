//データの型を定義
export interface Question {
    id: number;
    textQuestion: string;
    textSelect: string[];
  }
  
  export const questions: Question[] = [
    {
      id: 1,
      textQuestion: '飲み会の時のあなたのポジションは？',
      textSelect: ["モブ", "聞き役", "盛り上げ役", "荒らす"]
    },
    {
      id: 2,
      textQuestion: 'あなたが酒の席でつい喋りがちな話題は？',
      textSelect: ["仕事の話", "自分の恋バナ", "人間関係の愚痴", "他人の恋バナ"]
    },
    {
      id: 3,
      textQuestion: '気になる異性が酔い潰れました。あなたならどうする？',
      textSelect: ["水を与える", "そっとしておく", "叩いて起こす", "自分も酔い潰れる"]
    },
    {
      id: 4,
      textQuestion: '隣の友達がアルハラをされてます！あなたならどうする？',
      textSelect: ["注意して止める", "見てみぬふり", "代わりに自分が飲む", "まあ大丈夫っしょ"]
    },
    {
      id: 5,
      textQuestion: 'あなたは今日飲みたくない気分ですが、周り全員はビールを注文するそうです。あなたならどうする？',
      textSelect: ["飲まない", "アルコールの低いものを注文", "もうがっつり飲む", "飲まない人をもう１人つくる"]
    },
    {
      id: 6,
      textQuestion: "お酒が進むと、あなたのトークはどうなる？",
      textSelect: ["静かになる", "話が深くなる", "よく笑う", "大声で話す"]
    }
  ]