import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

const AddAlbumForm = ({ onHide }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genres, setGenres] = useState([]);
  // const [error, setError] = useState({
  //   question: "",
  //   category: "",
  // });

  //Get All Genres
  const GetAllGenres = async () => {
    await axios
      .get("http://localhost:8080/api/v1/genre/")
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

  const addAlbum = async () => {
    await axios
      .post(`http://localhost:8080/api/v1/album/create`, {
        title: title,
        artist: artist,
        genre: genre,
        releaseDate: releaseDate,
      })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          alert("Album added successfully");
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.error(err);
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

          <button style={{background:"#28282B"}} type="submit" className="btn btn-primary btn-block mb-4" onClick={addAlbum}>
            PUBLISH
          </button>
        </div>
        <div className="col"></div>
      </form>

  );
};

export default AddAlbumForm;
