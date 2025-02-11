import { ButtonLink } from "@/components/ui/custom/button-link";

export default function NotFound() {
  return (
    <main>
      <section className="grid place-content-center min-h-screen">
        <h2>Nic tu nie ma! 😢</h2>
        <ButtonLink href="/">Zawróć</ButtonLink>
      </section>
    </main>
  );
}
