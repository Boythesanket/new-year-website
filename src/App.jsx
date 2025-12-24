import React, { useState } from 'react';

import Meet from './components/Meet';
import TextPage3 from './components/pages/TextPage3';
import TreePage4 from './components/pages/TreePage4';
import StarPage5 from './components/pages/StarPage5';
import NewYear from './components/pages/NewYear';
import FlyingTextPage6 from './components/pages/FlyingTextPage6';
import Welcome from './components/Welcome';

const App = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <>
      {!isUnlocked ? (
        // ⏳ BEFORE TIME ENDS
        <NewYear onFinish={() => setIsUnlocked(true)} />
      ) : (
        // 🎉 AFTER TIME ENDS → SHOW EVERYTHING
        <>
          <Welcome />
          <Meet />
          <TextPage3 />
          <TreePage4 />
          <StarPage5 />
          <FlyingTextPage6 />
        </>
      )}
    </>
  );
};

export default App;
