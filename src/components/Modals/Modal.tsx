import * as React from "react"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMediaQuery } from "react-responsive"

interface ModalProps {
	children?: React.ReactNode
	header?: {
		title?: React.ReactNode;
		description?: React.ReactNode;
	}
	content: React.ReactNode;
	footer?: React.ReactNode;
	open?: boolean;
	setOpen?: (open: boolean) => void;
	className?: string;
}

export function Modal({
	children,
	header,
	content,
	footer,
	open,
	setOpen,
	className,
} : ModalProps) {
  const isDesktop = useMediaQuery({ minWidth: 768 });
 
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
		{children && (
			<DialogTrigger asChild>
				{children}
			</DialogTrigger>
		)}
        <DialogContent className={cn('', className)}>
			{header && (
				<DialogHeader>
					{header.title && (<DialogTitle>{header.title}</DialogTitle>)}
					{header.description && (<DialogDescription>{header.description}</DialogDescription>)}
				</DialogHeader>
			)}
			{/* <div className="p-4"> */}
				{content}
			{/* </div> */}
			{footer && (<DialogFooter>{footer}</DialogFooter>)}
        </DialogContent>
      </Dialog>
    )
  }
 
  return (
    <Drawer open={open} onOpenChange={setOpen}>
		{children && (
			<DrawerTrigger asChild>
				{children}
			</DrawerTrigger>
		)}
		<DrawerContent className={cn('', className)}>
			{header && (
				<DrawerHeader className="text-left">
					{header.title && (<DrawerTitle>{header.title}</DrawerTitle>)}
					{header.description && (<DrawerDescription>{header.description}</DrawerDescription>)}
				</DrawerHeader>
			)}
			<div className="p-4">
				{content}
			</div>
			{footer && (<DrawerFooter>{footer}</DrawerFooter>)}
        </DrawerContent>
      {/* <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent> */}
    </Drawer>
  )
}