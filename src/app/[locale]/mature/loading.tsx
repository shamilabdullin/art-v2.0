import { Container, Skeleton } from "@/shared/ui";
import { ArtworksGallerySkeleton } from "@/widgets/artworks-gallery";

export default function Loading() {
  return (
    <Container>
      <div style={{ paddingBlock: "32px 24px" }}>
        <Skeleton style={{ width: 220, height: 32 }} />
      </div>
      <ArtworksGallerySkeleton count={12} />
    </Container>
  );
}
