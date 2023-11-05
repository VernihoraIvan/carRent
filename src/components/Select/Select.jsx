/* eslint-disable react/prop-types */
import { fetchBrands } from "@/redux/cars/thunk";
import { getBrands } from "@/redux/cars/selectors";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Select.module.scss";
import { filterCars } from "@/redux/filter/slice";

const Select = () => {
  const [brand, setBrand] = useState('Enter the text');
  const [price, setPrice] = useState('price');
  const [minMileage, setMinMileage] = useState(null);
  const [maxMileage, setMaxMileage] = useState(null);

  const onChange = (event, setter) => {
    setter(event.target.value);
  };
  const dispatch = useDispatch();
  const brandList = useSelector(getBrands);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(filterCars({brand, price, minMileage, maxMileage}))
  }
  
  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  let priceList = [10];
  let mileage = [0];

  while (priceList[priceList.length - 1] < 300) {
    priceList.push(priceList[priceList.length - 1] + 10);
  }
  while (mileage[mileage.length - 1] < 100000) {
    mileage.push(mileage[mileage.length - 1] + 500);
  }

  return (
    <div className={styles.input_container}>
      <form className={styles.form}>
        <div className={styles.form_element}>
          <label htmlFor="brand">Car brand</label>
          <select
            onChange={(event) => onChange(event, setBrand)}
            className={styles.select_brand}
            name="brand"
            id="brand"
          >
            <option className={styles.option_brand} value="Enter the text">
              Enter the text
            </option>
            {brandList?.map((brand) => (
              <option className={styles.option_brand} key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.form_element}>
          <label htmlFor="price">Price/ 1 hour</label>
          <select
            onChange={(event) => onChange(event, setPrice)}
            className={styles.select_price}
            name="price"
            id="price"
          >
            <option value="price">To $</option>
            {priceList.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.form_element}>
          <label htmlFor="mileage">Car mileage / km</label>
          <div className={styles.mileage_select_container}>
            <select
              onChange={(event) => onChange(event, setMinMileage)}
              className={styles.select_from}
              name="mileage_from"
              id="mileage"
            >
              <option value="mileage_from">From</option>
              {mileage.map((mil) => (
                <option key={mil} value={mil}>
                  {mil}
                </option>
              ))}
            </select>
            <select
              onChange={(event) => onChange(event, setMaxMileage)}
              className={styles.select_to}
              name="mileage_to"
              id="mileage"
            >
              <option value="mileage_to">To</option>
              {mileage.map((mil) => (
                <option key={mil} value={mil}>
                  {mil}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.form_element}>
          <div onClick={onSubmit} className={styles.submit_button} type="submit">
            Search
          </div>
        </div>
      </form>
    </div>
  );
};

export default Select;
