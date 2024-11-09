import React from "react";
import { useNavigate } from "react-router-dom";
import SkeletonLoader from "@/component/detail/components/loading";
import Presenter from "./components/presenter";

interface DetailComponentProps<T> {
  data: T[];
  isLoading: boolean;
  isError: boolean;
  renderPresenter: (item: T) => React.ReactNode;
  children?: React.ReactElement;
}

const DetailComponent = <T,>({ data, children, isLoading, isError, renderPresenter }: DetailComponentProps<T>) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isError) {
    navigate("/error_404");
    return null;
  }

  if (data.length === 0) {
    return (
      <div className="bg-black-default h-full flex items-center justify-center">
        <p className="text-white text-center text-sm sm:text-3xl"> No data found.</p>
      </div>
    );
  }

  return (
    <>
      <Presenter>{renderPresenter(data[0])}</Presenter>
      <div className="max-w-screen-xl m-auto">{children}</div>
    </>
  );
};

export default DetailComponent;
