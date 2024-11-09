import React from "react";
import { useParams } from "react-router-dom";
import { useComic } from "@/hook/useComic";
import Detail from "@/component/detail";
import { Comic } from "@/@types/comics";

const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isError, isLoading } = useComic(id!);

  const renderPresenter = (data: Comic) => (
    <>
      <div className="m-h-[420px] p-10 flex flex-col gap-4 items-center sm:flex-row max-w-screen-xl mx-auto ">
        <div key={data.id} className="flex-1 border-2 border-gray-400 rounded-xl p-4 h-[300px]">
          <img
            src={`${data?.thumbnail.path}.${data?.thumbnail.extension}`}
            alt={data?.title || "Comic Image"}
            className="object-cover h-full w-full"
          />
        </div>
        <div className="flex-1 text-white my-auto text-center">
          <h2 className="text-5xl font-bold mb-4">{data.title}</h2>
        </div>
      </div>
    </>
  );

  return <Detail isError={isError} isLoading={isLoading} data={data} renderPresenter={renderPresenter}></Detail>;
};

export default CharacterDetail;
