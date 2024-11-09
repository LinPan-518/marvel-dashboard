import icon from "@/assets/logo-small.svg";

interface SectionHeaderProps {
  title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <div className="flex justify-start items-center gap-4">
      <img src={icon} alt="Marvel Icon" className="w-[32px] h-[32px]" />
      <h1 className="font-bold text-3xl">{title}</h1>
    </div>
  );
};

export default SectionHeader;
