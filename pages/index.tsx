import Header from "@/components/Header";
import CircleBox from "@/components/CircleBox";
import { Question, questions } from "@/data/data";
import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useRouter } from 'next/router';

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
        description: '穏やかで落ち着いた雰囲気を持ち、周囲に安心感を与えるタイプです。物事に動じない冷静さと、深く考える傾向があります。周囲の騒がしさにも巻き込まれず、自分のペースを保つことができるため、バランスの取れた判断力を持ち合わせています。一見控えめに見えるかもしれませんが、必要な時にはしっかりと自分の意見を持っています。'
      };
      
    } else if (averageScore <= 3.00) {
      return {
        type: 'ジャッキーカルパス',
        description: '常にエネルギッシュで人々を楽しませる天性の持ち主です。社交的でフレンドリー、場の雰囲気を明るくするのが得意で、どんな集まりでも中心人物になります。話術に長け、ユーモアを交えながら周囲を引き込むことができるため、人々は彼らの周りに自然と集まってきます。時にはやや騒がしいと感じられることもありますが、そのエネルギーとポジティブな姿勢は、多くの人々にとって魅力的に映ります。'
      };
      
    } else {
      return { type: '未定義のパーソナリティ', description: '' };
    }
  };

  const LoadingScreen = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <img src="/beer-loding.gif"/>
    </div>
  );  
  
  const handleSubmit = () => {
    const isAllAnswered = !Object.values(selectedBox).some(score => score === null);
  
    if (isAllAnswered) {
      setIsLoading(true); // ロード開始
      const { type, description } = calculatePersonality();
      setTimeout(() => {
        setIsLoading(false); // ロード終了
      router.push(`/results?personalityType=${encodeURIComponent(type)}&description=${encodeURIComponent(description)}`);
      }, 3000);
    } else {
      setShowErrorMessage(true);
    }
  }

  return (
    <Box sx={{ py: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Header />
      {isLoading ? (
      <LoadingScreen />
    ) : (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {questions.map((question:Question, index: number) => (
          <Box key={question.id} sx={{mt:10,  mx:"auto", width: '100%', maxWidth:"800px",}}>
          <Typography sx={{
              fontSize: "2rem", 
              fontWeight:"bold", 
              '@media (max-width: 500px)': {
                fontSize: "1.2rem"
              }
            }}>Q{index + 1}, {question.textQuestion}</Typography>
          <Box
            sx={{
              mt:10,
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
          <Button variant="contained" sx={{ fontSize: '1.4rem', mt: 4, width: "30%", '@media (max-width: 500px)': { fontSize: "1.2rem" }}} onClick={handleSubmit}>
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
