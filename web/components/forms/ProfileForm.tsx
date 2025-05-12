"use client";

import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { TextInputField } from "@/components/ui/TextInputField";
import { TextareaField } from "@/components/ui/TextareaField";
import { SelectField, Option } from "@/components/ui/SelectField";
import { Button } from "@/components/ui/Button";

export interface ProfileFormData {
  name: string;
  bio?: string;
  goal: string;
}

const profileFormSchema = z.object({
  name: z.string().nonempty("Name is required"),
  bio: z.string().max(160, "Bio must be at most 160 characters").optional(),
  goal: z.enum([
    "Audience Growth",
    "Monetization",
    "Personal Branding",
  ], { errorMap: () => ({ message: "Goal is required" }) }),
});

type ProfileFormSchema = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  onSubmit: (data: ProfileFormData) => void;
  defaultValues?: Partial<ProfileFormData>;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const { control, handleSubmit } = useForm<ProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      bio: defaultValues?.bio ?? "",
      goal: defaultValues?.goal,
    },
  });

  const goalOptions: Option[] = [
    { value: "Audience Growth", label: "Audience Growth" },
    { value: "Monetization", label: "Monetization" },
    { value: "Personal Branding", label: "Personal Branding" },
  ];

  const onFormSubmit: SubmitHandler<ProfileFormSchema> = (data) => {
    onSubmit({
      name: data.name,
      bio: data.bio,
      goal: data.goal,
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <TextInputField
          control={control}
          name="name"
          label="Name"
        />

        <TextareaField
          control={control}
          name="bio"
          label="Bio"
          placeholder="Tell us about yourself (max 160 characters)"
        />

        <SelectField
          control={control}
          name="goal"
          label="Goal"
          options={[{ value: "", label: "Select a goal" }, ...goalOptions]}
        />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default ProfileForm;