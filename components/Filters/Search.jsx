"use client";
import React, { useState, useEffect } from "react";

export default function Search({ onSearch }) {
    const [query, setQuery] = useState('');

    useEffect(() => {
        onSearch(query);
    }, [query]);
    

  return (
    <>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          type="search"
          placeholder="Rechercher"
          className="input input-bordered w-full input-sm lg:w-[200px] text-[16px] rounded-full dark:text-white"
        />
    </>
  );
}
