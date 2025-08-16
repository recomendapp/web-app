'use client'
import { MediaPerson } from "@/types/type.db";
import { useModal } from "@/context/modal-context";
import { PersonAboutModal } from "@/components/Modals/persons/PersonAboutModal";

export function PersonAbout({
  person,
}: {
  person?: MediaPerson;
}) {
  const { openModal } = useModal();
  return (
    <>
      <div
        className={`
          text-justify text-muted-foreground cursor-pointer
        `}
        onClick={() => openModal(PersonAboutModal, { person })}
      >
        <p className="line-clamp-2 select-text">
          {person?.extra_data.biography?.length ? person.extra_data.biography : 'No biography available'}
        </p>
        <p className="">
          Voir plus
        </p>
      </div>
    </>
  );
}
