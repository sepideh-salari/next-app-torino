import styles from "./Cards.module.css";
import Image from "next/image";
import usePersianDigits from "src/hooks/usePersianDigits";
function Cards(props) {
  const { title, price, options, image } = props;
  const toPersianDigit = usePersianDigits();
  return (
    <div className={styles.container}>
      <Image src={image} alt={title} width={279} height={159} />
      <div className={styles.details}>
        <h4>{title}</h4>
        <div className={styles.options}>
          {options.map((item, index) => (
            <span key={index}>
              {item}
              {index !== options.length - 1 && " - "}
            </span>
          ))}
        </div>
        <div className={styles.separator}></div>
        <div className={styles.price}>
          <button>رزرو</button>
          <span>{toPersianDigit(price)}</span>
          <span>تومان</span>
        </div>
      </div>
    </div>
  );
}

export default Cards;
