import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import NFTSkeleton from "../UI/NFTSkeleton";
import NFTCard from "../UI/NFTCard";
import axios from "axios";


const NewItems = () => {
  const [NFTs, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  async function main() {
    const { data } = await axios.get (
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setNFTs(data);
    setLoading(false)
  }

  useEffect(() => {
    main();
  },[]);
  
  const settings = {
    
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive:[
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  };
 

  function renderNewItems() {
    return loading ? (
      <Slider {...settings}>
        {new Array(4).fill(0).map((_,index) => (
        <NFTSkeleton key={index} />
        ))}
      </Slider>     
    ) : (
      <Slider {...settings}>
        {NFTs.map((nft) => (
          <NFTCard key={nft.id} nft={nft} />
        ))}
      </Slider>
    );
  }
  
  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {renderNewItems()}          

        </div>
      </div>
    </section>
  );
};

export default NewItems;
