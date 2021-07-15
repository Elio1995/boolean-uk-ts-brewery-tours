import React, { useState } from "react";
import "./styles/reset.css";
import "./styles/index.css";
import Header from "./components/Header";
import BreweriesSearch from "./components/BreweriesSearch"
import BookingsContainer from "./components/BookingsContainer";

// type SearchInput = {
//   Search: ""
// }

export default function App() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [showBookings, setShowBookings] = useState<boolean>(false);

  return (
  <div id="app">
      <Header submitForm={setSearchInput} setShowBookings={setShowBookings} />
      {/* {!searchInput || (showBookings && <BookingsContainer />)} */}
      {searchInput && <BreweriesSearch searchInput={searchInput} />}
  </div>
  );
}
