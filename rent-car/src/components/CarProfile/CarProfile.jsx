/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import ReactDom from "react-dom";

import styles from "./CarProfile.module.scss";
import { Loader } from "../Loader/Loader";

const CarProfile = (props) => {
  const { open, onClose, data } = props;

  if (!open) return null;

  if (!data && open) {
    return <Loader />;
  }

  const onBackdropClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const {
    id,
    year,
    make,
    model,
    type,
    img,
    description,
    fuelConsumption,
    engineSize,
    accessories,
    functionalities,
    rentalPrice,
    rentalCompany,
    address,
    rentalConditions,
    mileage,
  } = data;

  const getRandomInt = (max) => Math.floor(Math.random() * max);

  const city = address.split(",")[1].trim();
  const country = address.split(",")[2].trim();

  const accessoriesItemIndex = getRandomInt(accessories.length - 1);
  const accessoriesItem = accessories[accessoriesItemIndex].split(" ");
  const shortAccessoriesItem = accessoriesItem
    .slice(accessoriesItem.length - 2)
    .join(" ");

  return ReactDom.createPortal(
    <div onClick={onBackdropClose} className={styles.overlay}>
      <div className={styles.modal_container}>
        <div className={styles.close} onClick={() => onClose()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18 6L6 18"
              stroke="#121417"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="#121417"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <img className={styles.img} src={img} alt={make} />
        <div className={styles.table_item_upper}>
          <div className={styles.item_title_container}>
            <h3 className={styles.item_title}>
              {make} <span className={styles.highlight}>{model}</span>, {year}
            </h3>
          </div>
          <ul className={styles.hash_list}>
            <li className={styles.hash_list_item}>{city}</li>
            <li className={styles.hash_list_item}>{country}</li>
            <li className={styles.hash_list_item}>
              Fuel Consumption: {fuelConsumption}
            </li>
            <li className={styles.hash_list_item}>Type: {type}</li>
            <li className={styles.hash_list_item}>Engine Size: {engineSize}</li>
            <li className={styles.hash_list_item}>{shortAccessoriesItem}</li>
          </ul>
        </div>
        <div className={styles.description_container}>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.accessories_container}>
          <h3 className={styles.accessories_title}>
            Accessories and functionalities:
          </h3>
          <ul className={styles.hash_list}>
            <li className={styles.hash_list_item}>Leather seats</li>
            <li className={styles.hash_list_item}>Panoramic sunroof</li>
            <li className={styles.hash_list_item}>Power liftgate</li>
            <li className={styles.hash_list_item}>Premium audio system</li>
            <li className={styles.hash_list_item}>Remote start</li>
            <li className={styles.hash_list_item}>Blind-spot monitoring</li>
          </ul>
        </div>
        <div className={styles.rental_container}>
          <h3 className={styles.rental_title}>Rental Conditions: </h3>
          <ul className={styles.rental_list}>
            <li className={styles.rental_list_item}>
              Minimum age : <span className={styles.highlight}>25</span>
            </li>
            <li className={styles.rental_list_item}>
              Valid driver&apos;s license
            </li>
            <li className={styles.rental_list_item}>
              Security deposite required
            </li>
            <li className={styles.rental_list_item}>
              Mileage:<span className={styles.highlight}>5,850</span>
            </li>
            <li className={styles.rental_list_item}>
              Price: <span className={styles.highlight}>{rentalPrice}</span>
            </li>
          </ul>
        </div>
        <button className={styles.button}>Rental car</button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default CarProfile;
