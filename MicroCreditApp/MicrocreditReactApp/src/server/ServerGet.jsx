import axios from "axios";
import {
  AddDetailPath,
  GetDetailByName,
  GetDetailBySubName,
  TotalCollectionPath,
} from "../External/path";

// Function to fetch details
export const HandleGetDetail = async () => {
  try {
    const path = AddDetailPath();
    const response = await axios.get(path, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching details:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};

// Function to fetch details by name
export const HandleGetDetailByName = async (name) => {
  try {
    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("Name must be a non-empty string");
    }
    const path = GetDetailByName(name);
    const response = await axios.get(path, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching details by name:", error);
    throw error;
  }
};

// Function to fetch details by subName
export const HandleGetDetailBySubName = async (subName) => {
  try {
    if (typeof subName !== "string" || subName.trim() === "") {
      throw new Error("SubName must be a non-empty string");
    }
    const path = GetDetailBySubName(subName);
    const response = await axios.get(path, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching details by subName:", error);
    throw error;
  }
};

export const   GetTotalCollection = async() =>{
   try {
    const path = TotalCollectionPath();
    const response = await axios.get(path, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching details:", error);
    throw error; // Rethrow the error for the caller to handle
  }
}