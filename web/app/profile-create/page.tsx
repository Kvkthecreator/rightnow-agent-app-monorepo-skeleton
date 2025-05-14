"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { TextInputField } from "@/components/ui/TextInputField";
import { TextareaField } from "@/components/ui/TextareaField";
import { SelectField } from "@/components/ui/SelectField";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
// Map of SNS base URLs for prefixing handle input
const snsBaseUrlMap: Record<string, string> = {
  Instagram: "https://instagram.com/",
  TikTok: "https://tiktok.com/@",
  YouTube: "https://youtube.com/",
};

interface ProfileFormValues {
  profile_type: string;
  primary_sns_channel: string;
  sns_handle: string;
  primary_objective: string;
  email: string;
  follower_count: string;
  locale: string;
  comments: string;
}

export default function ProfileCreatePage() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const { session, isLoading } = useSessionContext();

  const [step, setStep] = useState<number>(1);
  const [profile, setProfile] = useState<any>(null);
  const [messages, setMessages] = useState<{ sender: 'user' | 'agent'; content: string }[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!session) {
      localStorage.setItem("postLoginRedirect", window.location.pathname);
      router.replace("/login");
    }
  }, [session, isLoading, router]);

  // Form setup (step 1)
  const { control, handleSubmit, watch } = useForm<ProfileFormValues>({
    defaultValues: {
      profile_type: '',
      primary_sns_channel: '',
      sns_handle: '',
      primary_objective: '',
      email: '',
      follower_count: '',
      locale: '',
      comments: '',
    },
  });
  // Local state for full SNS URL
  const [snsUrl, setSnsUrl] = useState<string>("");
  // Watch selected channel and handle for dynamic URL
  const watchChannel = watch("primary_sns_channel");
  const watchHandle = watch("sns_handle");
  useEffect(() => {
    const base = snsBaseUrlMap[watchChannel] || "";
    setSnsUrl(base + (watchHandle || ""));
  }, [watchChannel, watchHandle]);

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    // Basic validation
    if (!data.profile_type || !data.primary_sns_channel || !data.sns_handle || !data.primary_objective) {
      alert('Please fill in all required fields.');
      return;
    }
    if (!session) return;
    const followerCountNum = data.follower_count ? parseInt(data.follower_count, 10) : null;
    const insertData: any = {
      profile_type: data.profile_type,
      primary_sns_channel: data.primary_sns_channel,
      sns_handle: data.sns_handle,
      sns_url: snsUrl,
      primary_objective: data.primary_objective,
      email: data.email || null,
      follower_count: followerCountNum,
      locale: data.locale || null,
      comments: data.comments || null,
      user_id: session.user.id,
    };
    const { data: createdProfile, error } = await supabase
      .from('profiles')
      .upsert(insertData)
      .select()
      .single();
    if (error) {
      console.error('Error creating profile:', error);
      return;
    }
    setProfile(createdProfile);
    setStep(2);
  };

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle sending messages (step 2)
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !session || !profile) return;
    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', content: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/profilebuilder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task_id: profile.id, user_id: session.user.id, prompt: userMessage }),
      });
      if (!res.ok) {
        console.error('Agent error:', await res.text());
        setLoading(false);
        return;
      }
      const data = await res.json();
      // Insert structured sections into DB
      if (data.type === 'structured' && data.sections) {
        const sectionsToInsert = data.sections.map((sec: any) => ({
          profile_id: profile.id,
          ...sec,
        }));
        const { error: insertError } = await supabase.from('profile_report_sections').insert(sectionsToInsert);
        if (insertError) console.error('Error inserting sections:', insertError);
      }
      // Display agent response
      const agentContent = data.message || JSON.stringify(data);
      setMessages((prev) => [...prev, { sender: 'agent', content: agentContent }]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return null;
  }

  // Option placeholders
  const profileTypeOptions = [
    { value: '', label: 'Select profile type' },
    { value: 'brand', label: 'Brand' },
    { value: 'creator', label: 'Creator' },
    { value: 'project/campaign', label: 'Project/Campaign' },
    { value: 'app/software', label: 'App/Software' },
    { value: 'services', label: 'Services' },
    { value: 'location', label: 'Location' },
    { value: 'other', label: 'Other' },
  ];
  const snsChannelOptions = [
    { value: '', label: 'Select SNS channel' },
    { value: 'Instagram', label: 'Instagram' },
    { value: 'TikTok', label: 'TikTok' },
    { value: 'YouTube', label: 'YouTube' },
  ];
  const primaryObjectiveOptions = [
    { value: '', label: 'Select primary objective' },
    { value: 'Increase reach & followers', label: 'Increase reach & followers' },
    { value: 'Promote product, brand', label: 'Promote product, brand' },
    { value: 'Enhance engagement', label: 'Enhance engagement' },
    { value: 'Connect with people', label: 'Connect with people' },
    { value: 'Motivational, help others', label: 'Motivational, help others' },
    { value: 'Educate', label: 'Educate' },
    { value: 'Raise awareness', label: 'Raise awareness' },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        {step === 1 ? 'Step 1 of 2: Basic Profile Info' : 'Step 2 of 2: Agent Chat'}
      </h1>
      {step === 1 ? (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
          <SelectField control={control} name="profile_type" label="Profile Type" options={profileTypeOptions} />
          <SelectField control={control} name="primary_sns_channel" label="Primary SNS Channel" options={snsChannelOptions} />
          {/* SNS Handle with dynamic prefix */}
          <div className="space-y-2 rounded-lg">
            <label htmlFor="sns_handle" className="text-sm font-medium">SNS Handle</label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <span className="px-3 py-2 bg-gray-100 text-gray-500 whitespace-nowrap">
                {snsBaseUrlMap[watchChannel] || "https://"}
              </span>
              <Controller
                control={control}
                name="sns_handle"
                render={({ field, fieldState }) => (
                  <>
                    <Input
                      id={field.name}
                      {...field}
                      placeholder="yourhandle"
                      className="flex-1 border-none focus:ring-0 focus:border-none"
                      disabled={loading}
                    />
                    {fieldState.error && (
                      <p className="text-sm text-red-600">{fieldState.error.message}</p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          <SelectField control={control} name="primary_objective" label="Primary Objective" options={primaryObjectiveOptions} />
          <TextInputField control={control} name="email" label="Email" placeholder="you@example.com" />
          <TextInputField control={control} name="follower_count" label="Follower Count" placeholder="0" />
          <TextInputField control={control} name="locale" label="Locale" placeholder="en-US" />
          <TextareaField control={control} name="comments" label="Comments" placeholder="Any additional info" />
          <Button type="submit">Next</Button>
        </form>
      ) : (
        <div className="flex flex-col h-[70vh]">
          <Button variant="outline" size="sm" className="mb-2 w-fit" onClick={() => setStep(1)}>
            Back
          </Button>
          <div className="flex-1 overflow-y-auto border rounded p-4 space-y-2">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs px-3 py-2 rounded ${
                    msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSend} className="mt-2 flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded px-3 py-2"
              disabled={loading}
              autoFocus
            />
            <Button type="submit" disabled={loading}>
              Send
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}