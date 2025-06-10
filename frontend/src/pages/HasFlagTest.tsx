import { useState } from 'react';

export default function HasFlagTest() {
  enum Permission {
    None = 0,
    Read = 1,
    Write = 2,
    Execute = 4,
  }

  // 選択肢
  const options = [
    { label: 'Read', value: Permission.Read },
    { label: 'Write', value: Permission.Write },
    { label: 'Execute', value: Permission.Execute },
  ];

  const [selectedFlags, setSelectedFlags] = useState<Permission>(Permission.None);

  const handleCheckboxChange = (value: Permission) => {
    setSelectedFlags((prev) => {
      // 既に選択されている場合は解除、されていない場合は追加
      return prev & value ? prev & ~value : prev | value;
    });
  };

  const handleSubmit = async () => {
    try {
      console.log('Sending permissions:', selectedFlags);
      const response = await fetch('http://localhost:5017/api/permissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedFlags), // 直接数値を送信
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', errorText);
        throw new Error('Failed to submit permissions');
      }

      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>権限の設定</h2>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
          権限を選択してください
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {options.map((opt) => (
            <label
              key={opt.value}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '4px',
                backgroundColor: selectedFlags & opt.value ? '#f0f0f0' : 'transparent',
                transition: 'background-color 0.2s',
              }}
            >
              <input
                type="checkbox"
                checked={(selectedFlags & opt.value) !== 0}
                onChange={() => handleCheckboxChange(opt.value)}
                style={{
                  width: '18px',
                  height: '18px',
                  cursor: 'pointer',
                }}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
      <button
        style={{
          padding: '8px 16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
        onClick={handleSubmit}
      >
        権限を送信
      </button>
    </div>
  );
}
