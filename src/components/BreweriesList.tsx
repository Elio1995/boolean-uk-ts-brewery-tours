import React, { useState } from "react";
import BreweriesListItem from "./BreweriesListItem";
import { BreweryElement } from "./ListContainer";
import {setOpenFormFunction} from "./BreweriesListItem"

type BreweriesListProps = {
  breweries: BreweryElement[]
}

export default function BreweriesList(props: BreweriesListProps ) {
  const {breweries} = props

  const [openForm, setOpenForm] = useState<setOpenFormFunction | number | null>(null);

  return (
    <article>
      <ul className="breweries-list">
        {breweries.map(brewery => (
          <BreweriesListItem
            key={brewery.id}
            brewery={brewery}
            setOpenForm={setOpenForm}
            isFormOpen={brewery.id === openForm}
          />
        ))}
      </ul>
    </article>
  );
}
