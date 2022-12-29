import { Layout } from "../../shared/components/Layout/Layout";
import { CarouselComponent } from "./components/Carousel-component";

export function Home(): JSX.Element {
    return (
        <Layout>
          <CarouselComponent />
        </Layout>
    );
}