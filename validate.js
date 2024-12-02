const validateMenuItem = (name, price, category) => {
    const validCategories = ['starter', 'main course', 'dessert', 'beverage'];
    if (!name || typeof name !== 'string' || name.trim() === '') return false;
    if (typeof price !== 'number' || price <= 0) return false;
    if (!validCategories.includes(category)) return false;
    return true;
  };
  
  module.exports = { validateMenuItem };
  