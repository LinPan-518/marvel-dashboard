import React from "react";
import { Link } from "react-router-dom";

import barrier from "@/assets/error-notice.svg";
import Button from "@/component/button";

interface IErrorInfo {
  title: string;
  message: React.ReactNode;
  hasUniqLink?: boolean;
  uniqLink?: string | React.ReactNode;
}

const errorPageInfo: Record<string, IErrorInfo> = {
  _403: {
    title: "No Access",
    message: (
      <span>
        Unfortunately, you do not have access to this page. <br />
        Please contact your account administrator to get access.
      </span>
    ),
  },
  _401NoAcc: {
    title: "No Accounts",
    message: (
      <span>
        Unfortunately, you do not have any accounts. <br />
        Please register one to get access. <br />
        <br />
        You can try logging in with a different account.
      </span>
    ),
    hasUniqLink: true,
    uniqLink: (
      <Button
        onClick={() => {
          window.location.href = "/logout";
        }}
        label="Login Again"
      />
    ),
  },
  _409: {
    title: "Server API Error",
    message: (
      <span>
        Unfortunately, the server got something wrong. <br />
        Please contact the support team.
      </span>
    ),
  },
  _404: {
    title: "Page/Information Not Found",
    message: "Unfortunately, we couldn't find the page you're looking for.",
  },
  _errorBoundary: {
    title: "Something Wrong",
    message: (
      <>
        Uh Oh! Something has gone wrong.
        <br />
        <br />
        You can refresh the page or report this error if the issue persists.
      </>
    ),
    hasUniqLink: true,
  },
};

interface IProps {
  errorType: string;
  children?: React.ReactNode;
}

const ErrorPage: React.FC<IProps> = ({ errorType, children }) => {
  const data = errorPageInfo[errorType];
  return (
    <section className="flex flex-col w-full items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center p-7">
        <h1 className="text-5xl text-red-500 font-bold mb-4">{data.title}</h1>
        <p className="text-lg text-center">{data.message}</p>
        <img src={barrier} alt="error" className="w-96 h-96" />
        {data.hasUniqLink && <>{data.uniqLink}</>}
        {!data.hasUniqLink && (
          <Link to="/">
            <Button label="Back to Home" />
          </Link>
        )}
        {children}
      </div>
    </section>
  );
};

export const Error401NoAcc = () => <ErrorPage errorType="_401NoAcc" />;
export const Error403 = () => <ErrorPage errorType="_403LinkExpired" />;
export const Error403AccessDenied = () => <ErrorPage errorType="_403" />;
export const Error401 = () => <ErrorPage errorType="_401" />;
export const Error404 = () => <ErrorPage errorType="_404" />;
export const Error409 = () => <ErrorPage errorType="_409" />;
export const ErrorBoundaryPage: React.FC<IProps> = (props) => (
  <ErrorPage errorType={"_errorBoundary"}>{props.children}</ErrorPage>
);
