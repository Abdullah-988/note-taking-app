import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdOutlineVisibility } from "react-icons/md";

export default function ShowButton({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="p-2 h-8">
          <MdOutlineVisibility className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid overflow-auto max-h-72 relative gap-4 py-4">
          <p className="break-all">{content}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
