import Header from "@/components/Header";
import CircleBox from "@/components/CircleBox";
import { Question, questions } from "@/data/data";
import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useRouter } from 'next/router';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export default function Home() {
  const router = useRouter();
  const [selectedBox, setSelectedBox] = useState<{ [id: number]: number }>(
    questions.reduce((prev, curr) => ({ ...prev, [curr.id]: null }), {})
  );
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleBoxClick = (questionId: number, value: number) => {
    setSelectedBox(prev => ({ ...prev, [questionId]: value }));
    setShowErrorMessage(false);
  }

  const calculatePersonality = () => {
    const answeredQuestionsCount = Object.values(selectedBox).filter(score => score !== null).length;
    const totalScore = Object.values(selectedBox).reduce((sum, score) => sum + (score ?? 0), 0);
    const averageScore = answeredQuestionsCount > 0 ? totalScore / answeredQuestionsCount : 0;
  
    if (averageScore <= 1.49) {
      return {
        type: 'なめらかチータラ', 
        description: '穏やかで落ち着いた雰囲気を持ち、周囲に安心感を与えるタイプです。物事に動じない冷静さと、深く考える傾向があります。周囲の騒がしさにも巻き込まれず、自分のペースを保つことができるため、バランスの取れた判断力を持ち合わせています。一見控えめに見えるかもしれませんが、必要な時にはしっかりと自分の意見を持っています。',
        image: '/nameraka-chitara.png'
      };
      
    } else if (averageScore <= 3.00) {
      return {
        type: 'ジャッキーカルパス',
        description: '常にエネルギッシュで人々を楽しませる天性の持ち主です。社交的でフレンドリー、場の雰囲気を明るくするのが得意で、どんな集まりでも中心人物になります。話術に長け、ユーモアを交えながら周囲を引き込むことができるため、人々は彼らの周りに自然と集まってきます。時にはやや騒がしいと感じられることもありますが、そのエネルギーとポジティブな姿勢は、多くの人々にとって魅力的に映ります。',
        image: '/jacky-karupasu.png'
      };
      
    } else {
      return { type: '未定義のパーソナリティ', description: '', image:'' };
    }
  };

  const LoadingScreen = () => (
    <div style={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 64px)', marginTop: '64px',}}>
      <img src="/beer-loading.gif"/>
      <Typography>診断中・・・</Typography>
    </div>
  );  
  
  const handleSubmit = () => {
    const isAllAnswered = !Object.values(selectedBox).some(score => score === null);
  
    if (isAllAnswered) {
      setIsLoading(true); // ロード開始
      const { type, description, image } = calculatePersonality();
      setTimeout(() => {
        router.push(`/results?personalityType=${encodeURIComponent(type)}&description=${encodeURIComponent(description)}&image=${encodeURIComponent(image)}`);
      }, 3000);
    } else {
      setShowErrorMessage(true);
    }
  }
  const fadeInUpAnimation = (delay: number) => ({
    '@keyframes fadeInUp': {
      '0%': {
        opacity: 0,
        transform: 'translateY(20px)'
      },
      '100%': {
        opacity: 1,
        transform: 'translateY(0)'
      }
    },
    animation: `fadeInUp 1s ease-out ${delay}s forwards`,
    opacity: 0
  });

    // 各行に適用するスタイルを生成
  const Line = ({ children, delay }: { children: React.ReactNode; delay: number }) => (
    <Typography
      component="span"
      display="block" // 各行をブロック要素にする
      sx={{
        mb: 10, // 行間の隙間
        textAlign: 'center',
        whiteSpace: 'pre-line',
        lineHeight: '1.5',
        fontSize: '20px',
        ...fadeInUpAnimation(delay), // アニメーション適用
      }}
    >
      {children}
    </Typography>
  );

    // アニメーションのスタイルを定義
  const arrowBounceAnimation = {
    '@keyframes arrowBounce': {
      '0%': {
        transform: 'translateY(0)'
      },
      '50%': {
        transform: 'translateY(-10px)'
      },
      '100%': {
        transform: 'translateY(0)'
      }
    },
    animation: 'arrowBounce 2s ease-in-out infinite' // 2秒間の無限ループ
  };

  const ScrollArrow = () => (
    <Box sx={{ ...arrowBounceAnimation }}>
      <KeyboardArrowDownIcon fontSize="large" />
    </Box>
  );
  

  return (
    <Box sx={{ px: 1, py: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Header />
      {isLoading ? (
      <LoadingScreen />
    ) : (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100vh' }}>
          <Line delay={0.5}>飲みの場で変貌するあなた、、</Line>
          <Line delay={1.5}>周りからどう映る？</Line>
          <Line delay={2.5}>引かれてしまう前に</Line>
          <Line delay={3.5}>名刺を作成して共有しておこう</Line>
          <Line delay={4.0}><ScrollArrow /></Line>
        </Box>

        {questions.map((question:Question, index: number) => (
          <Box key={question.id} sx={{mt:10,  mx:"auto", width: '100%', maxWidth:"800px",}}>
          <Typography sx={{
              fontSize: "1.5rem", 
              fontWeight:"bold", 
              '@media (max-width: 500px)': {
                fontSize: "1.2rem"
              }
            }}>Q{index + 1}<br/>{question.textQuestion}</Typography>
          <Box
            sx={{
              mt:5,
              mx:"auto",
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gridTemplateRows: 'repeat(2, 1fr)',
              gap: '10px',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              maxWidth:"800px",
            }}
          >
            {question.textSelect.map((text, index) => (
                <CircleBox
                  key={index}
                  onClick={() => handleBoxClick(question.id, index)}
                  selected={selectedBox[question.id] === index}
                  text={text}
                />
              ))}
          </Box>
          </Box>
        ))}
        {!showErrorMessage && (
          <Button variant="contained" sx={{ color:'white', backgroundColor: '#D61423 !important', fontSize: '1.4rem', mt: 4, width: "30%",'@media (max-width: 500px)': { fontSize: "1.2rem" }}} onClick={handleSubmit}>
            診断する
          </Button>
        )}
        {showErrorMessage && (
          <Typography sx={{ color: 'red', mt: 2 }}>
            全ての問いに回答してください
          </Typography>
        )}
      </div>
      )}
    </Box>
  );
}
