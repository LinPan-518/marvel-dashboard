import MarvelListPage from "@/component/listPage";
import mask from "@/assets/mask.jpg";
import { headers, renderRow } from "@/page/characterList/components/table";
import { useCharacters } from "@/hook/useCharacters";
import { Character } from "@/@types/character";

const CharacterIndex = () => (
  <MarvelListPage<Character>
    title="Marvel Characters List"
    subTitle="Get hooked on a hearty helping of heroes and villains from the humble House of Ideas!"
    imgPath={mask}
    headers={headers}
    renderRow={renderRow}
    useData={useCharacters}
    placeholder="Search character name ..."
  />
);

export default CharacterIndex;
