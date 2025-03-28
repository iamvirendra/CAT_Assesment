import React, { useEffect, useState } from "react";
import { Button, Card, CardContent, Select, MenuItem, Grid } from "@mui/material";

const API_URL = "https://api.thecatapi.com/v1/images/search";
const BREEDS_URL = "https://api.thecatapi.com/v1/breeds";


export default function CatGallery() {
  const [cats, setCats] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");

  useEffect(() => {
    fetchBreeds();
    fetchCats();
  }, []);

  const fetchBreeds = async () => {
    try {
      const res = await fetch(`${BREEDS_URL}`);
      const data = await res.json();
      setBreeds(data);
    } catch (error) {
      console.error("Error fetching breeds:", error);
    }
  };

  const fetchCats = async () => {
    try {
      const url = `${API_URL}?limit=9&order=DESC${selectedBreed ? `&breed_ids=${selectedBreed}` : ""}`;
      const res = await fetch(url);
      const data = await res.json();
      setCats(data);
    } catch (error) {
      console.error("Error fetching cats:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <Select value={selectedBreed} onChange={(e) => setSelectedBreed(e.target.value)} displayEmpty>
          <MenuItem value="">All Breeds</MenuItem>
          {breeds.map((breed) => (
            <MenuItem key={breed.id} value={breed.id}>{breed.name}</MenuItem>
          ))}
        </Select>
        <Button variant="contained" onClick={fetchCats}>Load More</Button>
      </div>
      <Grid container spacing={3}>
        {cats.map((cat) => (
          <Grid item xs={12} sm={6} md={4} key={cat.id}>
            <Card>
              <CardContent>
                <img src={cat.url} alt="Cat" style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "8px" }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}