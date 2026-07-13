import { ArtistListItemSkeleton } from "@/entities/artist";
import { Container, Skeleton } from "@/shared/ui";

export default function Loading() {
  return (
    <Container>
      <div style={{ paddingBlock: "32px 64px" }}>
        <Skeleton style={{ width: 180, height: 32, marginBottom: 24 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {Array.from({ length: 10 }).map((_, index) => (
            <ArtistListItemSkeleton key={index} />
          ))}
        </div>
      </div>
    </Container>
  );
}
