import Button from "@/component/button";
import { useNavigate } from "react-router-dom";

export default function Presenter({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <div className="bg-black-default">
      <div className="flex flex-col max-w-screen-xl mx-auto">
        <Button
          label={"Back to Previous Page"}
          onClick={() => navigate(-1)}
          variant="secondary"
          className="w-fit m-10 mb-0"
        />
        <div className="m-h-[420px] p-10 flex flex-col gap-4 items-center sm:flex-row ">{children}</div>
      </div>
    </div>
  );
}
