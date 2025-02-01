import { ButtonLink } from "@/components/ui/custom/button-link";

export default function NotFound() {
  return (
    <main>
      <section className="grid place-content-center min-h-screen">
        <h2 className="text-2xl xl:text-4xl font-semibold">
          Nic tu nie ma! 😢
        </h2>
        <ButtonLink href="/">Zawróć</ButtonLink>
      </section>
    </main>
  );
}
