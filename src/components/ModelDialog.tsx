import React, { Dispatch, SetStateAction, useState } from "react";
import { Dialog } from "@material-tailwind/react";
import DialogNav from "./DialogNav";
import Home from "./Home";
import Mynft from "./Mynft";
import Createnft from "./Createnft";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ModelDialogProps= {
  open: boolean;
  handleClick: Dispatch<SetStateAction<boolean>>;
}

const ModelDialog: React.FC<ModelDialogProps> = ({ open, handleClick }) => {
  const menus = ["Home", "MyNft", "CreateNft"];
  const [switcher, setSwitcher] = useState<string>(menus[0]);
  return (
    <Dialog
      className="bg-indigo-50"
      open={open}
      handler={handleClick}
      size="xl"
    >
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <DialogNav
        handleClick={handleClick}
        menus={menus}
        switcher={switcher}
        setSwitcher={setSwitcher}
      />
      <div className="h-[500px]">
        {switcher === menus[0] && <Home />}
        {switcher === menus[1] && <Mynft />}
        {switcher === menus[2] && <Createnft />}
      </div>
    </Dialog>
  );
};

export default ModelDialog;
