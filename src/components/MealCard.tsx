import React from 'react';
import { Meal } from '../types';

interface MealCardProps {
  meal: Meal;
  onClick?: () => void;
}

const MealCard: React.FC<MealCardProps> = ({ meal, onClick }) => {
  // Generate random image URL related to the meal name for demonstration purposes
  const getImageUrl = () => {
    const mealTypes = {
      breakfast: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg',
      lunch: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      dinner: 'https://images.pexels.com/photos/1860208/pexels-photo-1860208.jpeg',
      snack: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg'
    };
    
    return mealTypes[meal.mealType];
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="h-40 overflow-hidden">
        <img 
          src={getImageUrl()} 
          alt={meal.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
              {meal.mealType}
            </span>
            <h3 className="mt-1 text-lg font-semibold text-gray-900">{meal.name}</h3>
          </div>
        </div>

        <div className="mt-2">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-blue-50 p-2 rounded">
              <p className="text-xs text-gray-500">Calories</p>
              <p className="font-semibold text-gray-700">{meal.calories}</p>
            </div>
            <div className="bg-red-50 p-2 rounded">
              <p className="text-xs text-gray-500">Protein</p>
              <p className="font-semibold text-gray-700">{meal.protein}g</p>
            </div>
            <div className="bg-yellow-50 p-2 rounded">
              <p className="text-xs text-gray-500">Carbs</p>
              <p className="font-semibold text-gray-700">{meal.carbs}g</p>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <h4 className="text-sm font-medium text-gray-700">Ingredients:</h4>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {meal.ingredients.join(', ')}
          </p>
        </div>

        <button className="mt-4 w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default MealCard;