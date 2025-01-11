import React, { Suspense } from 'react';
import Intro from './components/Intro';
import './style.css';

const PrefabHeader = React.lazy(() => import('prefab_header_module/PrefabHeader')); 
const PrefabFooter = React.lazy(() => import('prefab_footer_module/PrefabFooter')); 
const PrefabAppContent = React.lazy(() => import('prefab_appcontent_module/PrefabAppContent')); 

function App() {

  return (
    <main className="bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-7 py-5">
      <Suspense fallback={'loading...'}> 
        <div className='flex flex-col justify-center'>
          <PrefabHeader />     
          <div className='flex flex-row justify-start gap-1'> 
            <Intro />
            <PrefabAppContent />    
          </div>   
          <PrefabFooter />  
        </div>  
      </Suspense>
    </main>
  );
}

export default App;
