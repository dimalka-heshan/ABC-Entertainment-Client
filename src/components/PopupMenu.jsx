import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiTickOutline } from "react-icons/ti";
import { GrFormView } from "react-icons/gr";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import Popupform from "./popup/Popupform";
import ViewAlbum from "./popup/ViewAlbum";

const PopupMenu = ({ anchorEl, menuClose, open, id }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //Delete Question
  const onDelete = async (id) => {
    if (window.confirm("Are you sure! You need to delete this album?")) {
      await axios
        .delete(`http://localhost:8080/api/v1/album/${id}`)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data.message);
            alert(res.data.message);
            window.location.href = "/";
          }
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  };
  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={menuClose}
        elevation={1}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleShow();
            menuClose();
          }}
        >
          <GrFormView /> &nbsp;&nbsp; View
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDelete(id);
            menuClose();
          }}
        >
          <RiDeleteBin6Line />
          &nbsp;&nbsp; Delete
        </MenuItem>
      </Menu>
      <Popupform
        show={show}
        onHide={handleClose}
        title={"View Question"}
        body={<ViewAlbum id={id} />}
      />
    </div>
  );
};

export default PopupMenu;
