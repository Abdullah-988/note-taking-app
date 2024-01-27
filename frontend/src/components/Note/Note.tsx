import DeleteButton from "./DeleteButton";
import { EditButton } from "./EditButton";
import ShowButton from "./ShowButton";

export default function Note({
  id,
  title,
  content,
}: {
  id: string;
  title: string;
  content: string;
}) {
  return (
    <div className="flex flex-col justify-center items-start border border-gray-200 rounded-lg w-full md:w-64 h-full">
      <div className="flex flex-col p-4">
        <div className="flex w-full justify-between">
          <h1 className="text-lg font-semibold mb-2 w-full">{title}</h1>
          <ShowButton title={title} content={content} />
        </div>
        <p className="w-56 break-all">
          {content.slice(0, 100)}
          {content.length > 100 && "..."}
        </p>
      </div>
      <div className="flex justify-center items-center border-t border-gray-200 w-full">
        <div className="flex justify-center py-2 p-3 items-center w-full">
          <DeleteButton noteId={id} />
        </div>
        <div className="flex justify-center py-2 p-3 items-center border-l border-gray-200 w-full">
          <EditButton noteId={id} defaulTitle={title} defaulContent={content} />
        </div>
      </div>
    </div>
  );
}
