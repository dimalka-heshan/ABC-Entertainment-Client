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
          const allgenres = res.data.genres.genre;
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
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Enter Album Title</Form.Label>
        <Form.Control
          as="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* {error && (
          <Form.Text className="text-danger">{error.question}</Form.Text>
        )} */}
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Enter Album Artist</Form.Label>
        <Form.Control
          as="text"
          name="artist"
          onChange={(e) => setArtist(e.target.value)}
        />
        {/* {error && (
          <Form.Text className="text-danger">{error.question}</Form.Text>
        )} */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Genre</Form.Label>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => setGenre(e.target.value)}
        >
          <option>Select Genre</option>
          {genres.map((genres) => (
            <option value={genres.genre} key={genres._id}>
              {genres.genre}
            </option>
          ))}
        </Form.Select>
        {/* {error && (
          <Form.Text className="text-danger">{error.category}</Form.Text>
        )} */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Enter Album Release Date</Form.Label>
        <Form.Control
          as="text"
          name="releaseDate"
          onChange={(e) => setReleaseDate(e.target.value)}
        />
        {/* {error && (
          <Form.Text className="text-danger">{error.question}</Form.Text>
        )} */}
      </Form.Group>
      <div className=" text-center mt-4">
        <Button variant="primary" onClick={addAlbum}>
          Publish
        </Button>
      </div>
    </Form>
  );
};

export default AddAlbumForm;
