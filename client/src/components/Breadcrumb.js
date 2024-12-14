import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const Breadcrumb = ({ title, category }) => {
  const routes = [
    { path: "/:category", breadcrumb: category },
    { path: "/", breadcrumb: "Trang chủ" },
    { path: "/:category/:pid/:title", breadcrumb: title },
  ];
  const breadcrumb = useBreadcrumbs(routes);
  return (
    <div className="text-sm flex items-center">
      {breadcrumb
        ?.filter((el) => !el.match.route === false)
        .map(({ match, breadcrumb }, index, self) => (
          <Link
            className={`flex items-center transition-all duration-300 
                hover:text-red-500 hover:scale-105 
                ${index === self.length - 1 ? "opacity-80" : ""}`}
            key={match.pathname}
            to={match.pathname}
          >
            <span className="capitalize">{breadcrumb}</span>
            {index !== self.length - 1 && (
              <IoIosArrowForward className="ml-1" />
            )}
          </Link>
        ))}
    </div>
  );
};

export default Breadcrumb;
