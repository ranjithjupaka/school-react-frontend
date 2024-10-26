import { Link } from 'react-router-dom';

import { Button } from '@/lib/components/ui/button';

const Page404 = () => {
  return (
    <div className='md:flex md:min-h-[60vh] md:items-center gap-4 flex items-center justify-center'>
      <div className='text-center'>
        <img width={400} src='/assets/404 Error-rafiki.svg' alt='404' />
      </div>

      <div className='text-center md:text-start'>
        <h1 className='text-3xl'>Page not Found</h1>
      </div>
    </div>
  )
};

export default Page404;
