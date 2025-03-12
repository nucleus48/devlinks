import ProfileForm from "@/features/profile/components/profile-form";
import { getUser } from "@/lib/dal";

export default async function ProfilePage() {
  const { firstName, lastName, imageUrl, previewEmail } = await getUser();

  return (
    <ProfileForm
      profile={{
        firstName: firstName || "",
        lastName: lastName || "",
        imageUrl: imageUrl || "",
        email: previewEmail || "",
      }}
    />
  );
}
