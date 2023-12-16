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
        {image && (
          <img src={image} style={{ width: "280px"}}/>
        )}
        <br /><br />
        〜飲みの場ではこんな人です〜<br />
        {description && (
          <span style={{ fontSize: "1rem", margin: "5px 30px", width: "70%" }}>{description}</span>
        )}

      </Typography>
      <Typography sx={{ mt: 4, fontSize: "0.9rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: 'center' }}>
        飲みの場での自分の姿を<br/>共有しておこう
      </Typography>
      <Button
        variant="contained" sx={{ color:'white', backgroundColor: '#D61423 !important', fontSize: '1.4rem', mt: 2, width: "10rem", '@media (max-width: 500px)': {fontSize: "1.2rem"} }}
        onClick={() => window.open(twitterShareUrl, '_blank')}
      >
        𝕏で共有
      </Button>
      <Button variant="contained" sx={{ color:'white', backgroundColor: '#D61423 !important', fontSize: '1.4rem', mt: 4, width: "10rem", '@media (max-width: 500px)': {fontSize: "1.2rem"} }} onClick={handleReset}>
        やり直す
      </Button>

      <Typography sx={{ mt: 6, fontSize: "1.3rem", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
      {image && (
          <img src="/product-nameraka-chitara.png" style={{ width: "100px"}}/>
        )}
        <div  style={{ display:'flex',marginLeft: "15px", flexDirection:'column', alignItems:'center'}}>
          <h2>なめらかチータラとは</h2>
          <p style={{ fontSize: "12px"}}>
            スーパーやコンビニエンスストアの<br />
            冷蔵のチーズコーナーで<br />
            販売されているチータラ。<br />
            なめらかな口解け食感。
          </p>
        </div>
      </Typography>
    </Box>
  );
};

export default Results;
