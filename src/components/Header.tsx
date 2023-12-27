import React, { useEffect,useState } from "react";
import ModelDialog from "./ModelDialog";
// import { DataState } from "../context/DataProvider";
import { ConnectWallet } from "@thirdweb-dev/react";
import { Button,Badge } from "@material-tailwind/react";

const Header:React.FC = () => {
//   const { withdrawProceeds, data } = DataState();
const [open, setOpen] = useState<boolean>(false);
const [proceeds, setProceeds] = useState<number>(0);

//   useEffect(() => {
//     const decimalValue = parseInt(data?._hex, 16);
//     setProceeds(decimalValue / 1e18);
//   }, [data]);

  return (
    <div className="navbar z-[1] absolute top-0 left-0 w-full p-4">
      <div className="flex flex-row items-center">
        <div className="py-2 px-4 font-bold text-white text-3xl text-left">
          SolarCraft
        </div>
        <div className="ml-auto flex flex-row">
          {proceeds !== 0 ? (
            <Badge withBorder>
              <Button
                className="mr-2"
                color="indigo"
                variant="gradient"
                onClick={() => setOpen(true)}
              >
                Mint and Add Planets
              </Button>
            </Badge>
          ) : (
            <Button
              className="mr-2"
              color="indigo"
              variant="gradient"
              onClick={() => setOpen(true)}
            >
              Mint and Add Planets
            </Button>
          )}
          <ConnectWallet />
        </div>
      </div>
      <ModelDialog open={open} handleClick={setOpen} />
    </div>
  );
};

export default Header;
