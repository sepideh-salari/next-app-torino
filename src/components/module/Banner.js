import Image from "next/image";

export default function Banner() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "350px",
      }}
    >
      <Image
        src="/Banner.png"
        alt="Picture of different elements of tourist attractions globally"
        width={1440}
        height={350}
        layout="responsive"
        objectFit="cover"
      />
    </div>
  );
}
