import { TooltipBox } from "@/components/Box/TooltipBox";
import { Modal } from "@/components/Modals/Modal";
import { Person } from "@/types/type.db";
import { CakeIcon, IconNode, PersonStanding } from "lucide-react";
import { useFormatter } from "next-intl";
import { useState } from "react";
import { TbGrave } from "react-icons/tb";
import { MapPin } from 'lucide-react';
import { useModal } from "@/context/modal-context";
import { PersonAboutModal } from "@/components/Modals/Person/PersonAboutModal";

export function PersonAbout({
  person,
}: {
  person?: Person;
}) {
  const [openAbout, setOpenAbout] = useState(false);
  const format = useFormatter();
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
