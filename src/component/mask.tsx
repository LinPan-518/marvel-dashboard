interface MaskProps {
  imgPath: string;
  title: string;
  subTitle?: string;
}

export default function Mask({ imgPath, title, subTitle }: MaskProps) {
  return (
    <section className="relative w-full h-[400px]">
      <figure className="w-full h-full">
        <img className="object-cover w-full h-full" src={imgPath} alt="Mask Image" />
      </figure>
      <div className="absolute top-0 h-full p-5 w-full text-white uppercase flex items-center">
        <div className="mx-auto my-0 text-center">
          <p className="text-4xl font-extrabold">{title}</p>
          {subTitle && <p>{subTitle}</p>}
        </div>
      </div>
    </section>
  );
}
