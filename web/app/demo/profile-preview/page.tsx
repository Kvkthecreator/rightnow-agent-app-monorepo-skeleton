"use client"

import { ProfileForm, ProfileFormData } from "@/components/forms/ProfileForm"

export default function ProfilePreviewPage() {
  const handleProfileSubmit = (data: ProfileFormData) => {
    console.log("📝 Submitted Profile:", data)
    alert(JSON.stringify(data, null, 2))
  }

  return (
    <div className="min-h-screen bg-background p-10">
      <h1 className="text-xl font-semibold text-foreground mb-6">🧪 ProfileForm Preview</h1>
      <ProfileForm onSubmit={handleProfileSubmit} />
    </div>
  )
}
