import React, { useState, useEffect } from "react";
import axios from "axios";
//const moment = require("moment");

const ViewAlbum = ({ id }) => {
  const [album, setAlbum] = useState("");

  const GetSpecificAlbum = async () => {
    await axios
      .get(`http://localhost:8080/api/v1/album/${id}`)
      .then((res) => {
        if (res.data.success) {
          setAlbum(res.data.album);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    GetSpecificAlbum();
  }, []);

  return (
    <div>
      Title : {album.title}
      <br />
      Artist : {album.artist} <br />
      Genre : {album.genre} <br />
      {/* Release Date : {moment(question.createdAt).format("MM/DD/YYYY")} */}
      <br />
    </div>
  );
};

export default ViewAlbum;
