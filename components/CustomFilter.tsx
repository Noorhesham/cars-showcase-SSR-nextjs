'use client';

import { updateSearchParams } from '@/utils';
import { Listbox, Transition } from '@headlessui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';

type OptionProps = {
  title: string;
  value: String;
};

const CustomFilter = ({ title, options }: { title: string; options: Array<OptionProps> }) => {
  const [selected, setSelected] = useState(options[0]);
  const router = useRouter();

  const handleUpdateSearchParams = (e: { title: string; value: string }) => {
    const newPathName = updateSearchParams(title, e.value.toLowerCase());
    router.push(newPathName, { scroll: false });
  };
  return (
    <div className="w-fit">
      <Listbox
        value={selected}
        onChange={(e) => {
          setSelected(e);
          handleUpdateSearchParams(e);
        }}
      >
        <div className=" relative z-10">
          <Listbox.Button
            className="relative w-full min-w-[127px] flex justify-between items-center cursor-default rounded-lg
           bg-white py-2 px-3 text-left shadow-md sm:text-sm border"
          >
            <span className=" block truncate">{selected.title}</span>
            <Image src="/chevron-up-down.svg" width={20} height={20} className="ml-4 object-contain" alt="chevron up down" />
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options
              className="absolute mt-1 max-h-60 w-full z-10 overflow-auto rounded-md bg-white py-1 text-base shadow-lg 
            ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {options.map((item) => (
                <Listbox.Option
                  key={item.title}
                  value={item}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4
                    ${active ? ' bg-primary-blue text-white' : 'text-gray-900 '}`
                  }
                >
                  {({ selected, active }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{item.title}</span>
                      {selected ? (
                        <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'}`}></span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default CustomFilter;
