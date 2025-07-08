// server.js
import express from "express";
import fetch from "node-fetch";
import { Agent } from "https"; // To force IPv4 if needed

const app = express();
const PORT = 3000;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZmNkMmU2NDg0ZTU1NjYzOTI2MGQzOTM1ZGUzNDc5ZiIsIm5iZiI6MTc1MTg3ODg3Ny4xMzUsInN1YiI6IjY4NmI4Y2RkZWI2ZGU3YWVhZTlhNDEzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fkORMBv1MChP35BRE67TkQ9OFlWBuLcfky9FJGaFTaM",
  },
  agent: new Agent({ family: 4 }), // Force IPv4 (important if DNS or ISP has issues)
};

app.get("/", async (req, res) => {
  res.json({
    test: "Welcome to ! - See Live Web URL for this Server - https://",
  });
});

app.get("/now-playing", async (req, res) => {
  const url_now_playing =
    "https://api.themoviedb.org/3/movie/now_playing?page=1";
  try {
    const response = await fetch(url_now_playing, options);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch data from TMDB" });
  }
});

app.get("/popular", async (req, res) => {
  const url_popular= "https://api.themoviedb.org/3/movie/popular";
  try {
    const response = await fetch(url_popular, options);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch data from TMDB" });
  }
});

app.get("/top-rated", async (req, res) => {
  const url_top_rated = "https://api.themoviedb.org/3/movie/top_rated";
  try {
    const response = await fetch(url_top_rated, options);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch data from TMDB" });
  }
});

app.get("/upcoming", async (req, res) => {
  const url_upcoming= "https://api.themoviedb.org/3/movie/upcoming";
  try {
    const response = await fetch(url_upcoming, options);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch data from TMDB" });
  }
});

app.get("/movie", async (req, res) => {
  const { movieID } = req.query;
  const url_MovieId = `https://api.themoviedb.org/3/movie/${movieID}/videos?language=en-US`;
  try {
    const response = await fetch(url_MovieId, options);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch data from TMDB" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
