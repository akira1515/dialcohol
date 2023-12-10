import Header from "@/components/Header";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

const Results = () => {
  const router = useRouter();
  const [personalityType, setPersonalityType] = useState('');

  useEffect(() => {
    const type = router.query.personalityType;
    if (type) {
      setPersonalityType(Array.isArray(type) ? type[0] : decodeURIComponent(type));
    }
  }, [router.query]);
  

  const handleReset = () => {
    router.push('/');
  };

  return (
    <Box sx={{ py: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Header />
      <Typography sx={{ mt: 4, fontSize: "1.3rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        あなたの酒癖タイプは<br />
        {personalityType && (
          <span style={{ fontSize: "2rem", fontWeight: "bold" }}>{personalityType}</span>
        )}
      </Typography>
      <Button variant="contained" sx={{ fontSize: '1.4rem', mt: 4, width: "30%", '@media (max-width: 500px)': {fontSize: "1.2rem"} }} onClick={handleReset}>
        やり直す
      </Button>
    </Box>
  );
};

export default Results;
