import React, { useEffect, useState, useMemo } from "react";
import useSWR from "swr";
import mask from "@/assets/mask.jpg";

import MaskContainer from "@/component/mask";
import SearchBar from "@/component/search";
import SkeletonLoader from "@/page/dashboard/components/loading";
import type { Character, CharactersResponse, Data } from "@/lib/types";
import { GetCharactersParameters } from "@/services/characters";
import icon from "@/assets/logo-small.svg";
import { useNavigate } from "react-router-dom";
import { PAGE_LIMIT } from "@/lib/constants";

import CharacterTable from "./components/charactars";
import { getCharacters } from "@/services/characters";

const CharactersBoard: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [searchString, setSearchString] = useState("");
  const [searchResults, setSearchResults] = useState<Character[]>([]);
  const navigation = useNavigate();

  const {
    data: characters,
    error,
    isLoading,
  } = useSWR(`/characters`, () => {
    const searchParams: GetCharactersParameters = { offset: offset };
    if (searchString !== "") {
      searchParams.name = searchString;
    }
    return getCharacters(searchParams)
      .then((res: CharactersResponse) => res.data)
      .then((res: Data<Character>) => {
        if (res.count > 0) {
          return res.results;
        } else {
          return undefined;
        }
      });
  });

  if (error) {
    navigation("/404");
    return null;
  }

  const handleSearch = (searchString: string) => {
    setSearchString(searchString);
  };

  if (characters === undefined) {
    return <p>No characters found.</p>;
  }

  return (
    <>
      <MaskContainer
        imgPath={mask}
        title="Marvel Characters"
        subTitle="Get hooked on a hearty helping of heroes and villains from the humble House of Ideas!"
      />
      <div className="container mx-auto p-4">
        <div className="flex justify-start items-center gap-4">
          <img src={icon} alt="Marvel Icon" className="w-[32px] h-[32px]" />
          <h1 className="font-bold text-3xl">Marvel Characters List</h1>
        </div>
        <SearchBar className={"w-[60%] p-4"} onSearch={(searchString) => handleSearch(searchString)} />
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <CharacterTable data={characters} loadMore={(page) => setOffset(page * PAGE_LIMIT)} />
        )}
      </div>
    </>
  );
};

export default CharactersBoard;
