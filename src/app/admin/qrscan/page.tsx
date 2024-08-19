import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const QRScanVerify = () => {
  const [teamDetails, setTeamDetails] = useState([]);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    if(id){
        
    }
  },[])
};
