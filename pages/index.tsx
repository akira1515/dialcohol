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

  const handleBoxClick = (questionId: number, value: number) => {
    setSelectedBox(prev => ({ ...prev, [questionId]: value }));
    setShowErrorMessage(false);
  }

  const calculatePersonality = () => {
    const answeredQuestionsCount = Object.values(selectedBox).filter(score => score !== null).length;
    const totalScore = Object.values(selectedBox).reduce((sum, score) => sum + (score ?? 0), 0);
    const averageScore = answeredQuestionsCount > 0 ? totalScore / answeredQuestionsCount : 0;
  
    if (averageScore <= 1.49) {
      return 'なめらかチータラ';
    } else if (averageScore <= 3.00) {
      return 'ジャッキーカルパス';
    } else {
      return '未定義のパーソナリティ';
    }
  };

  const handleSubmit = () => {
    const isAllAnswered = !Object.values(selectedBox).some(score => score === null);
    
    if (isAllAnswered) {
      const personality = calculatePersonality();
      router.push(`/results?personalityType=${encodeURIComponent(personality)}`);
    } else {
      setShowErrorMessage(true);
    }
  }

  return (
    <Box sx={{ py: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Header />
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
    </Box>
  );
}
