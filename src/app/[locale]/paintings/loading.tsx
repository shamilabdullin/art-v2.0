import { Container, Skeleton } from "@/shared/ui";
import { PaintingListRowSkeleton } from "@/views/paintings-list/ui/PaintingListRowSkeleton";

export default function Loading() {
  return (
    <Container>
      <div style={{ paddingBlock: "32px 64px" }}>
        <Skeleton style={{ width: 180, height: 32, marginBottom: 24 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {Array.from({ length: 10 }).map((_, index) => (
            <PaintingListRowSkeleton key={index} />
          ))}
        </div>
      </div>
    </Container>
  );
}
