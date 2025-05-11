import React, { useState } from 'react';

export default function Test() {
  const [results, setResults] = useState<string[]>([]);
  const [time, setTime] = useState(0);

  const callApis = async () => {
    setResults([]);
    const start = performance.now();

    // 同時に50回APIを呼び出す
    const requests = Array.from({ length: 50 }, (_, i) =>
      fetch('http://localhost:5017/api/test/async').then((res) => res.json())
    );

    const responses = await Promise.all(requests);

    const end = performance.now();
    setResults(responses);
    setTime(Math.round(end - start));
  };

  return (
    <div className="p-4">
      <button onClick={callApis} className="bg-blue-500 text-white px-4 py-2 rounded">
        同時に50回APIを呼び出す
      </button>

      <div className="mt-4">
        <p>かかった時間: {time} ms</p>
        <ul className="list-disc ml-6">
          {results.map((res, i) => (
            <li key={i}>{res}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
