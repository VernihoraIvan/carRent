/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import styles from "./CatalogItem.module.scss";
import { choosedCar, favoriteCar } from "@/redux/filter/slice";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const CatalogItem = (props) => {
  const dispatch = useDispatch();
  const {
    id,
    accessories,
    year,
    make,
    model,
    type,
    img,
    rentalPrice,
    address,
    rentalCompany,
  } = props.item;

  const { isFavorite } = props.isFavorite;
  console.log(isFavorite);

  const favoriteList = useSelector(favoriteCar);
  console.log(favoriteList.payload.favorite);

  const getRandomInt = (max) => Math.floor(Math.random() * max);
  const city = address.split(",")[1].trim();
  const country = address.split(",")[2].trim();

  const accessoriesItemIndex = getRandomInt(accessories.length - 1);
  const accessoriesItem = accessories[accessoriesItemIndex].split(" ");
  const shortAccessoriesItem = accessoriesItem
    .slice(accessoriesItem.length - 2)
    .join(" ");

  const toFavorite = () => {
    dispatch(favoriteCar(id));
  };

  const onLearnMoreHandler = (id) => {
    dispatch(choosedCar(id));
    props.openModal();
  };

  return (
    <li className={styles.catalog_table_item}>
      <div className={styles.favorite_icon} onClick={toFavorite}>
        {isFavorite ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M15.6301 3.45753C15.247 3.07428 14.7922 2.77026 14.2916 2.56284C13.791 2.35542 13.2545 2.24866 12.7126 2.24866C12.1707 2.24866 11.6342 2.35542 11.1336 2.56284C10.633 2.77026 10.1782 3.07428 9.79509 3.45753L9.00009 4.25253L8.20509 3.45753C7.43132 2.68376 6.38186 2.24906 5.28759 2.24906C4.19331 2.24906 3.14386 2.68376 2.37009 3.45753C1.59632 4.2313 1.16162 5.28075 1.16162 6.37503C1.16162 7.4693 1.59632 8.51876 2.37009 9.29253L3.16509 10.0875L9.00009 15.9225L14.8351 10.0875L15.6301 9.29253C16.0133 8.90946 16.3174 8.45464 16.5248 7.95404C16.7322 7.45345 16.839 6.91689 16.839 6.37503C16.839 5.83316 16.7322 5.2966 16.5248 4.79601C16.3174 4.29542 16.0133 3.84059 15.6301 3.45753Z"
              fill="#3470FF"
              stroke="#3470FF"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M15.63 3.4575C15.2469 3.07425 14.7921 2.77023 14.2915 2.56281C13.7909 2.35539 13.2544 2.24863 12.7125 2.24863C12.1706 2.24863 11.6341 2.35539 11.1335 2.56281C10.6329 2.77023 10.1781 3.07425 9.795 3.4575L9 4.2525L8.205 3.4575C7.43123 2.68373 6.38177 2.24903 5.2875 2.24903C4.19322 2.24903 3.14377 2.68373 2.37 3.4575C1.59623 4.23127 1.16153 5.28072 1.16153 6.375C1.16153 7.46927 1.59623 8.51873 2.37 9.2925L3.165 10.0875L9 15.9225L14.835 10.0875L15.63 9.2925C16.0132 8.90943 16.3173 8.45461 16.5247 7.95401C16.7321 7.45342 16.8389 6.91686 16.8389 6.375C16.8389 5.83313 16.7321 5.29657 16.5247 4.79598C16.3173 4.29539 16.0132 3.84056 15.63 3.4575Z"
              stroke="white"
              strokeOpacity="0.8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <div className={styles.table_item_upper}>
        <div className={styles.img_container}>
          <img
            className={styles.catalog_table_item_img}
            src={img}
            alt="photo"
          />
        </div>
        <div className={styles.item_title_container}>
          <h3 className={styles.item_title}>
            {make} <span className={styles.model}>{model}</span>, {year}
          </h3>
          <p>{rentalPrice}</p>
        </div>
        <ul className={styles.hash_list}>
          <li className={styles.hash_list_item}>{city}</li>
          <li className={styles.hash_list_item}>{country}</li>
          <li className={styles.hash_list_item}>{rentalCompany}</li>
          <li className={styles.hash_list_item}>{type}</li>
          <li className={styles.hash_list_item}>{model}</li>
          <li className={styles.hash_list_item}>{id}</li>
          <li className={styles.hash_list_item}>{shortAccessoriesItem}</li>
        </ul>
      </div>
      <button
        onClick={() => onLearnMoreHandler(id)}
        className={styles.item_button}
      >
        Learn more
      </button>
    </li>
  );
};

export default CatalogItem;
