import { PathToDeleteBySubName } from "../External/path";

// Function to handle deletion by subName
export const HandleDeleteBySubName = async (subName) => {
  const path = PathToDeleteBySubName(subName);
  console.log(path);

  try {
    const response = await fetch(path, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Failed to delete:", response.statusText);
      return "Error: Failed to delete user";
    }
    return response.status;
  } catch (error) {
    console.error("Error deleting by subName:", error);
    return "Error: Network error";
  }
};

export default HandleDeleteBySubName;
