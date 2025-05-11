import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './pages/Test';
import Todo from './pages/Todo';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/test" element={<Test />} />
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
