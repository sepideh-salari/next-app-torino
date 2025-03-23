import Banner from "@/module/Banner";
import AuthForm from "src/components/templates/AuthForm";

import TourCards from "src/components/templates/TourCards";

export default async function HomePage() {
  const res = await fetch("http://localhost:6500/tour", {
    next: { revalidate: 60 },
  });
  const tours = await res.json();

  return (
    <div>
      <AuthForm />
      <Banner />
      <TourCards tours={tours} />
    </div>
  );
}
