"use client";
import { Button, Callout, TextField, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";

import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import "easymde/dist/easymde.min.css";
import { CiCircleInfo } from "react-icons/ci";
import { useState } from "react";
import { z } from "zod";
import { createIssueSchema } from "@/app/ValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root color="red">
          <Callout.Icon>
            <CiCircleInfo />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            /* Send data to backend then Redirect user to /issues*/
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexpected error occurred.");
            console.log(error);
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        {errors && (
          <Text color="red" as="p">
            {errors.title?.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Add a description…" {...field} />
          )}
        />
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}
        <Button>Submit Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
