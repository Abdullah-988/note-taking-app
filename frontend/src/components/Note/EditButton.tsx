import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { MdEdit } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editNote } from "@/actions/Notes";
import { useState } from "react";

export function EditButton({
  noteId,
  defaulTitle,
  defaulContent,
}: {
  noteId: string;
  defaulTitle: string;
  defaulContent: string;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(defaulTitle);
  const [content, setContent] = useState(defaulContent);
  const queryClient = useQueryClient();
  const editNoteMutation = useMutation({
    mutationFn: editNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <MdEdit className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent onSubmit={() => console.log("hello")} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit a note</DialogTitle>
          <DialogDescription>
            Edit note details here. Click Save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              defaultValue={defaulTitle}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="content" className="text-right">
              Content
            </Label>
            <Textarea
              id="content"
              defaultValue={defaulContent}
              onChange={(e) => setContent(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={title == "" || content == "" || !title || !content}
            onClick={() => editNoteMutation.mutate({ id: noteId, title, content })}
            type="submit"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
