import React, { useState, useEffect } from "react";
import Table from "../../components/Table";
import axios from "axios";
import Button from "../../components/button/Button";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import Popupform from "../../components/popup/Popupform";
import PopupMenu from "../../components/PopupMenu";
import AddAlbumForm from "../../components/popup/AddAlbumForm";
import "./AlbumManager.css";

const AlbumManager = () => {
  const [Albums, setAlbums] = useState([]);
  const [show, setShow] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [id, setId] = useState("");

  const open = Boolean(anchorEl);
  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setId(id);
  };
  const menuClose = () => {
    setAnchorEl(null);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Get All Albums
  const GetAllAlbums = async () => {
    await axios
      .get("/album/")
      .then((res) => {
        if (res.data.success) {
          const allAlbums = res.data.albums;
          setAlbums(allAlbums);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    GetAllAlbums();
  }, []);

  const filterData = (Albums, searchKey) => {
    const result = Albums.filter(
      (Albums) =>
        Albums.title.toLowerCase().includes(searchKey) ||
        Albums.artist.toLowerCase().includes(searchKey) ||
        Albums.genre.toLowerCase().includes(searchKey)
    );
    setAlbums(result);
  };

  const handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value.toLowerCase();
    axios.get("/album/").then((res) => {
      if (res.data.success) {
        filterData(res.data.albums, searchKey);
      }
    });
  };

  //table columns
  const columns = [
    {
      field: "#",
      headerName: "#",
      sortable: true,
      renderCell: (index) => index.api.getRowIndex(index.row._id) + 1,
    },
    {
      field: "title",
      headerName: "Title",
      width: 250,
    },
    {
      field: "artist",
      headerName: "Artist",
      width: 250,
    },
    {
      field: "genre",
      headerName: "Genre",
      width: 250,
    },
    {
      field: "releaseDate",
      headerName: "Release Date",
      width: 250,
    },
    {
      field: "id",
      headerName: "Action",
      width: 250,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <div>
            <BsThreeDots
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(event, id) => handleClick(event, params.row._id)}
            />
            <PopupMenu
              anchorEl={anchorEl}
              menuClose={menuClose}
              open={open}
              id={id}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div className="setBody">
      <div className="faq">
        <span>ABC Entertainments</span>
      </div>

      <div className="search-container">
        <div className="albums">
          <span>Albums </span>
        </div>
        <input
          type="search"
          className="search-input"
          placeholder="Search.."
          onChange={handleSearchArea}
        />
        <Button
          text={"Add New Album"}
          icon={<AiFillPlusCircle size={26} />}
          onClick={handleShow}
        />
      </div>

      <div className="table-container">
        <Table
          columns={columns}
          rows={Albums}
          style={{
            width: "100%",
            backgroundColor: "white",
            borderRadius: "20px",
            border: "none",
            outline: "none",
          }}
        />
      </div>

      <div className="footer-container">
        <span>copyright @ABC-Entertainment.All Rights Reserved</span>
        <span>@ Print Policy | Terms of Service | Help Center</span>
      </div>

      <Popupform
        show={show}
        onHide={handleClose}
        title={"ADD NEW ALBUM"}
        body={<AddAlbumForm onHide={handleClose} />}
      />
      <br />
    </div>
  );
};

export default AlbumManager;
