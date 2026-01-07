import SessionDetailsContent from "@/components/views/flashcards/history/details/SessionDetailsContent";

export default async function SessionDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SessionDetailsContent sessionId={id} />;
}
