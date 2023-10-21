import React from 'react'
import Skeleton from "./Skeleton"

function NFTSkeleton() {
  return (
    <div className="nft__item">
        <div className="author_list_pp">
            <Skeleton width={50} height={50} borderRadius="100%" />
        </div>
        <div className="nft__item_wrap">
            <Skeleton width="100%" height="60%" borderRadius={0} />
        </div>
        <div className="nft__item_info">
            <h4>
                <Skeleton width="70%" height={20} borderRadius={0} />
            </h4>
            <div className="nft__item_price">
                <Skeleton width="40%" height={20} borderRadius={0} />
            </div>
            <div className="nft__item_like">
            <Skeleton width={20} height={20} borderRadius={0} />
            </div>
        </div>
    </div>
  );
}

export default NFTSkeleton