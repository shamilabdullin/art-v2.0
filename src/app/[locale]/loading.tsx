import { Container, Skeleton } from "@/shared/ui";
import { ArtworksGallerySkeleton } from "@/widgets/artworks-gallery";

export default function Loading() {
  return (
    <Container>
      <div style={{ paddingBlock: "40px 32px" }}>
        <Skeleton style={{ width: "60%", height: 40, marginBottom: 12 }} />
        <Skeleton style={{ width: "40%", height: 20 }} />
      </div>
      <ArtworksGallerySkeleton count={12} />
    </Container>
  );
}
