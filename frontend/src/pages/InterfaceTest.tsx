export default function InterfaceTest() {
  interface User {
    name: string;
    age: number;
  }

  const user1: User = {
    name: '山田',
    age: 30,
  };

  interface Dog {
    name: string;
  }

  interface Dog {
    breed: string;
  }

  const myDog1: Dog = {
    name: 'Pochi',
    breed: 'Shiba',
  };

  // const myDog2: Dog = {
  //   name: 'Pochi',
  // };

  interface Animal {
    name: string;
    speak(): void;
    status: 'happy' | 'sad';
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Interface Test</h1>
      <p className="mt-2">名前: {user1.name}</p>
      <p>年齢: {user1.age}</p>
    </div>
  );
}
