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
            placeholder="Type here"
            className="input input-bordered input-sm w-[85%] lg:w-auto rounded-full m-1"
        />
    </>
  );
}
