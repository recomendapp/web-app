
import { Person } from "@/types/type.db";
import { useFormatter } from "next-intl";
import { useState } from "react";
import { useModal } from "@/context/modal-context";
import { PersonAboutModal } from "@/components/Modals/Person/PersonAboutModal";

export function PersonAbout({
  person,
}: {
  person?: Person;
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
        <p className="line-clamp-2">
          {person?.biography?.length ? person.biography : 'No biography available'}
        </p>
        <p className="">
          Voir plus
        </p>
      </div>
    </>
  );
}
