import { useEffect, useState } from 'react';

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

  useEffect(() => {
    const fetchPermissions = async () => {
      const response = await fetch('http://localhost:5017/api/permissions');
      const data = await response.json();
      console.log(data);
      setSelectedFlags(data.permissions);
    };
    fetchPermissions();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '20px' }}>権限の受け取り</h2>
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
    </div>
  );
}
