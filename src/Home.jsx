import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const getVerse = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://labs.bible.org/api/?passage=random&type=json&callback=myCallback"
      );

      const data = response.data;
      const jsonData = JSON.parse(
        data.replace("myCallback(", "").replace(")", "")
      ); // Clean up the data
      const verse = jsonData[0];

      if (verse) {
        const verseText = `<strong>${verse.bookname} ${verse.chapter}:${verse.verse}</strong> ${verse.text}`;
        setQuote(verseText);
      } else {
        setQuote("No verse found.");
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Failed to fetch quote.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVerse();
  }, []);

  return (
    <div className="main">
      <div className="container">
        <h1>Bible Verse Generator</h1>

        <div className="content">
          {quote && <p dangerouslySetInnerHTML={{ __html: quote }} />}

          <button className="btn btn-success" onClick={getVerse} disabled={loading}>
            {loading ? "Loading..." : "Get a Quote"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
