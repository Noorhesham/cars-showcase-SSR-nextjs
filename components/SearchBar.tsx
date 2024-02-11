'use client';

import React, { useState } from 'react';
import { SearchManufacturer } from '.';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
    <Image src="/magnifying-glass.svg" width={40} height={40} alt="magnifying glass" className="object-contain" />
  </button>
);
const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (manufacturer === '') return alert('Please fill in the searchbar');
    updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase());
  };
  const updateSearchParams = (model: string, manufacturer: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (model) searchParams.set('model', model);
    else searchParams.delete('model');

    if (manufacturer) searchParams.set('manufacturer', manufacturer);
    else searchParams.delete('manufacturer');
    searchParams.set('limit', "12");
    const newPathName = `${window.location.pathname}?${searchParams.toString()}`;
    console.log(manufacturer, model);
    router.push(newPathName, { scroll: false });
  };
  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer setManufacturer={setManufacturer} manufacturer={manufacturer} />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <div className="flex-1 max-sm:w-full flex justify-start items-center relative">
        <Image src="/model-icon.png" width={25} height={25} className=" absolute w-[20px] h-[20px] ml-4" alt="car model" />
        <input
          type="text"
          name="model"
          placeholder="Tigaun"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full h-[48px] pl-12 p-4 bg-light-white rounded-r-full max-sm:rounded-full outline-none cursor-pointer text-sm"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
