import React from "react";
import Image from "next/image";
import Head from "next/head";
import Card from "./Card";
import { DataState } from "../context/DataProvider";

const ModelDialog = ({ handleClick }) => {
  const { stars, planets } = DataState();
  return (
    <div className="fixed inset-0 bg-opacity-10 mt-20 flex items-center justify-center">
      <div className="bg-indigo-50 p-2 rounded-2xl w-10/12 h-5/6">
        <div className="relative">
          <div className="absolute top-0 right-0 m-3">
            <Image
              src="/../public/close.png"
              alt="Cross Icon"
              className="cursor-pointer"
              onClick={() => handleClick(false)}
              width={17}
              height={17}
            />
          </div>
        </div>
        <div className="h-full overflow-y-scroll scrollbar-hide">
          <div>
            <h1 className="m-3 text-2xl text-blue-800">Stars</h1>
            <div className="border-t p-0.5 ml-3 mr-20 my-0 rounded-lg bg-blue-800"></div>
            <div className="m-5 flex flex-wrap">
              {stars.map((star) => (
                <Card
                  name={star.name}
                  price={star.price}
                  image={star.image}
                  file={star.file}
                />
              ))}
            </div>
          </div>
          <div>
            <h1 className="m-3 text-2xl text-blue-800">Planets</h1>
            <div className="border-t p-0.5 ml-3 mr-20 my-0 rounded-lg bg-blue-800"></div>
            <div className="m-5 flex flex-wrap">
              {planets.map((planet) => (
                <Card
                  name={planet.name}
                  price={planet.price}
                  image={planet.image}
                  file={planet.file}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDialog;
