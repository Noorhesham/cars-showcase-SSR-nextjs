'use client';

import { useRouter } from 'next/navigation';
import { CustomeButton } from '.';
import { updateSearchParams } from '@/utils';

const ShowMore = ({ pageNum, isNext }: { pageNum: number; isNext: boolean }) => {
  const router = useRouter();
  const handleNavigation = () => {
    const newLimit = (pageNum + 1) * 12;
    const newPathName = updateSearchParams('limit', newLimit.toString());
    router.push(newPathName, { scroll: false });
  };

  return (
    <div>
      {!isNext && (
        <CustomeButton
          title="Show more"
          btnType="button"
          containerStyles="bg-primary-blue rounded-full text-center mx-auto my-5 hover:bg-primary-blue/90 duration-100 text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;
