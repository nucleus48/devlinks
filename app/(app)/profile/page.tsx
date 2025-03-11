import ProfileForm from "@/features/profile/components/profile-form";
import { ProfileFormData } from "@/features/profile/lib/schema";
import { getUser } from "@/lib/dal";

export default async function ProfilePage() {
  const {
    firstName = "",
    lastName = "",
    imageUrl = "",
    previewEmail = "",
  } = await getUser();
  
  return (
    <ProfileForm
      profile={
        { firstName, lastName, imageUrl, previewEmail } as ProfileFormData
      }
    />
  );
}
