import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Test from './pages/Test';
import Todo from './pages/Todo';
import TypeTest from './pages/TypeTest';
import InterfaceTest from './pages/InterfaceTest';
import HasFlagTest from './pages/HasFlagTest';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/test" element={<Test />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/type-test" element={<TypeTest />} />
          <Route path="/interface-test" element={<InterfaceTest />} />
          <Route path="/has-flag-test" element={<HasFlagTest />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
