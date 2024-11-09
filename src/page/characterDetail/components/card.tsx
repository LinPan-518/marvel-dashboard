import { Comics, Series, Stories, Events } from "@/@types/character";
import icon from "@/assets/logo-small.svg";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Button from "@/component/button";
export type CharacterCategory = Comics | Series | Stories | Events;

type CharacterDetailProps = {
  data: CharacterCategory;
  name: string;
};

export default function Card({ data, name }: CharacterDetailProps) {
  // State to toggle the visibility of the list
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle function for expand/collapse
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="flex-1 text-black-default m-8">
      <div className="flex items-center gap-4 mb-4">
        <img src={icon} alt="Marvel Icon" className="float-left w-[32px] h-[32px] mr-1" />
        <h2 className="float-left text-3xl font-bold capitalize w-[150px]">{name}</h2>
        {/* Expand/Collapse Icon */}
        <Button
          variant="icon-only"
          onClick={toggleExpand}
          className="float-left p-0 bg-transparent border-none text-black-light transition duration-300 ease-in-out"
          icon={isExpanded ? <FaChevronUp className="text-xl" /> : <FaChevronDown className="text-xl" />}
        />
      </div>

      {isExpanded && (
        <div className="bg-red-500 p-4 rounded-lg shadow-md">
          {/* Conditionally render the list based on isExpanded */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {data.items.map((item) => (
              <li
                key={item.resourceURI}
                className="bg-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                <div className="flex flex-col items-center">
                  <h3 className="font-semibold text-sm text-gray-800 mb-2 text-center">{item.name}</h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!isExpanded && <hr className="border-black-light border-dashed" />}
    </div>
  );
}
