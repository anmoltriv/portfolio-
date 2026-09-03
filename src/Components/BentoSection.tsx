import ContactColumn from "./ContactColumn";
import PhilosophyCard from "./PhilosophyCard";
import ProfileCard from "./ProfileCard";

export default function BentoSection() {
  return (
    <section id="bento" className="w-full max-w-7xl mx-auto px-6 py-24 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ProfileCard />
        <PhilosophyCard />
        <ContactColumn />
      </div>
    </section>
  );
}
