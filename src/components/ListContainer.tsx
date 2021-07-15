import React, { useState, useEffect } from "react";

// import { getBreweriesByState } from "../breweryDbClient";
import getBreweriesByState from "../breweryDbClient";

import BreweriesList from "./BreweriesList";

// TYPES
export type BreweryElement = {
  name: string;
  address: string;
  brewery_type: "micro" | "brewpub" | "regional";
  phone: string | null;
  website_url: string | null;
  street: string | null;
  city: string;
  postal_code: string | null;
  state: string;
  id: number;
};

const parseData = (allBreweries: BreweryElement[]) =>
  allBreweries.filter((brewery) =>
    ["micro", "regional", "brewpub"].includes(brewery["brewery_type"])
  );

const extractCities = (allBreweries: BreweryElement[]) =>
  allBreweries.reduce(
    (acc: string[], brewery) =>
      acc.includes(brewery.city) ? acc : [...acc, brewery.city],
    []
  );

type ListContainerProps = {
  stateInput: string;
  setCities: (cities: string[]) => void;
  filters: {
    selectedCities: string[];
    selectedType: string;
  };
};

export default function ListContainer({
  stateInput,
  setCities,
  filters: { selectedCities, selectedType },
}: ListContainerProps) {
  const [breweries, setBreweries] = useState<BreweryElement[]>([]);
  const [searchInput, setSearchInput] = useState("");

  const applyFilters = (allBreweries: BreweryElement[]) =>
    allBreweries.filter(isSelected);

  const isSelected = ({ city, brewery_type, name }: BreweryElement) => {
    const lowerCasedInput = searchInput.toLowerCase();
    return (
      (selectedType ? selectedType === brewery_type : true) &&
      (selectedCities.length ? selectedCities.includes(city) : true) &&
      (searchInput
        ? city.toLowerCase().includes(lowerCasedInput) ||
          name.toLowerCase().includes(lowerCasedInput)
        : true)
    );
  };

  useEffect(() => {
    stateInput &&
      getBreweriesByState(stateInput).then((data: BreweryElement[]) => {
        const breweries = parseData(data);
        setBreweries(breweries);
        setCities(extractCities(breweries));
      });
  }, [stateInput]);

  return (
    <>
      <h1>List of Breweries from {breweries[0]?.state || "nowhere"}</h1>
      <header className="search-bar">
        <form id="search-breweries-form" autoComplete="off">
          <label htmlFor="search-breweries">
            <h2>Search breweries:</h2>
          </label>
          <input
            id="search-breweries"
            name="search-breweries"
            value={searchInput}
            onInput={({ target }: any) => setSearchInput(target.value)}
            type="text"
          />
        </form>
      </header>
      <BreweriesList breweries={applyFilters(breweries)} />
    </>
  );
}
