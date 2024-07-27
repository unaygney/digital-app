import React from "react";
import Container from "@/components/container";
import LoginForm from "./login-form";
import ImageContainer from "./image-container";
export default function Login() {
  return (
    <Container className="flex rounded-lg px-3 py-8 md:p-8 xl:my-8 xl:gap-8 xl:px-24">
      <LoginForm />
      <ImageContainer />
    </Container>
  );
}
