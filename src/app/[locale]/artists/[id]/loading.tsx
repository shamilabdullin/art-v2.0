import { Container, Skeleton } from "@/shared/ui";
import { ArtworksGallerySkeleton } from "@/widgets/artworks-gallery";

export default function Loading() {
  return (
    <Container>
      <div style={{ paddingBlock: "32px 64px" }}>
        <div style={{ marginBottom: 32 }}>
          <Skeleton style={{ width: 260, height: 36, marginBottom: 8 }} />
          <Skeleton style={{ width: 120, height: 16 }} />
        </div>
        <ArtworksGallerySkeleton count={12} />
      </div>
    </Container>
  );
}
