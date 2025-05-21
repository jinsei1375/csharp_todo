export default function TypeTest() {
  type User = {
    name: string;
    age: number;
  };

  const user1: User = {
    name: '山田',
    age: 30,
  };

  type Animal = {
    name: string;
  };

  type Dog = Animal & {
    breed: string;
  };

  const myDog1: Dog = {
    name: 'Pochi',
    breed: 'Shiba',
  };

  // const myDog2: Dog = {
  //   name: 'Pochi',
  // };

  type UserId = string; // プリミティブ型
  type Status = 'success' | 'error'; // リテラル型 + ユニオン型
  type Point = { x: number } & { y: number }; // 交差型（intersection）
  type Nullable<T> = T | null; // ジェネリクス + ユニオン
  type StringArray = string[];
  type Coordinate = [number, number];
  type GreetFn = (name: string) => string;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Type Test</h1>
      <p className="mt-2">名前: {user1.name}</p>
      <p>年齢: {user1.age}</p>
    </div>
  );
}
