'use client';
import { CarProps } from '@/types';
import Image from 'next/image';
import { CarDetails, CustomeButton } from '.';
import { calculateCarRent, generateCarImageUrl } from '@/utils';
import { useState } from 'react';

interface CarCardProps {
  car: CarProps;
}

const CarCard = ({ car }: CarCardProps) => {
  // prettier-ignore
  const [isOpen,setIsOpen]=useState(false)
  const { city_mpg, combination_mpg, cylinders, displacement, drive, fuel_type, highway_mpg, make, model, transmission, year } = car;
  const carRent = calculateCarRent(city_mpg, year);
 
  return (
    <div
      className="flex flex-col p-6 justify-center items-center text-black-100 bg-primary-blue-100 hover:bg-white hover:shadow-md 
    rounded-3xl group"
    >
      <div className="w-full flex justify-between items-start gap-2">
        <h2 className="text-[22px] leading-[26px] font-bold capitalize">
          {make} {model}
        </h2>
      </div>
      <p className="flex mt-6 text-[3.2rem] font-extrabold">
        <span className="self-start text-[1.4rem] font-semibold">$</span>
        {carRent}
        <span className=" self-end text-[1.4rem] font-medium">/day</span>
      </p>
      <div className=" relative w-full h-40 my-3 object-contain">
        <Image src={generateCarImageUrl(car)} alt="car model" fill priority className="object-contain" />
      </div>
      <div className=" relative flex w-full mt-2">
        <div className="flex  group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/steering-wheel.svg" width={20} height={20} alt="steering wheel" />
            <p className="text-[14px]">{transmission === 'a' ? 'Automatic' : 'Manual'}</p>
          </div>
        </div>
        <div className="flex  group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/tire.svg" width={20} height={20} alt="steering wheel" />
            <p className="text-[14px]">{drive.toUpperCase()}</p>
          </div>
        </div>
        <div className="flex  group-hover:invisible w-full justify-between text-gray">
          <div className="flex flex-col justify-center items-center gap-2">
            <Image src="/gas.svg" width={20} height={20} alt="steering wheel" />
            <p className="text-[14px]">{city_mpg} MPG</p>
          </div>
        </div>
        <div className="hidden group-hover:flex absolute bottom-0 w-full z-10">
          <CustomeButton
            title="View more.."
            containerStyles="w-full py-[1.6rem] rounded-full bg-primary-blue"
            textStyles="text-white text-[14px] leading-[1.7rem] font-bold"
            rightIcon="/right-arrow.svg"
            handleClick={() => setIsOpen(true)}
          />
        </div>
      </div>
      <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
    </div>
  );
};

export default CarCard;
