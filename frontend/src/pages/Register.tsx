import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import { FieldValues, useForm } from "react-hook-form";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Register() {
  const [passwordsNotMatched, setPasswordsNotMatched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function handleRegister(data: FieldValues) {
    setError("");

    if (data.password != data.passwordConfirm) {
      return setPasswordsNotMatched(true);
    }

    setIsLoading(true);

    axios
      .post("/api/users/register", data)
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
        Register
      </h1>
      <form
        className="flex flex-col w-full md:w-1/2"
        onSubmit={handleSubmit(handleRegister)}
      >
        <label className="mb-1">Name</label>
        <Input
          className={clsx("mb-1", {
            "border-red-500": errors.name,
          })}
          {...register("name", { required: true })}
        />
        {errors.name && <p className="mb-2 text-red-500">Name is required.</p>}
        <label className="my-1">Email</label>
        <Input
          className={clsx("mb-1", {
            "border-red-500": errors.email,
          })}
          {...register("email", { required: true })}
        />
        {errors.email && <p className="mb-2 text-red-500">Email is required.</p>}
        <label className="my-1">Password</label>
        <Input
          className={clsx("mb-1", {
            "border-red-500": errors.password,
          })}
          {...register("password", { required: true })}
          onChange={() => setPasswordsNotMatched(false)}
          type="password"
          autoComplete="on"
        />
        {errors.password && (
          <p className="mb-2 text-red-500">Please enter your password.</p>
        )}
        <label className="my-1">Confirm Password</label>
        <Input
          className={clsx("mb-1", {
            "border-red-500": errors.passwordConfirm || passwordsNotMatched,
          })}
          {...register("passwordConfirm", { required: true })}
          onChange={() => setPasswordsNotMatched(false)}
          type="password"
          autoComplete="on"
        />
        {errors.passwordConfirm && (
          <p className="mb-2 text-red-500">Please re-enter your password.</p>
        )}
        {passwordsNotMatched && (
          <p className="mb-2 text-red-500">Passwords doesn't match</p>
        )}
        {error && <p className="mb-2 text-red-500">{error}</p>}
        <div className="flex gap-1">
          <p>Already have an account?</p>{" "}
          <Link className="text-sky-500 underline" to="/login">
            Login
          </Link>
        </div>
        <Button className="mt-4" disabled={isLoading} type="submit">
          Register
        </Button>
      </form>
    </div>
  );
}
