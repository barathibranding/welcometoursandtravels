import axios from "axios";

const BASE_URL = "https://welcometoursandtravels.com/api/api";

const ApiService = axios.create({
  baseURL: BASE_URL,
});
//----------------search function-------------------

export const searchTours = async (searchQuery) => {
  try {
    const response = await ApiService.get(`/search?search=${searchQuery}`);
    return response.data;
  } catch (error) {
    console.error("Error searching tours:", error);
    throw error;
  }
};

//----------------category page-------------------
export const fetchSubPackages = async (packageId, slug) => {
  try {
    const response = await ApiService.get(`/sub-packages/${packageId}/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sub-packages:", error);
    throw error;
  }
};

//--------------------------------detail-------------------
export const fetchSubPackageDetail = async (Id, slug) => {
  try {
    const response = await ApiService.get(`/sub-package/detail/${Id}/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching details:", error);
    throw error;
  }
};
//------home page sliders data & packages-------------------
export const fetchPackages = async (subcategoryId, slug) => {
  try {
    const response = await ApiService.get(`/packages/${subcategoryId}/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};

//------home page-------------------
export const fetchLatestTours = async () => {
  try {
    const response = await ApiService.get("/latest-tours");
    return response.data;
  } catch (error) {
    console.error("Error fetching latest tours:", error);
    throw error;
  }
};

//----------navbar-----------------------------
export const fetchCategories = async () => {
  try {
    const response = await ApiService.get("/category-list");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
//----------navbar dropdown-----------------------------
export const fetchSubCategories = async () => {
  try {
    const response = await ApiService.get("/package-list");
    return response.data;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
};
//---------- mobile navbar subcategorycard-----------------------------
export const fetchmobilePackages = async (categoryId, slug) => {
  try {
    const response = await ApiService.get(
      `/packages-nav/${categoryId}/${slug}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};
export default ApiService;
