import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const DemoSuspense: React.FC = () => {
  const [title, setTitle] = useState('');
  const [count, setCount] = useState(0);

  const {isLoading, data} = useQuery('repoData', () =>
    fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res =>
      res.json()
    ), 
    {suspense: true}
  );
  console.log(data);
  console.log(isLoading);

  const suspenseClick = () => {
    setTitle(`${title} title`);
    return new Promise(resolve => {
      setTimeout(() => {
        setCount(count + 1);
      }, 10000)  
    });
  }

  useEffect(() => {
    suspenseClick();
  }, []);

  return (
    <div>
      {data?.name}
      sample
    </div>

  );
}

export default DemoSuspense;