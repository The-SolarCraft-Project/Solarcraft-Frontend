import React, { useState, ChangeEvent } from "react";
import { Input, Textarea, Typography, Spinner } from "@material-tailwind/react";
import { useStorageUpload } from "@thirdweb-dev/react";
import { DataState } from "../app/provider";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";

const Createnft: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File>();
  const [type, setType] = useState<string>("");
  const [fileType, setFileType] = useState<boolean>(false);
  const [dimage, setDimage] = useState<File | undefined>();
  const [value, setValue] = useState<string>("");
  const { mintNFT } = DataState();
  const [spin, setSpin] = useState<boolean>(false);
  const { mutateAsync: upload } = useStorageUpload();

  const handleClick = async (): Promise<void> => {
    if (!name) {
      toast.error("Please enter NFT name");
    } else if (!description) {
      toast.error("Please enter NFT description");
    } else if (!file) {
      toast.error("Please select NFT file");
    } else {
      toast.info("Uploading Files & Metadata to IPFS...Might take a while");
      setSpin(true);
      const uploadFile = await upload({
        data: [file],
        options: {
          uploadWithGatewayUrl: true,
          uploadWithoutDirectory: true,
        },
      });
      console.log(uploadFile[0]);
      if (uploadFile) {
        const metadata: {
          name: string;
          description: string;
          file: string;
          attributes: { trait_type: string; value: string }[];
          display_image?: string;
        } = {
          name: name,
          description: description,
          file: uploadFile[0],
          attributes: [
            {
              trait_type: type,
              value: value,
            },
          ],
        };
        if (dimage) {
          const uploadDimage = await upload({
            data: [dimage],
            options: {
              uploadWithGatewayUrl: true,
              uploadWithoutDirectory: true,
            },
          });
          console.log(uploadDimage[0]);
          metadata["display_image"] = uploadDimage[0];
        }
        const jsonData = JSON.stringify(metadata);
        console.log(jsonData);
        const uploadUrl = await upload({
          data: [jsonData],
          options: {
            uploadWithGatewayUrl: true,
            uploadWithoutDirectory: true,
          },
        });
        console.log(uploadUrl[0]);
        toast.success("Files & Metadata Uploaded Successfully");
        await mintNFT(uploadUrl[0]);
        setSpin(false);
      }
    }
  };

  return (
    <div>
      <div className="justify-center flex">
        <Typography variant="h3" color="indigo">
          Create Your Own NFT
        </Typography>
      </div>
      <div className="flex flex-row">
        <form className="flex flex-col w-1/3 mx-10 my-6 gap-5">
          <Input
            crossOrigin="anonymous"
            size="lg"
            variant="outlined"
            label="Enter NFT name"
            color="indigo"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <Textarea
            size="md"
            variant="outlined"
            label="Enter NFT description"
            color="indigo"
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
          />
          <Input
            crossOrigin="anonymous"
            size="lg"
            variant="outlined"
            color="indigo"
            label="Enter NFT trait_type"
            value={type}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setType(e.target.type)
            }
          />
          <Input
            crossOrigin="anonymous"
            size="lg"
            variant="outlined"
            color="indigo"
            label="Enter NFT value"
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
          />
        </form>
        <div className="my-6 h-72 w-96">
          <div className="flex flex-row items-center">
            <h1 className="mr-2">File:</h1>
            <input
              className="bg-white rounded-md file:mr-4 w-full file:bg-indigo-100 file:px-3 file:text-indigo-900 file:p-2 file:border-none file:cursor-pointer hover:file:bg-indigo-200"
              accept=".glb,image/jpeg, image/png"
              type="file"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                  if (e.target.files[0].type === "") {
                    setFileType(true);
                  } else if (
                    e.target.files[0].type === "image/jpeg" ||
                    e.target.files[0].type === "image/png"
                  ) {
                    setFileType(false);
                    setDimage(undefined);
                  }
                }
              }}
            />
          </div>
          {fileType && (
            <div className="flex flex-row items-center mt-5">
              <h1 className="mr-2">Display_Image:</h1>
              <input
                className="bg-white rounded-md file:mr-4 file:bg-indigo-100 file:px-3 file:text-indigo-900 file:p-2 file:border-none file:cursor-pointer hover:file:bg-indigo-200"
                accept="image/jpeg, image/png"
                type="file"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files) {
                    setDimage(e.target.files[0]);
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center mx-10">
        <Button
          className="items-center"
          disabled={spin}
          fullWidth
          size="lg"
          variant="gradient"
          color="indigo"
          onClick={handleClick}
        >
          <div className="flex items-center justify-center w-full">
            {spin ? <Spinner color="indigo" /> : "Mint"}
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Createnft;
