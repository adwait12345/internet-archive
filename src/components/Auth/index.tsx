"use client";
import { Button, Input } from "antd";
import React from "react";
import cookies from "js-cookie";
import { useRouter } from "next/navigation";
import users from "../../lib/user";
export default function AuthForm() {
  const router = useRouter();
  const [form, setForm] = React.useState({
    username: "",
    password: "",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const user = users.find(
      (user) =>
        user.userName === form.username && user.password === form.password
    );
    if (user) {
      cookies.set("user", JSON.stringify(user));
      router.push("/");
    } else {
      alert("Invalid credentials");
    }
    console.log(form);
  }

  function handleTestUser() {
    setForm({
      username: "test1",
      password: "pass",
    });
  }

  return (
    <div className="w-[400px] h-80 border rounded">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center text-left justify-center h-full"
      >
        <div className="w-[80%] flex flex-col">
          <div className="w-full flex items-center justify-between">
            <div className="leading-3">
              <h1 className="text-[15px] w-full leading-5">
                Please enter <br />{" "}
                <span className="text-[20px] font-bold">Credentials</span>
              </h1>
              <span className="text-[8px]">special access program</span>
            </div>
            <img
              src="https://openlibrary.org/static/images/openlibrary-logo-tighter.svg"
              alt=""
              width={100}
              className="rotate-6"
            />
          </div>
          <Input
            type="text"
            placeholder="Username"
            className="w-full h-10 border rounded mt-4"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
            minLength={4}
          />
          <Input.Password
            type="password"
            placeholder="Password"
            className="w-full h-10 border rounded mt-4"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            minLength={4}
            iconRender={(visible) =>
              visible ? <span>hide</span> : <span>show</span>
            }
          />
          <Button
            type="primary"
            htmlType="submit"
            className="w-full h-10 rounded mt-4"
          >
            Login
          </Button>
          <span
            onClick={handleTestUser}
            className="   mt-2 text-[10px] hover:underline cursor-pointer"
          >
            Try with test user ?
          </span>
        </div>
      </form>
    </div>
  );
}
