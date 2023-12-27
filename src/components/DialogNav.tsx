import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
// import { DataState } from "../context/DataProvider";

type DialogNavProps = {
  handleClick: Dispatch<SetStateAction<boolean>>;
  menus: string[];
  switcher: string;
  setSwitcher: Dispatch<SetStateAction<string>>;
}

const DialogNav: React.FC<DialogNavProps> = ({
  handleClick,
  menus,
  switcher,
  setSwitcher,
}) => {
  //   const { withdrawProceeds, data } = DataState();
  const [proceeds, setProceeds] = useState<number>(0);

  //   useEffect(() => {
  //     const decimalValue = parseInt(data?._hex, 16);
  //     setProceeds(decimalValue / 1e18);
  //   }, [data]);

  //   const handleProceed = async () => {
  //     await withdrawProceeds();
  //   };
  return (
    <div className="navber w-full flex flex-row items-center">
      <div className="flex flex-row items-center">
        <button
          className={`m-3 text-xl text-blue-900 hover:border-b-4 active:border-b-4 border-blue-900 ${
            switcher === menus[0] && "border-b-4"
          }`}
          onClick={() => setSwitcher(menus[0])}
        >
          Home
        </button>
        <button
          className={`m-3 text-xl text-blue-900 hover:border-b-4 active:border-b-4 border-blue-900 ${
            switcher === menus[1] && "border-b-4"
          }`}
          onClick={() => setSwitcher(menus[1])}
        >
          My NFTs
        </button>
        <button
          className={`m-3 text-xl text-blue-900 hover:border-b-4 active:border-b-4 border-blue-900 ${
            switcher === menus[2] && "border-b-4"
          }`}
          onClick={() => setSwitcher(menus[2])}
        >
          Create NFT
        </button>
      </div>
      <div className="flex flex-row ml-auto mr-3">
        {/* {proceeds !== 0 && (
          <Button color="indigo" variant="gradient" onClick={handleProceed}>
            Withdraw 0.02 ETH
          </Button>
        )} */}
        <IconButton
          className="ml-5 rounded-full border-2"
          color="indigo"
          variant="text"
          onClick={() => handleClick(false)}
        >
          <FontAwesomeIcon icon={faXmark} size="2xl" />
        </IconButton>
      </div>
    </div>
  );
};

export default DialogNav;
