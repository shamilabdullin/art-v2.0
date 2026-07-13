import { Container, Skeleton } from "@/shared/ui";
import { ArtworksGallerySkeleton } from "@/widgets/artworks-gallery";

export default function Loading() {
  return (
    <Container>
      <div style={{ paddingBlock: "32px 24px" }}>
        <Skeleton style={{ width: 260, height: 28, marginBottom: 8 }} />
        <Skeleton style={{ width: 140, height: 16 }} />
      </div>
      <ArtworksGallerySkeleton count={12} />
    </Container>
  );
}
