/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import CatalogItem from "../CatalogItem/CatalogItem";
import styles from "./Catalog.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCars } from "@/redux/cars/thunk";
import { getCars } from "@/redux/cars/selectors";

import { Loader } from "../Loader/Loader";
import { getFilteredCars } from "@/redux/filter/selectors";

// eslint-disable-next-line react/prop-types
const Catalog = ({ openModal }) => {
  const [controlledFilterList, setControlledFilteredList] = useState({
    brand: "",
    price: "",
    minMileage: "",
    maxMileage: "",
  });
  const [isFavorite, setIsFavorite] = useState(true);
  const [perPage, setPerPage] = useState(12);
  const dispatch = useDispatch();
  const items = useSelector(getCars);
  const filter = useSelector(getFilteredCars);

  useEffect(() => {
    dispatch(fetchAllCars());
  }, [dispatch]);

  useEffect(() => {
    setControlledFilteredList(filter);
  }, [filter]);

  const favoriteHandler = (value) => {
    setIsFavorite((prev) => prev.push(value));
  };
  const filteredList = items?.filter(
    (element) =>
      (controlledFilterList.price === "price"
        ? true
        : Number(element.rentalPrice.slice(1)) <= controlledFilterList.price) &&
      (controlledFilterList.brand === "Enter the text"
        ? true
        : element.make === controlledFilterList.brand) &&
      (controlledFilterList.minMileage === null
        ? true
        : element.mileage >= controlledFilterList.minMileage) &&
      (controlledFilterList.maxMileage === null
        ? true
        : element.mileage <= controlledFilterList.maxMileage)
  );

  const onLoadMore = () => {
    setPerPage((prev) => prev + 12);
  };

  if (!items) {
    return <Loader />;
  }
  if (filter.length !== 0) {
    return (
      <section>
        <div className={styles.catalog_container}>
          <div className={styles.catalog_table}>
            {filteredList.slice(0, perPage).map((item) => (
              <CatalogItem
                openModal={openModal}
                isFavorite={isFavorite}
                favoriteHandler={favoriteHandler}
                item={item}
                key={item.id}
              />
            ))}
          </div>
        </div>
        <div className={styles.button_container}>
          <button onClick={onLoadMore} className={styles.button}>
            Load more
          </button>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className={styles.catalog_container}>
        <div className={styles.catalog_table}>
          {items.slice(0, perPage).map((item) => (
            <CatalogItem
              openModal={openModal}
              isFavorite={isFavorite}
              favoriteHandler={favoriteHandler}
              item={item}
              key={item.id}
            />
          ))}
        </div>
      </div>
      <div className={styles.button_container}>
        <button onClick={onLoadMore} className={styles.button}>
          Load more
        </button>
      </div>
    </section>
  );
};

export default Catalog;
