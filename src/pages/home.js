import { Container } from "react-bootstrap";
import "react-gallery-carousel/dist/index.css";
import Init from "../components/init/init";
import { MintSlider } from "../components/mintslider/mintslider";
import { useFormStatus } from "../functions/DisabledState";

export function Home({ user, hasCollection, collection }) {
  console.log(user);
  console.log(hasCollection);

  return (
    <Container className="mt-4 g-0 p-0">
      {/* 
                <MintSlider />
            </fieldset> */}
      <Init user={user} hasCollection={hasCollection} collection={collection} />
    </Container>
  );
}
