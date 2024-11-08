import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";

import { Data, Character, CharactersResponse } from "@/lib/types";
import { getCharacterById } from "@/services/characters";
import Card from "@/page/hero/components/card";
import SkeletonLoader from "@/page/hero/components/loading";

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigation = useNavigate();

  const {
    data: character,
    error,
    isLoading,
  } = useSWR(`/characters/${id}`, () =>
    getCharacterById(Number(id))
      .then((res: CharactersResponse) => res.data)
      .then((res: Data<Character>) => {
        if (res.count > 0) {
          return res.results[0];
        } else {
          return undefined;
        }
      })
  );

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (error) {
    navigation("/404");
    return null;
  }
  if (!character) {
    return (
      <div className="bg-black-default h-full flex items-center justify-center">
        <p className="text-white text-center text-sm sm:text-3xl"> No character details found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-black-default">
        <div className="m-h-[420px] p-10 flex flex-col gap-4 items-center sm:flex-row max-w-screen-xl mx-auto ">
          <div key={character.id} className="flex-1 border-2 border-gray-400 rounded-xl p-4 h-[300px]">
            <img
              src={`${character?.thumbnail.path}.${character?.thumbnail.extension}`}
              alt={character?.name}
              className="object-cover h-full w-full"
            />
          </div>
          <div className="flex-1 text-white my-auto text-center">
            <h2 className="text-5xl font-bold mb-4">{character.name}</h2>
            {character.description && (
              <p className="text-lg overflow-y-auto max-h-[500px] sm:overflow-hidden">{character.description}</p>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl m-auto">
        {character.comics.available > 0 && <Card data={character.comics} name="comics" />}
        {character.series.available > 0 && <Card data={character.series} name="series" />}
        {character.stories.available > 0 && <Card data={character.stories} name="stories" />}
        {character.events.available > 0 && <Card data={character.events} name="events" />}
      </div>
    </>
  );
};

export default CharacterDetail;
