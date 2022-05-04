import React, { useState } from 'react';

const Log = () => {
  console.log("Render");
  return null;
}

const AutomaticBatching: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [sample, setSample] = useState('');

  const updateState = () => {
    setCount(count + 1);
    setTitle(`${title} title`);
    setSample(`${sample} sample`);
  };

  setTimeout(() => {
    setCount(count + 1);
    setTitle(`${title} title`);
    setSample(`${sample} sample`);
    // React will only re-render once at the end (that's batching!)
  }, 1000);

  console.log(`re-rendering: ${count} ${title} ${sample}`);

  return (
    <div>
      <div>
        count is {count} title is {title}
      </div>
      <button
        onClick={updateState}
      >
        update button
      </button>
      <Log />
    </div>
  );

}

export default AutomaticBatching;