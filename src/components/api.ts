const PROFILE_KEY = "userProfile";

export const saveProfile = (profileData: any): any => {
  try {
    const existingProfile = localStorage.getItem(PROFILE_KEY);
    if (existingProfile) {
      const updatedProfile = { ...JSON.parse(existingProfile), ...profileData };
      localStorage.setItem(PROFILE_KEY, JSON.stringify(updatedProfile));
    } else {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profileData));
    }
    return profileData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to save profile.");
    }
    throw new Error("An unknown error occurred while saving the profile.");
  }
};

// GET request to fetch profile data from localStorage
export const getProfile = (): any => {
  try {
    const profileData = localStorage.getItem(PROFILE_KEY);
    if (!profileData) {
      throw new Error("Profile not found.");
    }
    return JSON.parse(profileData);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to fetch profile.");
    }
    throw new Error("An unknown error occurred while fetching the profile.");
  }
};

// DELETE request to remove profile from localStorage
export const deleteProfile = (): boolean => {
  try {
    localStorage.removeItem(PROFILE_KEY);
    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Failed to delete profile.");
    }
    throw new Error("An unknown error occurred while deleting the profile.");
  }
};
