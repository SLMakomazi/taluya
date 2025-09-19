/**
 * API Service for fetching data
 * Handles all data fetching operations for the application
 */

import equipmentData from '../data/equipment.json';
import eventsData from '../data/events.json';
import merchandiseData from '../data/merch.json';
import galleryData from '../data/gallery.json';
import mixesData from '../data/mixes.json';

/**
 * Fetches all equipment items
 * @returns {Promise<Array>} Array of equipment item objects
 */
export const getEquipment = async () => {
  try {
    // Use the imported data directly in both dev and production
    return (equipmentData.items || []).filter(item => item.show !== false);
  } catch (error) {
    console.error('Error fetching equipment:', error);
    return [];
  }
};

/**
 * Fetches featured equipment items
 * @returns {Promise<Array>} Array of featured equipment item objects
 */
export const getFeaturedEquipment = async () => {
  try {
    const items = await getEquipment();
    // Return first 3 visible items as featured
    return items.filter(item => item.show !== false).slice(0, 3);
  } catch (error) {
    console.error('Error fetching featured equipment:', error);
    return [];
  }
};

/**
 * Fetches an equipment item by ID
 * @param {number} id - Equipment ID
 * @returns {Promise<Object|null>} Equipment item or null if not found
 */
export const getEquipmentById = async (id) => {
  try {
    const items = await getEquipment();
    return items.find(item => item.id === id) || null;
  } catch (error) {
    console.error(`Error fetching equipment with ID ${id}:`, error);
    return null;
  }
};

/**
 * Fetches all merchandise items
 * @returns {Promise<Array>} Array of merchandise item objects
 */
export const getMerchandise = async () => {
  try {
    // Use the imported data directly in both dev and production
    return (merchandiseData.items || []).filter(item => item.show !== false);
  } catch (error) {
    console.error('Error fetching merchandise:', error);
    return [];
  }
};

/**
 * Fetches featured merchandise items
 * @returns {Promise<Array>} Array of featured merchandise item objects
 */
export const getFeaturedMerchandise = async () => {
  try {
    const items = await getMerchandise();
    // Return first 3 visible items as featured
    return items.filter(item => item.show !== false).slice(0, 3);
  } catch (error) {
    console.error('Error fetching featured merchandise:', error);
    return [];
  }
};

/**
 * Fetches a merchandise item by ID
 * @param {number} id - Merchandise ID
 * @returns {Promise<Object|null>} Merchandise item or null if not found
 */
export const getMerchandiseById = async (id) => {
  try {
    const items = await getMerchandise();
    return items.find(item => item.id === id) || null;
  } catch (error) {
    console.error(`Error fetching merchandise with ID ${id}:`, error);
    return null;
  }
};

/**
 * Fetches all events
 * @returns {Promise<Array>} Array of event objects
 */
export const getEvents = async () => {
  try {
    // eventsData is already an array, so we return it directly
    return Array.isArray(eventsData) ? eventsData : [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

/**
 * Fetches featured events
 * @returns {Promise<Array>} Array of featured event objects
 */
export const getFeaturedEvents = async () => {
  try {
    const events = await getEvents();
    return events.filter(event => event.isFeatured);
  } catch (error) {
    console.error('Error fetching featured events:', error);
    return [];
  }
};

/**
 * Fetches an event by ID
 * @param {number} id - Event ID
 * @returns {Promise<Object|null>} Event object or null if not found
 */
export const getEventById = async (id) => {
  try {
    const events = await getEvents();
    return events.find(event => event.id === id) || null;
  } catch (error) {
    console.error(`Error fetching event with ID ${id}:`, error);
    return null;
  }
};

/**
 * Fetches all gallery items
 * @returns {Promise<Array>} Array of gallery item objects
 */
export const getGalleryItems = async () => {
  try {
    // Use the imported data directly in both dev and production
    return galleryData || [];
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return [];
  }
};

/**
 * Fetches gallery items by category
 * @param {string} category - Category to filter by
 * @returns {Promise<Array>} Array of filtered gallery item objects
 */
export const getGalleryItemsByCategory = async (category) => {
  try {
    const items = await getGalleryItems();
    return items.filter(item => item.category === category);
  } catch (error) {
    console.error(`Error fetching gallery items for category ${category}:`, error);
    return [];
  }
};

/**
 * Fetches all mixes
 * @returns {Promise<Array>} Array of mix objects
 */
export const getMixes = async () => {
  try {
    // Use the imported data directly in both dev and production
    return mixesData || [];
  } catch (error) {
    console.error('Error fetching mixes:', error);
    return [];
  }
};

/**
 * Fetches featured mixes
 * @returns {Promise<Array>} Array of featured mix objects
 */
export const getFeaturedMixes = async () => {
  try {
    const mixes = await getMixes();
    return mixes.filter(mix => mix.isFeatured);
  } catch (error) {
    console.error('Error fetching featured mixes:', error);
    return [];
  }
};

/**
 * Fetches a mix by ID
 * @param {number} id - Mix ID
 * @returns {Promise<Object|null>} Mix object or null if not found
 */
export const getMixById = async (id) => {
  try {
    const mixes = await getMixes();
    return mixes.find(mix => mix.id === id) || null;
  } catch (error) {
    console.error(`Error fetching mix with ID ${id}:`, error);
    return null;
  }
};

/**
 * Submits the contact form
 * @param {Object} formData - Form data to submit
 * @returns {Promise<Object>} Response from the server
 */
export const submitContactForm = async (formData) => {
  try {
    // In a real application, this would be a POST request to your backend
    console.log('Submitting contact form:', formData);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate successful submission
    return {
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      message: 'An error occurred while submitting the form. Please try again later.'
    };
  }
};

/**
 * Subscribes an email to the newsletter
 * @param {string} email - Email to subscribe
 * @returns {Promise<Object>} Response from the server
 */
export const subscribeToNewsletter = async (email) => {
  try {
    // In a real application, this would be a POST request to your backend
    console.log('Subscribing email:', email);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate successful subscription
    return {
      success: true,
      message: 'Thank you for subscribing to our newsletter!'
    };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return {
      success: false,
      message: 'An error occurred while subscribing. Please try again later.'
    };
  }
};
