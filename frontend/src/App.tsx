import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './pages/Test';
import Todo from './pages/Todo';
import TypeTest from './pages/TypeTest';
import InterfaceTest from './pages/InterfaceTest';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/test" element={<Test />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/type-test" element={<TypeTest />} />
          <Route path="/interface-test" element={<InterfaceTest />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
