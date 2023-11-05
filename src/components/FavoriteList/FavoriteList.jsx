import { useSelector } from "react-redux";
import styles from "./favoriteList.module.scss";
import { getCars } from "@/redux/cars/selectors";
import { getfavoriteCar } from "@/redux/filter/selectors";
import CatalogItem from "../CatalogItem/CatalogItem";
import { Loader } from "../Loader/Loader";

const FavoriteList = () => {
  const items = useSelector(getCars);
  const idList = useSelector(getfavoriteCar);
  console.log(idList);

  const favoriteCarsList = items?.map((element) => idList.includes(element.id));
  console.group(favoriteCarsList);

  if (!items) {
    return <Loader />;
  }
  return (
    <div>
      {favoriteCarsList?.map((item) => (
        <CatalogItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default FavoriteList;
