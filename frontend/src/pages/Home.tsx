import { useQuery } from "@tanstack/react-query";
import { getNotes } from "../actions/Notes";
import Note from "../components/Note/Note";
import { CreateButton } from "@/components/Note/CreateButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MdOutlinePerson } from "react-icons/md";

export default function Home() {
  const {
    status,
    isLoading,
    error,
    data: notes,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
  });

  return (
    <div className="p-8">
      <div className="flex w-full justify-between">
        <h1 className="text-4xl font-semibold mb-8">Notes</h1>
        <div className="flex gap-2">
          <CreateButton />
          <Button className="p-0">
            <Link className="flex justify-center items-center px-4 py-2" to="/account">
              <MdOutlinePerson className="mr-2 h-4 w-4" />
              Account
            </Link>
          </Button>
        </div>
      </div>
      {status == "error" && <h1>{JSON.stringify(error)}</h1>}
      <div className="flex flex-wrap gap-4">
        {isLoading && (
          <div className="p-4 border-2 border-indigo-800/20 border-t-indigo-800 animate-spin rounded-full" />
        )}
        {status == "success" &&
          notes?.map((note) => (
            <Note
              key={note._id}
              id={note._id}
              title={note.title}
              content={note.content}
            />
          ))}
      </div>
    </div>
  );
}
