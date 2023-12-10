import Header from "@/components/Header";
import CircleBox from "@/components/CircleBox";
import { Question, questions } from "@/data/data";
import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [selectedBox, setSelectedBox] = useState<{ [id: number]: number }>(
    questions.reduce((prev, curr) => ({ ...prev, [curr.id]: null }), {})
  );

  const handleBoxClick = (questionId: number, value: number) => {
    setSelectedBox(prev => ({ ...prev, [questionId]: value }));
    setShowErrorMessage(false);
  }


  const calculatePersonality = () => {
    // スコアが null ではない質問の数を計算
    const answeredQuestionsCount = Object.values(selectedBox).filter(score => score !== null).length;
  
    // 合計スコアを計算する際に null を除外
    const totalScore = Object.values(selectedBox).reduce((sum, score) => sum + (score ?? 0), 0);
  
    // 平均スコアを計算する際に回答した質問の数を使用
    const averageScore = answeredQuestionsCount > 0 ? totalScore / answeredQuestionsCount : 0;
  
    // 平均スコアに基づいて診断結果を返す
    if (averageScore <= 1.49) {
      return 'なめらかチータラ';
    } else if (averageScore <= 3.00) {
      return 'ジャッキーカルパス';
    } else {
      return '未定義のパーソナリティ';
    }
  };
  

  const [message, setMessage] = useState<string>("");
  const [personalityType, setPersonalityType] = useState<string>("");
  const [isDiagnosed, setIsDiagnosed] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);



  const handleSubmit = () => {
    // 未回答の質問があるかチェック
    const isAllAnswered = !Object.values(selectedBox).some(score => score === null);
    
    if (isAllAnswered) {
      const personality = calculatePersonality();
      setPersonalityType(personality);
      setMessage(`あなたの性格タイプは`);
      setIsDiagnosed(true);
      setShowErrorMessage(false); // エラーメッセージを非表示に
    } else {
      setShowErrorMessage(true); // エラーメッセージを表示
    }
  }
  
  const handleReset = () => {
    setSelectedBox(questions.reduce((prev, curr) => ({ ...prev, [curr.id]: null }), {}));
    setMessage("");
    setPersonalityType("");
    setIsDiagnosed(false);
    window.scrollTo(0, 0);
  };


  return (
    <Box sx={{py:8, display:"flex", flexDirection:"column", alignItems:"center"}}>
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
      {!isDiagnosed && (
      <Button variant="contained" sx={{
              fontSize: '1.4rem', 
              mt:4, 
              width:"30%", 
              '@media (max-width: 500px)': {
              fontSize: "1.2rem"
              }
            }} onClick={handleSubmit}>診断する</Button>
      )}
      {showErrorMessage && (
      <Typography sx={{ color: 'red', mt: 2 }}>
        全ての問いに回答してください
      </Typography>
      )}
      <Typography sx={{
              mt:4, 
              fontSize:"1.3rem", 
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              '@media (max-width: 500px)': {
              fontSize: "1.2rem"
              }
            }}>
              {message}
              {personalityType && (
                <><br /><span style={{ fontSize: "2rem", fontWeight: "bold" }}>{personalityType}</span></>
              )}
            </Typography>
            {isDiagnosed && (
      <Button variant="contained" sx={{ 
        fontSize: '1.4rem', 
        mt: 2, 
        width: "30%", 
        '@media (max-width: 500px)': {
          fontSize: "1.2rem"
        }
      }} onClick={handleReset}>やり直す</Button>
    )}
    </Box>
  )
}
