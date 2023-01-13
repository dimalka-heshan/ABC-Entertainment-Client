import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddAlbum.css";

function AddAlbum() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genres, setGenres] = useState([]);

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

  const addAlbum = async (status) => {
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
    <div
      className="card shadow-5-strong"
      style={{
        alignSelf: "center",
        justifyContent: "center",
        width: "50%",
        marginTop: "30px",
        background: "hsla(0, 0%, 100%, 0.8)",
        backdropFilter: ` blur(20px)`,
        marginLeft: "24rem",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <center>
        <h2 className="fw-bold mt-3" style={{ color: "gray" }}>
          ADD ALBUM
        </h2>
      </center>
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
              type="text"
              className="form-control"
              placeholder="Release Date"
              onChange={(e) => setReleaseDate(e.target.value)}
              required
            />
            <label for="floatingInput">Release Date</label>
          </div>

          <hr />

          <button type="submit" className="btn btn-primary btn-block mb-4" onClick={addAlbum}>
            ADD ROOM
          </button>
        </div>
        <div className="col"></div>
      </form>
    </div>
  );
}

export default AddAlbum;
