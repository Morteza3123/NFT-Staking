import React, { useEffect, useState } from "react";
import { BsFillImageFill, BsPlusLg, BsCheck } from "react-icons/bs";
import { create } from "ipfs-http-client";
import { NFTStorage, File } from "nft.storage";
import { arrayBuffer } from "stream/consumers";
import { useSelector } from "react-redux";

export default function Create() {
  const [selectedImg, setSelectedImg] = useState({
    imgURL: "",
    selected: false,
  }); //* Preview the selected file *//
  const [file, setFile] = useState<any>(); //* Selected NFT file from user device *//
  const [blob, setBlob] = useState<any>(); //* Selected NFT file from user device *//
  const [typeOfFile, setTypeOfFile] = useState(""); //* Type the selected NFT file *//
  const [imageType, setImageType] = useState(""); //* Type the selected NFT file *//
  const [name, setName] = useState(""); //* NFT name *//
  const [exLink, setExLink] = useState(""); //* NFT extra link *//
  const [description, setDescription] = useState(""); //* NFT description *//
  const [imgHash, setImgHash] = useState(""); //* Hash NFT image To send to the backend *//
  const [totalHash, setTotalHash] = useState(""); //* Hash all NFT data To send to the backend *//
  const [loading, setLoading] = useState(false); //* Toggler for loading modal *//
  const [alert, setAlert] = useState(false);
  const [status, setStatus] = useState("");

  const imgHandler = async (event: any) => {
    if (event.target.files.length !== 0) {
      //*  *//
      setSelectedImg({
        imgURL: URL.createObjectURL(event.target.files[0]),
        selected: true,
      });

      setFile(event.target.files[0]);

      const fileType = event.target.files[0].type;
      setTypeOfFile(fileType);

      const blob = new Blob([event.target.files[0]], { type: fileType });
      setBlob(blob);

      const imagetype = fileType.split("/").pop();
      setImageType(imageType);
      //*  *//
    }
  };

  const collectionContract = useSelector(
    (state: any) => state.counter.collectionContract
  );
  const account = useSelector((state: any) => state.counter.account);
  const library = useSelector((state: any) => state.counter.library);

  async function main() {

    const client = new NFTStorage({
      token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEY4NmFkMENmMjBBQWYxNGJjN0M2RkU2NTY3NzA4OWNGYjllYjk3MzgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1MTY2MDQyNzYxMCwibmFtZSI6Ik1vcnRlemEzMTIzIn0.Nd7lE9fYw7O8mnT39WSkdmvHT2Ywcmj53PXW5PWgqvc",
      
    });

    const metadata = await client.store({
      name: name,
      description: description,
      image: new File([blob], "pinpie.jpg", { type: typeOfFile }),
    });

    const signer = library.getSigner();
    const res = await collectionContract.connect(signer).mint(metadata.url, {
      gasLimit: 3000000,
    });
  }


  return (
    <div className="flex justify-center bg-gradient-to-b from-black  to-gray-900 bg-gray-900">
      <div className="container lg:px-10 text-gray-200 p-10 md:p-0 lg:p-10 w:3/4 lg:w-2/4 border-solid ">
        {/* title */}
        <div className="title font-medium text-4xl py-5 sm:text-3xl sm:text-left">
          <h1>Create New Item</h1>
        </div>

        {/* Upload */}
        <div className="upload text-lg sm:text-base">
          <div className="pt-10 ">
            <label className="lg:w-52 lg:h-52 w-52 h-52 flex justify-center items-center rounded-lg cursor-pointer border-2 border-dashed border-gray-400 dark:hover:bg-zinc-600 hover:bg-zinc-200 transition-all ease-linear duration-150">
              {selectedImg.selected ? (
                <div>
                  <img
                    src={selectedImg.imgURL}
                    alt=""
                    className="lg:w-40 lg:h-40 w-52 h-52 rounded-lg p-[2px]"
                  />
                </div>
              ) : (
                <BsFillImageFill className="text-7xl dark:text-white text-gray-600 " />
              )}
              <input
                type="file"
                className="hidden"
                onChange={(event) => imgHandler(event)}
              />
            </label>
          </div>
        </div>

        {/* Inputs */}
        <div className="inputs pt-10">
          {/* Name input */}
          <div className="name pb-10">
            <div className="text-xl font-medium">
              <label htmlFor="nftName">
                Name<span className="text-red-600 text-base"> *</span>
              </label>
            </div>
            <input
              type="text"
              id="nftName"
              value={name}
              className="w-full p-3 rounded-lg mt-2  border-solid border-2 border-gray-100 bg-transparent  text-lg"
              placeholder="NFT name"
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          {/* Description input */}
          <div className="description pb-10">
            <div className="text-xl font-medium pb-4">
              <label htmlFor="nftDescription">
                Description<span className="text-red-600 text-base"> *</span>
              </label>
              {/* <p className="text-sm font-normal dark:text-gray-400 text-gray-500">
                The description will be included on the items detail page
                underneath its image. Markdown syntax is supported.
              </p> */}
            </div>
            <textarea
              id="nftDescription"
              value={description}
              className="w-full p-3 rounded-lg mt-2 bg-transparent border-solid border-2 border-gray-100  text-lg"
              placeholder="Provide a detailed description of your item."
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
        </div>
        {/* Create button */}
        <div className="createButton flex justify-center text-gray-200 ">
          <button
            onClick={() => main()}
            disabled={
              name.length > 0 &&
              description.length > 0 &&
              exLink.length > 0 &&
              selectedImg.selected
                ? false
                : true
            }
            className={`bg-blue-700 text-lg px-10 py-3 rounded-lg hover:shadow-boxFull hover:shadow-blue-600 hover:bg-blue-600 transition-all ease-linear duration-200 ${
              name && description && selectedImg.selected && exLink
                ? "opacity-100 cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            }`}
          >
            Create
          </button>
          {/* <button onClick={() => console.log(collectionContract.address)}>
            Console
          </button> */}
        </div>
      </div>
    </div>
  );
}
