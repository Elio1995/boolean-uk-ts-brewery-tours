import React, { SyntheticEvent, useState } from "react";

import ListContainer from "./ListContainer";
import FilterContainer from "./FilterContainer";

type BreweriesSearchProps = {
  searchInput: string
}

type FilterType = {
  selectedCities: string[]
  selectedType: string
}

export default function BreweriesSearch( props: BreweriesSearchProps ) {
  const {searchInput} = props
  const [cities, setCities] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterType>({
    selectedCities: [],
    selectedType: "",
  });

  const updateFilters = (e: SyntheticEvent) => {
    let { name, value, checked, type } = e.target as HTMLInputElement;

    if (type === "checkbox") {
     const  newValue = checked
        ? [...filters.selectedCities, value]
        : filters.selectedCities.filter(c => c !== value);

    setFilters({ ...filters, [name]: newValue });
  } else {
    setFilters({ ...filters, [name]: value });
  }
}

  return (
    <main className="main-search">
      <ListContainer
        stateInput={searchInput}
        setCities={setCities}
        filters={filters}
      />
      <FilterContainer
        cities={cities}
        filterSelections={filters}
        updateFilter={updateFilters}
      />
    </main>
  );
}
