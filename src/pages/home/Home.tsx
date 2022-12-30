import { useEffect } from "react";
import { Layout } from "../../shared/components/Layout/Layout";
import { CarouselComponent } from "./components/Carousel-component";
import { country } from "../../moviedb";

export function Home(): JSX.Element {
    return (
        <Layout>
          <CarouselComponent elements={[]} />
        </Layout>
    );
}