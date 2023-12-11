import Header from "@/components/Header";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

const Results = () => {
  const router = useRouter();
  const [personalityType, setPersonalityType] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const type = router.query.personalityType;
    const typeDescription = router.query.description;
    const typeImage = router.query.image;
  
    if (type && typeDescription && typeImage) {
      const decodedType = Array.isArray(type) ? type[0] : decodeURIComponent(type);
      const decodedDescription = Array.isArray(typeDescription) ? typeDescription[0] : decodeURIComponent(typeDescription);
      const decodedImage = Array.isArray(typeImage) ? typeImage[0] : decodeURIComponent(typeImage);
      setPersonalityType(decodedType);
      setDescription(decodedDescription);
      setImage(decodedImage);
    }
  }, [router.query]);


  const handleReset = () => {
    router.push('/');
  };

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `〜飲みの場ではこんな人名刺〜\n【診断結果】\n飲みの場では「 ${personalityType} 」のような人でした！\n診断はこちらから : https://dialcohol.vercel.app/ \n#飲みの場ではこんな人名刺\n#なとり`
  )}`;
  return (
    <Box sx={{ py: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Header />
      <Typography sx={{ mt: 4, fontSize: "1.3rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        あなたは飲みの場では<br />
        {personalityType && (
          <span style={{ fontSize: "2rem", fontWeight: "bold" }}>{personalityType}</span>
        )}
        <span style={{ display: "block" }}>のような人！</span>
        <br />
        {description && (
          <img src={image} style={{ width: "280px"}}/>
        )}
        <br /><br />
        〜飲みの場ではこんな人です〜<br />
        {description && (
          <span style={{ fontSize: "1rem", margin: "5px 30px", width: "70%" }}>{description}</span>
        )}

      </Typography>
      <Typography sx={{ mt: 4, fontSize: "0.9rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        名刺をXで投稿してくれた人の中から<br />抽選でクーポンをプレゼント！
      </Typography>
      <Button
        variant="contained" sx={{ color:'white', fontSize: '1.4rem', mt: 2, width: "30%", '@media (max-width: 500px)': {fontSize: "1.2rem"} }}
        onClick={() => window.open(twitterShareUrl, '_blank')}
      >
        𝕏で共有
      </Button>
      <Button variant="contained" sx={{ color:'white', fontSize: '1.4rem', mt: 4, width: "30%", '@media (max-width: 500px)': {fontSize: "1.2rem"} }} onClick={handleReset}>
        やり直す
      </Button>
    </Box>
  );
};

export default Results;
