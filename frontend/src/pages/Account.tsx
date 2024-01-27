import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/actions/User";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Account() {
  const {
    status,
    isLoading,
    error,
    data: user,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {isLoading && (
        <div className="p-4 border-2 border-indigo-800/20 border-t-indigo-800 animate-spin rounded-full" />
      )}
      {status == "error" && <h1>{JSON.stringify(error)}</h1>}
      {status == "success" && (
        <div className="w-full md:w-1/3 p-4">
          Logged in as {user.email}
          <Button
            variant="destructive"
            onClick={() => (localStorage.removeItem("token"), navigate("/login"))}
            className="w-full mt-4"
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
}
