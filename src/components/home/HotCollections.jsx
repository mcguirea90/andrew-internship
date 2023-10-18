import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [loading, setLoading] = useState(true);


  async function main() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`
    );

    setHotCollections(data);
    setLoading(false);
  }
 

  useEffect(() => {
    main();
  }, []);

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
 
  function renderCollections() {
    return loading ? (
      <Slider {...settings}>
        {new Array(6).fill(0).map((_, index) => (

          <div className="nft_coll" key={index}>
            <div className="nft_wrap">
              <div className="skeleton-box"
                style={{width: "100%", height: "200px"}}>
              </div>
            </div>
            <div className="nft_coll_pp">
              <div className="skeleton-box"
                style={{width: "50px", height: "50px"}}>
              </div>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <div className="skeleton-box"
                style={{width: "100px", height: "20px"}}>
              </div>
              <br />
              <div className="skeleton-box"
                style={{width: "60px", height: "20px"}}>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    ) : (
      <Slider {...settings}>
          {hotCollections.map((hotCollections, index) => (
          <div className="nft_coll" >
            <div className="nft_wrap">
              <Link to="/item-details">
                <img src={hotCollections.nftImage} className="lazy img-fluid" alt="" />
              </Link>
            </div>
            <div className="nft_coll_pp">
              <Link to="/author">
                <img className="lazy pp-coll" src={hotCollections.authorImage} alt="" />
              </Link>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <Link to="/explore">
                <h4>{hotCollections.title}</h4>
              </Link>
              <span>ERC-{hotCollections.code}</span>
            </div>
          </div>
          ))}
          </Slider>
    );
  }


  return ( 
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {renderCollections()}

        </div>
      </div>
    </section>
  );
};

export default HotCollections;
