import { Container, Skeleton } from "@/shared/ui";

export default function Loading() {
  return (
    <Container>
      <div style={{ display: "flex", flexDirection: "column", gap: 32, paddingBlock: "32px 64px" }}>
        <Skeleton style={{ width: "100%", aspectRatio: "4 / 5", borderRadius: 16 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Skeleton style={{ width: "70%", height: 32 }} />
          <Skeleton style={{ width: "40%", height: 18 }} />
          <Skeleton style={{ width: "100%", height: 100 }} />
        </div>
      </div>
    </Container>
  );
}
