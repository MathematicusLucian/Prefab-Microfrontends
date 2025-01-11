import React, { Suspense } from 'react';
import Intro from './components/Intro';
import '@shared-styles/style.css';
import { Separator } from '../../shared-styles/separator';

const PrefabHeader = React.lazy(() => import('prefab_header_module/PrefabHeader')); 
const PrefabFooter = React.lazy(() => import('prefab_footer_module/PrefabFooter')); 
const PrefabAppContent = React.lazy(() => import('prefab_appcontent_module/PrefabAppContent')); 

function App() {

  return (
    // <div className="w-full flex flex-col flex-wrap bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 px-7 py-5">
    //   <div className="w-full p-20">A</div>
    //   <div>A</div>
    //   <div>A</div>
    //   <Suspense fallback={'loading...'}> 
    //     <div className='flex flex-col w-full justify-center'>
    //       <div className='flex flex-row justify-start gap-1'> 
    //         <PrefabHeader />     
    //       </div>
    //       <Separator orientation="horizontal" className="my-2 h-1" />
    //       <div className='flex flex-row w-full justify-start gap-1'> 
    //         <Intro />
    //         <PrefabAppContent />    
    //       </div>
    //       <Separator orientation="horizontal" className="my-2 h-1" />
    //       <div className='flex flex-row w-full justify-start gap-1'> 
    //         <PrefabFooter />  
    //       </div>
    //     </div>  
    //   </Suspense>
    // </div>
    <div className="flex flex-col md:flex-col h-screen w-screen m-3">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
  </div>
  );
}

export default App;
