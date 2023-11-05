// import styles from "./CatalogPage.module.scss";

import CarProfile from "@/components/CarProfile/CarProfile";
import Catalog from "@/components/Catalog/Catalog";
import Select from "@/components/Select/Select";
import { getCars } from "@/redux/cars/selectors";
import { getFilteredCar } from "@/redux/filter/selectors";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CatalogPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [choosedCar, setChoosedCar] = useState(null);

  const items = useSelector(getCars);
  const car = useSelector(getFilteredCar);

  useEffect(() => {
    setChoosedCar(car);
  }, [car]);

  const carInfo = items?.find((el) => el.id === choosedCar);

  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  const handleKeydown = useCallback(
    (e) => {
      if (e.code === "Escape") {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeydown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown, isOpen]);

  const openModalHandler = () => {
    setIsOpen(true);
  };

  const closeModalHandler = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Select />
      <Catalog openModal={openModalHandler} />
      <CarProfile data={carInfo} open={isOpen} onClose={closeModalHandler} />
    </>
  );
};

export default CatalogPage;
