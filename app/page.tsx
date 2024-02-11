import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components';
import Image from 'next/image';
import { fetchCars } from '@/utils';
import { fuels, yearsOfProduction } from '@/constants';

export default async function Home({ searchParams }) {
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 12,
    model: searchParams.model || '',
  });
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className=" mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className=" text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore cars you might like</p>
        </div>
        <div className="home__filters">
          <SearchBar />
          <div className="home__filter-container">
            <CustomFilter options={fuels} title="fuel" />
            <CustomFilter options={yearsOfProduction} title="year" />
          </div>
        </div>
        <div>
          {!isDataEmpty ? (
            <section>
              <div className="home__cars-wrapper">
                {allCars?.map((car) => (
                  <CarCard key={car} car={car} />
                ))}
              </div>
              <ShowMore pageNum={(searchParams.limit || 12) / 12} isNext={(searchParams.limit || 12) > allCars.length} />
            </section>
          ) : (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">opps no results {allCars?.message}</h2>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
