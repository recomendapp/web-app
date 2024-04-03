import { TooltipBox } from "@/components/Box/TooltipBox";
import { Modal } from "@/components/Modals/Modal";
import { Person } from "@/types/type.db";
import { CakeIcon } from "lucide-react";
import { useFormatter } from "next-intl";
import { useState } from "react";

export function PersonAbout({
  person,
}: {
  person?: Person;
}) {
  const [openAbout, setOpenAbout] = useState(false);
  const format = useFormatter();
  return (
    <>
      <div
        className={`
          text-justify text-muted-foreground cursor-pointer
        `}
        onClick={() => setOpenAbout(true)}
      >
        <p className="line-clamp-2">
          {person?.data[0].biography ?? 'No biography available'}
        </p>
        <p className="">
          Voir plus...
        </p>
      </div>
      <Modal
        open={openAbout}
        setOpen={setOpenAbout}
        header={{
          title: `À propos de ${person?.name}`,
        }}
        content={
          <div className="flex flex-col gap-4">
            {/* Détails */}
            <div className="">
              <h3 className=" text-lg font-semibold">Détails</h3>
              <div className="grid grid-cols-1 md:grid-cols-2  text-muted-foreground">
                  {person?.birthday && (
                    <div className="flex items-center gap-2">
                      <TooltipBox tooltip="Date de naissance">
                        <div>
                          <CakeIcon size={20}/>
                          <span className="sr-only">Date de naissance</span>
                        </div>
                      </TooltipBox>
                      <span className="">
                        {format.dateTime(
                          new Date(person?.birthday),
                          { dateStyle: 'long' }
                        )}
                        {' '}({new Date().getFullYear() - new Date(person?.birthday).getFullYear()} ans)
                      </span>
                    </div>
                  )}

              </div>
            </div>
            {/* BIOGRAPHY */}
            <div className=''>
              <h3 className=" text-lg font-semibold">Biographie</h3>
              <p className="text-justify text-muted-foreground">
                {person?.data[0].biography ?? 'No biography available'}
              </p>
            </div>
          </div>
        }
      />
    </>
  );
}