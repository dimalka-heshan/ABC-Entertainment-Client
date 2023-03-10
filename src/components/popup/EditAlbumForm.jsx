import React, { useState, useEffect } from "react";
import axios from "axios";

const EditAlbumForm = ({ onHide, id }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genres, setGenres] = useState([]);

  //Get All Genres
  const GetAllGenres = async () => {
    await axios
      .get("/genre/")
      .then((res) => {
        if (res.data.success) {
          const allgenres = res.data.genres;
          setGenres(allgenres);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //Get All Genres
  const GetAlbem = async () => {
    await axios
      .get(`/album/${id}`)
      .then((res) => {
        if (res.data.success) {
          setTitle(res.data.album.title);
          setArtist(res.data.album.artist);
          setGenre(res.data.album.genre);
          setReleaseDate(res.data.album.releaseDate);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    GetAllGenres();
    GetAlbem();
  }, []);

  const editAlbum = async (e) => {
    e.preventDefault();
    await axios
      .patch(`/album/${id}`, {
        title: title,
        artist: artist,
        genre: genre,
        releaseDate: releaseDate,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          alert("Album Updated!");
          window.location.href = "/AlbumManager";
        } 
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <form name="form">
      <div style={{ padding: "30px 30px 20px" }}>
        <div className="form-floating mb-3">
          <input
            id="floatingInput"
            name="AlbumTitle"
            type="text"
            className="form-control"
            placeholder="Album Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label>Album Title</label>
        </div>

        <div className="form-floating mb-3">
          <input
            id="floatingInput"
            name="AlbumArtist"
            type="text"
            className="form-control"
            placeholder="Album Artist"
            onChange={(e) => setArtist(e.target.value)}
            value={artist}
            required
          />
          <label>Album Artist</label>
        </div>

        <div className="form-outline mb-3">
          <label className="form-label" for="form8Example5">
            Genre
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            id="size"
            name="size"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option selected>{genre}</option>
            {genres.map((genres) => (
              <option value={genres.genre} key={genres._id}>
                {genres.genre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-floating mb-5">
          <input
            id="floatingInput"
            name="AlbumTitle"
            type="date"
            className="form-control"
            placeholder="Release Date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
          <label>Release Date</label>
        </div>

        <hr />

        <button
          style={{ background: "#28282B" }}
          type="submit"
          className="btn btn-primary btn-block mb-4"
          onClick={editAlbum}
        >
          PUBLISH
        </button>
      </div>
      <div className="col"></div>
    </form>
  );
};

export default EditAlbumForm;
