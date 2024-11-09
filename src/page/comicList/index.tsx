import MarvelListPage from "@/component/listPage";
import mask from "@/assets/mask.jpg";
import { headers, renderRow } from "@/page/comicList/components/tableConfig";
import { useComics } from "@/hook/useComics";
import { Comic } from "@/@types/comics";

const ComicIndex = () => (
  <MarvelListPage<Comic>
    title="Marvel Comics List"
    imgPath={mask}
    headers={headers}
    renderRow={renderRow}
    useData={useComics}
    placeholder="Search comics ..."
  />
);

export default ComicIndex;
