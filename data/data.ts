//データの型を定義
export interface Question {
    id: number;
    textQuestion: string;
    type: string;
    textSelect: string[];
  }
  
  export const questions: Question[] = [
    {
      id: 1,
      textQuestion: '飲み会の時のあなたのポジションは？',
      type: 'information',
      textSelect: ["モブ", "聞き役", "盛り上げ役", "荒らす"]
    },
    {
      id: 2,
      textQuestion: 'あなたが酒の席でつい喋りがちな話題は？',
      type: 'energy',
      textSelect: ["仕事の話", "自分の恋バナ", "人間関係の愚痴", "他人の恋バナ"]
    },
    {
      id: 3,
      textQuestion: '気になる異性が酔い潰れました。あなたならどうする？',
      type: 'decision',
      textSelect: ["水を与える", "そっとしておく", "叩いて起こす", "自分も酔い潰れる"]
    },
    // {
    //   id: 4,
    //   textQuestion: '変更が予定に生じたとき、ストレスを感じる',
    //   type: 'lifeStyle',
    //   textSelect: ["モブ", "聞き役", "盛り上げ役", "荒らす"]
    // }
  ]