'use client'

import { CakeIcon, MapPin, PersonStandingIcon } from "lucide-react";
import { Modal, ModalBody, ModalHeader, ModalTitle, ModalType } from "../Modal";
import { useModal } from "@/context/modal-context";
import { TooltipBox } from "@/components/Box/TooltipBox";
import { useFormatter } from "next-intl";
import { TbGrave } from "react-icons/tb";
import { Person } from "@/types/type.db";

interface PersonAboutModalProps extends ModalType {
	person?: Person;
}

export const PersonAboutModal = ({
	person,
	...props
  } : PersonAboutModalProps) => {
	const { closeModal } = useModal();
	const format = useFormatter();
	if (!person) return null;
	return (
		<Modal
			open={props.open}
			onOpenChange={(open) => !open && closeModal(props.id)}
			className=""
		>
			<ModalHeader>
				<ModalTitle>À propos de {person.name}</ModalTitle>
			</ModalHeader>
			<ModalBody className="flex flex-col gap-4">
				{/* Détails */}
				<div className="">
					<h3 className=" text-lg font-semibold">Détails</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-muted-foreground">
						{person?.gender && (
							<div className="flex items-center gap-2">
							<TooltipBox tooltip="Genre">
								<div>
								<PersonStandingIcon size={20} />
								<span className="sr-only">Genre</span>
								</div>
							</TooltipBox>
							<span className="">
								{person.gender === 3 ? 'Non-binaire'
								: person.gender === 2 ? 'Homme'
								: person.gender === 1 ? 'Femme'
								: 'Non spécifié'}
							</span>
							</div>
						)}
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
								{!person.deathday && ` (${new Date().getFullYear() - new Date(person?.birthday).getFullYear()} ans)`}
							</span>
							</div>
						)}
						{person?.deathday && (
							<div className="flex items-center gap-2">
							<TooltipBox tooltip="Date de décès">
								<div>
								<TbGrave size={20}/>
								<span className="sr-only">Date de décès</span>
								</div>
							</TooltipBox>
							<span className="">
								{format.dateTime(
								new Date(person?.deathday),
								{ dateStyle: 'long' }
								)}
								{person.birthday && ` (${new Date(person?.deathday).getFullYear() - new Date(person?.birthday).getFullYear()} ans)`}
							</span>
							</div>
						)}
						{person?.place_of_birth && (
							<div className="flex items-center gap-2">
							<TooltipBox tooltip="Lieu de naissance">
								<div>
								<MapPin size={20}/>
								<span className="sr-only">Lieu de naissance</span>
								</div>
							</TooltipBox>
							<span className="">
								{person?.place_of_birth}
							</span>
							</div>
						)}
						{!person?.gender && !person?.birthday && !person?.deathday && !person?.place_of_birth && 'Aucune information disponible'}
					</div>
				</div>
				{/* BIOGRAPHY */}
				<div className=''>
				<h3 className=" text-lg font-semibold">Biographie</h3>
				<p className="text-justify text-muted-foreground">
					{person?.biography?.length ? person?.biography : 'No biography available'}
				</p>
				</div>
			</ModalBody>
		</Modal>
	);
};