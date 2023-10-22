import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import NFTSkeleton from "../UI/NFTSkeleton";
import NFTCard from "../UI/NFTCard";

const ExploreItems = () => {
  const [nft, setNFT] = useState([]);
  const [loading, setLoading]= useState(true);
  const [visibility, setVisibility] = useState(8);

  async function fectchExplore(value) {
    const { data } = await axios.get(
      ` https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`
    );
    setNFT(data);
    setLoading(false);
  }

  useEffect(() => {
    fectchExplore("");
  }, []);
  
function renderExplore() {
  return loading
  ? new Array(8).fill(0).map((_, index) => (
    <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
        <NFTSkeleton />
    </div>
  ))
  : nft.map((nft, index) => (
    <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
        <NFTCard nft={nft} />
    </div>
  ))
} 

  function loadMore() {
    if (visibility < 12) {
      setVisibility((prevVibility) => prevVibility + 4);
    } else {
      setVisibility(( prevVibility) => prevVibility + 4);
      document.getElementById("loadmore").style.display="none";
    }
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(event) => fectchExplore(event.target.value)} >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {renderExplore().slice(0, visibility)}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead" onClick={loadMore}>
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
