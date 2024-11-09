import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useCharacter } from "@/hook/useCharacter";
import Card from "@/page/characterDetail/components/card";
import Detail from "@/component/detail";
import { Character } from "@/@types/character";

type CharacterCategory = "comics" | "series" | "stories" | "events";

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isError, isLoading } = useCharacter(id!);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  });

  const renderPresenter = (character: Character) => (
    <>
      <div key={character.id} className="flex-1 border-2 border-gray-400 rounded-xl p-4 h-[300px]">
        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
          className="object-cover h-full w-full"
        />
      </div>
      <div className="flex-1 text-white my-auto text-center">
        <h2 className="text-5xl font-bold mb-4">{character.name}</h2>
        {character.description && (
          <p className="text-lg overflow-y-auto max-h-[500px] sm:overflow-hidden">{character.description}</p>
        )}
      </div>
    </>
  );

  return (
    <Detail isError={isError} isLoading={isLoading} data={data} renderPresenter={renderPresenter}>
      <>
        {data.length > 0 &&
          (["comics", "series", "stories", "events"] as CharacterCategory[]).map((category: CharacterCategory) => {
            if (data[0][category].available > 0) {
              return <Card key={category} data={data[0][category]} name={category} />;
            }
            return null;
          })}
      </>
    </Detail>
  );
};

export default CharacterDetail;
