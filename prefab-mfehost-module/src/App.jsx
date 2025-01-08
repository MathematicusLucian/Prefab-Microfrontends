import React, { Suspense } from 'react';
import Intro from './components/Intro';
import './index.css';

const PrefabHeader = React.lazy(() => import('prefab_header_module/PrefabHeader')); 
const PrefabFooter = React.lazy(() => import('prefab_footer_module/PrefabFooter')); 
const PrefabAppContent = React.lazy(() => import('prefab_appcontent_module/PrefabAppContent')); 

function App() {

  return (
    <div className="bg-white dark:bg-black">
      <Suspense fallback={'loading...'}> 
        <PrefabHeader />        
        <Intro />
        <PrefabAppContent />    
        <PrefabFooter />    
      </Suspense>
    </div>
  );
}

export default App;
