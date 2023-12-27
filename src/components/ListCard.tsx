import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { useNFT } from "@thirdweb-dev/react";
import { DataState } from "@/app/provider";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogFooter,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

type ListCardType = {
  tokenId: number;
  price: number;
  seller: string;
  setRefresh: Dispatch<SetStateAction<boolean>>;
};

const ListCard: React.FC<ListCardType> = ({
  tokenId,
  price,
  seller,
  setRefresh,
}) => {
  const [open, setOpen] = useState(false);
  const { basicNFT, convert, buyNFT, address, updateListing, cancelListing } =
    DataState();
  const nft = useNFT(basicNFT.contract, tokenId);
  const [usd, setUsd] = useState<number | undefined>(0);
  const [newPrice, setNewPrice] = useState<string>("");
  const [spin, setSpin] = useState<boolean>(false);
  const [rspin, setRSpin] = useState<boolean>(false);

  useEffect(() => {
    const getConversion = async () => {
      const data = await convert(price);
      setUsd(data);
    };
    getConversion();
  }, []);

    const handleOpen = () => setOpen(!open);
    const handleClick = async () => {
      setSpin(true);
      const amount = (price / 1000000000).toString();
      await buyNFT(tokenId, amount);
      toast.success(`#${tokenId} Purchased`);
      setSpin(false);
    };

    const handleUpdate = async () => {
      setSpin(true);
      await updateListing(tokenId, parseFloat(newPrice) * 1e9);
      handleOpen();
      toast.success(`#${tokenId} Updated`);
      setSpin(false);
    };

    const handleRemove = async () => {
      setRSpin(true);
      await cancelListing(tokenId);
      setRefresh((prev)=>!prev);
      setRSpin(false);
    };

  return (
    <div className="h-72 w-60 m-5 bg-white rounded-md drop-shadow-xl">
      <div className="w-full h-4/6 rounded-md relative">
        <div className="z-[1] absolute right-1 top-0 text-sm text-pink-500">
          <h1>Owned by {seller.slice(0, 5) + "......" + seller.slice(-3)}</h1>
        </div>
        <Image
          className="rounded-t-md"
          src={
            (nft.data?.metadata.display_image as string)
              ? (nft.data?.metadata.display_image as string)
              : (nft.data?.metadata.file as string)
          }
          alt={nft.data?.metadata.name as string}
          fill={true}
        />
      </div>
      <div className="flex flex-row items-center">
        <h1 className="mx-2 mt-1 text-md flex items-center">
          {nft.data?.metadata.name}
          {Boolean(nft.data?.metadata.display_image) && (
            <FontAwesomeIcon
              className="ml-1"
              icon={faCube}
              shake
              style={{ color: "#4151b0" }}
            />
          )}
        </h1>
        <h1 className="ml-auto mr-1 text-pink-500">#{tokenId}</h1>
      </div>
      <h1 className="mx-2 text-md flex flex-row">
        {price / 1000000000} ETH / {usd} USD
      </h1>
      {seller.toLowerCase() !== address?.toLowerCase() ? (
        <Button
          disabled={spin}
          className="px-5 py-2 mx-[75px] my-4 flex flex-row items-center"
          variant="gradient"
          color="indigo"
          onClick={handleClick}
        >
          {spin ? <Spinner color="indigo" /> : <span>Buy</span>}
          <Image
            className="m-1"
            alt="spark"
            src="/static/lightning-icon.png"
            height={10}
            width={10}
          />
        </Button>
      ) : (
        <ButtonGroup className="my-4 mx-6" variant="gradient" color="indigo">
          <Button
          onClick={handleOpen}
          >
            <span>Update</span>
          </Button>
          <Button
            disabled={rspin}
            onClick={handleRemove}
          >
            {rspin ? <Spinner color="indigo" /> : <span>Remove</span>}
          </Button>
        </ButtonGroup>
      )}
      <Dialog
        className="p-5"
        open={open}
        handler={handleOpen}
      >
        <Input
          crossOrigin="anonymous"
          size="lg"
          variant="outlined"
          label="Enter Price(ETH)"
          color="indigo"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
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
            className=""
            variant="gradient"
            color="indigo"
            onClick={handleUpdate}
          >
            {spin ? <Spinner color="indigo" /> : <span>Update</span>}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default ListCard;
