export const menuItems = {
  appetizers: [
    {
      id: 1,
      name: "Pepper Soup Combo",
      description:
        "Assorted meat in spicy Nigerian pepper soup with fresh herbs",
      price: 2500,
      image:
        "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop",
      popular: true,
      spicy: 3,
      vegan: false,
      calories: 180,
      prepTime: "15 mins",
      ingredients: ["Assorted meat", "Pepper", "Scent leaves", "Ginger"],
    },
    {
      id: 2,
      name: "Plantain & Yam Porridge",
      description: "Creamy porridge with ripe plantains and tender yam pieces",
      price: 1800,
      image:
        "https://images.unsplash.com/photo-1609501676725-7186f734b2b0?w=400&h=300&fit=crop",
      popular: false,
      spicy: 1,
      vegan: true,
      calories: 220,
      prepTime: "20 mins",
      ingredients: ["Plantain", "Yam", "Palm oil", "Vegetables"],
    },
    {
      id: 3,
      name: "Suya Platter",
      description: "Grilled spiced beef with onions, tomatoes, and suya spice",
      price: 3200,
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      popular: true,
      spicy: 4,
      vegan: false,
      calories: 280,
      prepTime: "25 mins",
      ingredients: ["Beef", "Suya spice", "Onions", "Tomatoes"],
    },
  ],
  "main-dishes": [
    {
      id: 11,
      name: "Jollof Rice Supreme",
      description: "Premium jollof rice with chicken, beef, and prawns",
      price: 4500,
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
      popular: true,
      spicy: 2,
      vegan: false,
      calories: 450,
      prepTime: "35 mins",
      ingredients: ["Rice", "Chicken", "Beef", "Prawns", "Tomatoes"],
    },
    {
      id: 12,
      name: "Egusi Deluxe",
      description: "Rich melon seed soup with assorted meat and vegetables",
      price: 3800,
      image:
        "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&h=300&fit=crop",
      popular: true,
      spicy: 2,
      vegan: false,
      calories: 380,
      prepTime: "40 mins",
      ingredients: ["Melon seeds", "Assorted meat", "Spinach", "Palm oil"],
    },
  ],
  "local-specials": [
    {
      id: 21,
      name: "Banga Rice Special",
      description:
        "Traditional palm nut rice with fresh fish and native spices",
      price: 3500,
      image:
        "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop",
      popular: true,
      spicy: 3,
      vegan: false,
      calories: 420,
      prepTime: "45 mins",
      ingredients: ["Palm nuts", "Rice", "Fresh fish", "Native spices"],
    },
  ],
  grills: [
    {
      id: 31,
      name: "BBQ Chicken Wings",
      description: "Smoky grilled wings with our signature BBQ sauce",
      price: 2800,
      image:
        "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&h=300&fit=crop",
      popular: false,
      spicy: 2,
      vegan: false,
      calories: 320,
      prepTime: "30 mins",
      ingredients: ["Chicken wings", "BBQ sauce", "Spices"],
    },
  ],
  beverages: [
    {
      id: 41,
      name: "Fresh Chapman",
      description: "Nigerian cocktail with fruit juices and grenadine",
      price: 1200,
      image:
        "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400&h=300&fit=crop",
      popular: true,
      spicy: 0,
      vegan: true,
      calories: 120,
      prepTime: "5 mins",
      ingredients: ["Mixed fruit juices", "Grenadine", "Cucumber", "Orange"],
    },
  ],
  desserts: [
    {
      id: 51,
      name: "Chin Chin Delight",
      description: "Crispy fried dough cubes dusted with sugar",
      price: 800,
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
      popular: false,
      spicy: 0,
      vegan: false,
      calories: 180,
      prepTime: "10 mins",
      ingredients: ["Flour", "Sugar", "Oil", "Nutmeg"],
    },
  ],
};

// Additional API helper functions
export const getMenuItemsByCategory = (category) => {
  return menuItems[category] || [];
};

export const getPopularItems = () => {
  const allItems = Object.values(menuItems).flat();
  return allItems.filter((item) => item.popular);
};

export const getMenuItemById = (id) => {
  const allItems = Object.values(menuItems).flat();
  return allItems.find((item) => item.id === id);
};

export const searchMenuItems = (query) => {
  const allItems = Object.values(menuItems).flat();
  const lowercaseQuery = query.toLowerCase();
  return allItems.filter(
    (item) =>
      item.name.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery) ||
      item.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const getItemsByDietary = (dietaryRestriction) => {
  const allItems = Object.values(menuItems).flat();
  return allItems.filter(
    (item) => item.dietary && item.dietary.includes(dietaryRestriction)
  );
};

export const getItemsBySpicyLevel = (spicyLevel) => {
  const allItems = Object.values(menuItems).flat();
  return allItems.filter((item) => item.spicyLevel === spicyLevel);
};

export const getItemsByPriceRange = (minPrice, maxPrice) => {
  const allItems = Object.values(menuItems).flat();
  return allItems.filter(
    (item) => item.price >= minPrice && item.price <= maxPrice
  );
};

export const getCategories = () => {
  return Object.keys(menuItems);
};

export const getPriceRange = () => {
  const allItems = Object.values(menuItems).flat();
  const prices = allItems.map((item) => item.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};

export const getAverageRating = () => {
  // Simulated ratings for demonstration
  return 4.5;
};

export const getMenuStats = () => {
  const allItems = Object.values(menuItems).flat();
  return {
    totalItems: allItems.length,
    totalCategories: Object.keys(menuItems).length,
    popularItems: allItems.filter((item) => item.popular).length,
    vegetarianItems: allItems.filter(
      (item) => item.dietary && item.dietary.includes("vegetarian")
    ).length,
    veganItems: allItems.filter(
      (item) => item.dietary && item.dietary.includes("vegan")
    ).length,
    glutenFreeItems: allItems.filter(
      (item) => item.dietary && item.dietary.includes("gluten-free")
    ).length,
  };
};

