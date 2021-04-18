import React from "react";
export default function ProductItem(props) {
  const { id, imageUrl, name, price, soldAmount, location } = props.item;
  return (
    <div className="grid__col-2c4x">
      <div className="app__product-item">
        <button className="btn app__product-cart-btn" data-id={id}>
          <i className="app__product-cart-btn-icon bi bi-cart"></i>
          Add to cart
        </button>
        <a href="# " className="app__product-link">
          <div className="app__product-top-text">Yêu thích</div>
          <div className="app__product-sale-off">
            <span className="app__product-sale-off-percent">43%</span>
            <span className="app__product-sale-off-label">Giảm</span>
          </div>
          <img
            src={require(`../img/${imageUrl}`).default}
            alt="app__product-img"
            className="app__product-img"
          />

          <div className="app__product-info">
            <div className="app__product-name">{name}</div>
            {/* app__product-discount--disabled */}
            <div className="app__product-discount">Mua 2 giảm 5%</div>
            <div className="app__product-price-wrapper">
              <div className="app__product-price">{price}đ</div>
              {/* empty: app__product-free-ship--empty */}
              <div className="app__product-free-ship">
                <svg
                  height="12"
                  viewBox="0 0 20 12"
                  width="20"
                  className="app__free-ship-icon"
                >
                  <g fill="none" fillRule="evenodd" transform="">
                    <rect
                      fill="#00bfa5"
                      fillRule="evenodd"
                      height="9"
                      rx="1"
                      width="12"
                      x="4"
                    ></rect>
                    <rect
                      height="8"
                      rx="1"
                      stroke="#00bfa5"
                      width="11"
                      x="4.5"
                      y=".5"
                    ></rect>
                    <rect
                      fill="#00bfa5"
                      fillRule="evenodd"
                      height="7"
                      rx="1"
                      width="7"
                      x="13"
                      y="2"
                    ></rect>
                    <rect
                      height="6"
                      rx="1"
                      stroke="#00bfa5"
                      width="6"
                      x="13.5"
                      y="2.5"
                    ></rect>
                    <circle cx="8" cy="10" fill="#00bfa5" r="2"></circle>
                    <circle cx="15" cy="10" fill="#00bfa5" r="2"></circle>
                    <path
                      d="m6.7082481 6.7999878h-.7082481v-4.2275391h2.8488017v.5976563h-2.1405536v1.2978515h1.9603297v.5800782h-1.9603297zm2.6762505 0v-3.1904297h.6544972v.4892578h.0505892c.0980164-.3134765.4774351-.5419922.9264138-.5419922.0980165 0 .2276512.0087891.3003731.0263672v.6210938c-.053751-.0175782-.2624312-.038086-.3762568-.038086-.5122152 0-.8758247.3017578-.8758247.75v1.8837891zm3.608988-2.7158203c-.5027297 0-.8536919.328125-.8916338.8261719h1.7390022c-.0158092-.5009766-.3446386-.8261719-.8473684-.8261719zm.8442065 1.8544922h.6544972c-.1549293.571289-.7050863.9228515-1.49238.9228515-.9864885 0-1.5903965-.6269531-1.5903965-1.6464843 0-1.0195313.6165553-1.6669922 1.5872347-1.6669922.9580321 0 1.5366455.6064453 1.5366455 1.6083984v.2197266h-2.4314412v.0351562c.0221328.5595703.373095.9140625.9169284.9140625.4110369 0 .6924391-.1376953.8189119-.3867187zm2.6224996-1.8544922c-.5027297 0-.853692.328125-.8916339.8261719h1.7390022c-.0158091-.5009766-.3446386-.8261719-.8473683-.8261719zm.8442064 1.8544922h.6544972c-.1549293.571289-.7050863.9228515-1.49238.9228515-.9864885 0-1.5903965-.6269531-1.5903965-1.6464843 0-1.0195313.6165553-1.6669922 1.5872347-1.6669922.9580321 0 1.5366455.6064453 1.5366455 1.6083984v.2197266h-2.4314412v.0351562c.0221328.5595703.373095.9140625.9169284.9140625.4110369 0 .6924391-.1376953.8189119-.3867187z"
                      fill="#fff"
                    ></path>
                    <path d="m .5 8.5h3.5v1h-3.5z" fill="#00bfa5"></path>
                    <path d="m0 10.15674h3.5v1h-3.5z" fill="#00bfa5"></path>
                    <circle cx="8" cy="10" fill="#047565" r="1"></circle>
                    <circle cx="15" cy="10" fill="#047565" r="1"></circle>
                  </g>
                </svg>
              </div>
            </div>
            <div className="app__product-more">
              <div className="app__more-love">
                <i className="app__love-icon-empty bi bi-heart"></i>
                {/* <i className="app__love-icon-red bi bi-heart-fill"></i> */}
              </div>
              <div className="app__more-rating">
                {/* app__more-rating-icon--gold */}
                <i className="app__more-rating-icon app__more-rating-icon--gold bi bi-star-fill"></i>
                <i className="app__more-rating-icon bi bi-star-fill"></i>
                <i className="app__more-rating-icon bi bi-star-fill"></i>
                <i className="app__more-rating-icon bi bi-star-fill"></i>
                <i className="app__more-rating-icon bi bi-star-fill"></i>
              </div>
              <div className="app__more-sold">
                <span>Đã bán {soldAmount}</span>
              </div>
            </div>
            <div className="app__product-location">{location}</div>
          </div>
        </a>
      </div>
    </div>
  );
}
