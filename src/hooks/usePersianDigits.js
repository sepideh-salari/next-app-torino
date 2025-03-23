const usePersianDigits = () => {
  return (num) =>
    num
      .toString()
      .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d])
      .replace(/(.)(?=(.{3})+$)/g, "$1,");
};

export default usePersianDigits;
