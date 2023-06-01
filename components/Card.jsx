import React, { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import { useNFT } from "@thirdweb-dev/react";
import { DataState } from "../context/DataProvider";
import {
  Button,
  Dialog,
  DialogFooter,
  Input,
  ButtonGroup,
  IconButton,
  Spinner,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { createClient } from "urql";

const Card = ({ tokenId }) => {
  const { basicNFT, listItem, addNFT, updateNFT, removeNFT, address } =
    DataState();
  const nft = useNFT(basicNFT.contract, tokenId);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [price, setPrice] = useState("");
  const [speed, setSpeed] = useState("");
  const [scale, setScale] = useState("");
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [z, setZ] = useState("");
  const [view, setView] = useState(false);
  const [spin, setSpin] = useState(false);
  const [spinAdd, setSpinAdd] = useState(false);
  const [spinRemove, setSpinRemove] = useState(false);
  const [enable, setEnable] = useState(false);

  const QueryURL =
    "https://api.studio.thegraph.com/query/46447/solarcraft-database/version/latest";
  const query = `{
    itemAddeds(where: {enable: true, owner: "${address}", tokenId: "${tokenId}"}) {
      scale
      speed
      tokenId
      x
      y
      z
      enable
    }
  }`;

  useEffect(() => {
    const getNFTs = async () => {
      if (address) {
        const client = createClient({
          url: QueryURL,
        });
        const { data } = await client.query(query).toPromise();
        if (data.itemAddeds[0]) {
          setSpeed(data.itemAddeds[0].speed / 100);
          setScale(data.itemAddeds[0].scale / 100);
          setX(data.itemAddeds[0].x / 100);
          setY(data.itemAddeds[0].y / 100);
          setZ(data.itemAddeds[0].z / 100);
          setEnable(data.itemAddeds[0].enable);
          setView(true);
        }
      }
    };
    getNFTs();
  }, []);

  const handleOpen = () => setOpen(!open);
  const handleOpen2 = () => setOpen2(!open2);

  const handleCheck = () =>{
    if (enable) {
      toast.info(`You need to remove #${tokenId} from space to list it`);
    }else{
      handleOpen();
    }
  }

  const handleClick = async () => {
    setSpin(true);
    await listItem(tokenId, parseFloat(price) * 1e9);
    handleOpen();
    setSpin(false);
  };

  const handleAdd = async () => {
    setSpinAdd(true);
    toast.info(`Adding #${tokenId} to space...`);
    await addNFT(tokenId, scale * 100, speed * 100, x * 100, y * 100, z * 100);
    setView(true);
    handleOpen2();
    toast.success(`#${tokenId} Added.Please refresh page to view.`);
    setSpinAdd(false);
  };

  const handleRemove = async () => {
    setSpinRemove(true);
    await removeNFT(tokenId);
    setView(false);
    handleOpen2();
    toast.success(`#${tokenId} Removed`);
    setSpinRemove(false);
  };

  const handleUpdate = async () => {
    setSpinAdd(true);
    await updateNFT(
      tokenId,
      scale * 100,
      speed * 100,
      x * 100,
      y * 100,
      z * 100
    );
    handleOpen2();
    toast.success(`#${tokenId} Updated.Please refresh page to view.`);
    setSpinAdd(false);
  };

  return (
    <div className="h-72 w-60 m-5 bg-white rounded-md drop-shadow-xl">
      <div className="w-full h-56 rounded-md relative">
        <Image
          className="rounded-t-md"
          src={
            nft.data?.metadata.display_image
              ? nft.data?.metadata.display_image
              : nft.data?.metadata.file
          }
          alt={nft.data?.metadata.name}
          fill={true}
        />
      </div>
      <div className="flex items-center">
        <h1 className="mx-2 mt-1 text-lg">{nft.data?.metadata.name}</h1>
        <h1 className="ml-auto mr-1 text-pink-500">#{tokenId}</h1>
      </div>
      {nft.data?.metadata.display_image ? (
        <ButtonGroup className="mx-[60px]" color="indigo" variant="gradient">
          <Button onClick={handleCheck}>List</Button>
          <IconButton onClick={handleOpen2}>
            <FontAwesomeIcon
              icon={faCube}
              size="xl"
              shake
              style={{ color: "#ffffff" }}
            />
          </IconButton>
        </ButtonGroup>
      ) : (
        <Button
          className="mx-20"
          color="indigo"
          variant="gradient"
          onClick={handleOpen}
        >
          List
        </Button>
      )}

      <Dialog className="p-5" open={open} handler={handleOpen}>
        <Input
          size="lg"
          variant="outlined"
          label="Enter Price(ETH)"
          color="indigo"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-2"
          >
            <span>Cancel</span>
          </Button>
          <Button
            disabled={spin}
            variant="gradient"
            color="indigo"
            onClick={handleClick}
          >
            {spin ? <Spinner color="indigo" /> : <span>List</span>}
          </Button>
        </DialogFooter>
      </Dialog>
      <Dialog
        className="p-5 gap-2"
        size="xl"
        open={open2}
        handler={handleOpen2}
      >
        <div className="flex flex-col gap-3">
          <Input
            size="lg"
            variant="outlined"
            label="Rotation Speed"
            color="indigo"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <Input
            size="lg"
            variant="outlined"
            label="Size of Object"
            color="indigo"
            value={scale}
            onChange={(e) => setScale(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <Input
              size="lg"
              variant="outlined"
              label="X"
              color="indigo"
              value={x}
              onChange={(e) => setX(e.target.value)}
            />
            <Input
              size="lg"
              variant="outlined"
              label="Y"
              color="indigo"
              value={y}
              onChange={(e) => setY(e.target.value)}
            />
            <Input
              size="lg"
              variant="outlined"
              label="Z"
              color="indigo"
              value={z}
              onChange={(e) => setZ(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen2}
            className="mr-2"
          >
            <span>Cancel</span>
          </Button>
          <Button
            disabled={spinRemove}
            className="mr-2"
            variant="gradient"
            color="red"
            onClick={handleRemove}
          >
            {spinRemove ? <Spinner color="red" /> : <span>Remove</span>}
          </Button>
          {view ? (
            <Button
              disabled={spinAdd}
              className=""
              variant="gradient"
              color="indigo"
              onClick={handleUpdate}
            >
              {spinAdd ? <Spinner color="indigo" /> : <span>Update</span>}
            </Button>
          ) : (
            <Button
              disabled={spinAdd}
              variant="gradient"
              color="indigo"
              onClick={handleAdd}
            >
              {spinAdd ? <Spinner color="indigo" /> : <span>Add</span>}
            </Button>
          )}
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Card;
