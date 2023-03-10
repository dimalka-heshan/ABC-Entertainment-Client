import React, { useState, useEffect } from "react";
import axios from "axios";

const AddAlbumForm = ({ onHide }) => {
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
        console.log(res.data.genres);
        if (res.data.success) {
          const allgenres = res.data.genres;
          setGenres(allgenres);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    GetAllGenres();
  }, []);

  const addAlbum = async (e) => {
    e.preventDefault();
    await axios
      .post(`/album/create`, {
        title: title,
        artist: artist,
        genre: genre,
        releaseDate: releaseDate,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          alert(res.data.message);
          window.location.href = "/AlbumManager";
        } else {
          alert(res.data.message);
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
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label for="floatingInput">Album Title</label>
        </div>

        <div className="form-floating mb-3">
          <input
            id="floatingInput"
            name="AlbumArtist"
            type="text"
            className="form-control"
            placeholder="Album Artist"
            onChange={(e) => setArtist(e.target.value)}
            required
          />
          <label for="floatingInput">Album Artist</label>
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
            <option selected>Select Genre</option>
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
            onChange={(e) => setReleaseDate(e.target.value)}
            required
          />
          <label for="floatingInput">Release Date</label>
        </div>

        <hr />

        <button
          style={{ background: "#28282B" }}
          type="submit"
          className="btn btn-primary btn-block mb-4"
          onClick={addAlbum}
        >
          PUBLISH
        </button>
      </div>
      <div className="col"></div>
    </form>
  );
};

export default AddAlbumForm;
