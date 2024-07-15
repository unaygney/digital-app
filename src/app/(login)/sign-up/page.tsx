import React from "react";
import Container from "@/components/container";
import SignupForm from "./sign-up-form";
import ImageContainer from "./image-container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up page",
};

export default function SignUp() {
  return (
    <Container className="flex rounded-lg px-3 py-8 md:p-8 xl:my-8 xl:gap-8 xl:px-24">
      <SignupForm />
      <ImageContainer />
    </Container>
  );
}
