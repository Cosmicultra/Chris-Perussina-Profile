import profileData from "@/config/profile.json";
import { profileSchema, type Profile } from "@/lib/profile";

export function getProfile(): Profile {
  return profileSchema.parse(profileData);
}
