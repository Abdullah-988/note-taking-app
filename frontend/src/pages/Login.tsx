import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import { FieldValues, useForm } from "react-hook-form";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function handleLogin(data: FieldValues) {
    setIsLoading(true);
    setError("");

    axios
      .post("/api/users/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((error) => setError(error.response.data))
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen p-4">
      <h1 className="text-3xl font-semibold w-full text-left  md:text-center mb-8">
        Login
      </h1>
      <form
        className="flex flex-col w-full md:w-1/2"
        onSubmit={handleSubmit(handleLogin)}
      >
        <label className="mb-1">Email</label>
        <Input
          className={clsx("mb-1", {
            "border-red-500": errors.email || error,
          })}
          {...register("email", { required: true })}
        />
        {errors.email && <p className="mb-2 text-red-500">Email is required.</p>}
        <label className="my-1">Password</label>
        <Input
          className={clsx("mb-1", {
            "border-red-500": errors.password || error,
          })}
          {...register("password", { required: true })}
          type="password"
          autoComplete="on"
        />
        {errors.password && (
          <p className="mb-2 text-red-500">Please enter your password.</p>
        )}
        {error && <p className="mb-2 text-red-500">{error}</p>}
        <div className="flex gap-1">
          <p>Don't have an account?</p>{" "}
          <Link className="text-sky-500 underline" to="/register">
            Register
          </Link>
        </div>
        <Button className="mt-4" disabled={isLoading} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
