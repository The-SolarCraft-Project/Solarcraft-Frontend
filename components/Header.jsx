import React from "react";
import ModelDialog from "./ModelDialog";
import { DataState } from "../context/DataProvider";


const Header = () => {
  const { connect, address } = DataState();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="navbar z-[1] absolute top-0 left-0 w-full p-4">
      <div className="flex flex-row items-center">
        <div className="py-2 px-4 font-bold text-white text-3xl text-left">
          SolarCraft
        </div>
        <div className="ml-auto flex flex-row">
          <button
            className="bg-blue-400 text-white rounded-2xl px-5 py-2 mr-2"
            onClick={() => setOpen(true)}
          >
            Mint and Add Planets
          </button>
          <button
            className={
              address
                ? "bg-green-400 text-white rounded-2xl px-5 py-2 mr-2"
                : "bg-blue-400 text-white rounded-2xl px-5 py-2 mr-2"
            }
            onClick={() => {
              connect();
              console.log(address);
            }}
          >
            {address
              ? address.slice(0, 5) + "......" + address.slice(-3)
              : "Connect"}
          </button>
          {/* <ConnectButton moralisAuth={false} /> */}
        </div>
      </div>
      {open && <ModelDialog handleClick={setOpen} />}
    </div>
  );
};

export default Header;
