import React, { useState } from 'react';
import { mockClients, mockNutritionPlans, mockMeals } from '../data/mockData';
import MealCard from '../components/MealCard';
import { ClipboardPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const NutritionPlans: React.FC = () => {
  const [selectedPlanId, setSelectedPlanId] = useState(mockNutritionPlans[0]?.id || '');
  const [selectedDay, setSelectedDay] = useState('monday');

  const selectedPlan = mockNutritionPlans.find(plan => plan.id === selectedPlanId);
  const clientName = mockClients.find(client => client.id === selectedPlan?.clientId)?.name;

  const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  // Calculate nutrition totals for the selected day
  const calculateDailyTotals = () => {
    if (!selectedPlan || !selectedPlan.meals[selectedDay]) {
      return { calories: 0, protein: 0, carbs: 0, fat: 0 };
    }

    return selectedPlan.meals[selectedDay].reduce(
      (totals, meal) => {
        return {
          calories: totals.calories + meal.calories,
          protein: totals.protein + meal.protein,
          carbs: totals.carbs + meal.carbs,
          fat: totals.fat + meal.fat,
        };
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };

  const dailyTotals = calculateDailyTotals();
  
  // Calculate percentage of daily targets
  const calculatePercentage = (value: number, target: number) => {
    return Math.round((value / target) * 100);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Nutrition Plans</h1>
        <Link
          to="/nutrition-plans/new"
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <ClipboardPlus className="mr-2 h-4 w-4" />
          Create New Plan
        </Link>
      </div>

      {/* Plan Selector */}
      <div className="mt-6 bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-72">
            <label htmlFor="plan-select" className="block text-sm font-medium text-gray-700">
              Select Nutrition Plan
            </label>
            <select
              id="plan-select"
              value={selectedPlanId}
              onChange={(e) => setSelectedPlanId(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            >
              <option value="" disabled>
                Select a plan
              </option>
              {mockNutritionPlans.map(plan => {
                const clientName = mockClients.find(c => c.id === plan.clientId)?.name || "Unknown Client";
                return (
                  <option key={plan.id} value={plan.id}>
                    {plan.title} - {clientName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      {/* Plan Details */}
      {selectedPlan && (
        <div className="mt-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {selectedPlan.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Client: {clientName} • {new Date(selectedPlan.startDate).toLocaleDateString()} to {new Date(selectedPlan.endDate).toLocaleDateString()}
              </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
              <p className="text-sm text-gray-700 mb-4">{selectedPlan.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500">Daily Calorie Target</p>
                  <p className="text-xl font-bold text-gray-900">{selectedPlan.dailyCalorieTarget} kcal</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500">Protein Target</p>
                  <p className="text-xl font-bold text-gray-900">{selectedPlan.proteinTarget}g</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500">Carbs Target</p>
                  <p className="text-xl font-bold text-gray-900">{selectedPlan.carbsTarget}g</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-500">Fat Target</p>
                  <p className="text-xl font-bold text-gray-900">{selectedPlan.fatTarget}g</p>
                </div>
              </div>

              {/* Day selector tabs */}
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-2 overflow-x-auto">
                  {weekdays.map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`capitalize whitespace-nowrap py-2 px-3 border-b-2 font-medium text-sm ${
                        selectedDay === day
                          ? 'border-green-500 text-green-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Daily nutrition summary */}
              <div className="mt-6 mb-6">
                <h4 className="text-sm font-medium text-gray-700 capitalize">{selectedDay} Summary</h4>
                <div className="mt-2 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Calories</p>
                    <div className="flex items-center mt-1">
                      <span className="text-lg font-semibold text-gray-900">{dailyTotals.calories} kcal</span>
                      <span className="ml-2 text-xs text-gray-500">
                        ({calculatePercentage(dailyTotals.calories, selectedPlan.dailyCalorieTarget)}% of target)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${Math.min(calculatePercentage(dailyTotals.calories, selectedPlan.dailyCalorieTarget), 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Protein</p>
                    <div className="flex items-center mt-1">
                      <span className="text-lg font-semibold text-gray-900">{dailyTotals.protein}g</span>
                      <span className="ml-2 text-xs text-gray-500">
                        ({calculatePercentage(dailyTotals.protein, selectedPlan.proteinTarget)}% of target)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${Math.min(calculatePercentage(dailyTotals.protein, selectedPlan.proteinTarget), 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Carbs</p>
                    <div className="flex items-center mt-1">
                      <span className="text-lg font-semibold text-gray-900">{dailyTotals.carbs}g</span>
                      <span className="ml-2 text-xs text-gray-500">
                        ({calculatePercentage(dailyTotals.carbs, selectedPlan.carbsTarget)}% of target)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(calculatePercentage(dailyTotals.carbs, selectedPlan.carbsTarget), 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Fat</p>
                    <div className="flex items-center mt-1">
                      <span className="text-lg font-semibold text-gray-900">{dailyTotals.fat}g</span>
                      <span className="ml-2 text-xs text-gray-500">
                        ({calculatePercentage(dailyTotals.fat, selectedPlan.fatTarget)}% of target)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(calculatePercentage(dailyTotals.fat, selectedPlan.fatTarget), 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Daily meals list */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-4 capitalize">{selectedDay} Meals</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {selectedPlan.meals[selectedDay] && selectedPlan.meals[selectedDay].length > 0 ? (
                    selectedPlan.meals[selectedDay].map((meal) => (
                      <MealCard key={meal.id} meal={meal} />
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-8 bg-gray-50 rounded-lg">
                      <p className="text-gray-500">No meals added for this day.</p>
                      <button className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Add Meal
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!selectedPlan && (
        <div className="mt-6 bg-white rounded-lg shadow p-8 text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
            <ClipboardPlus className="h-6 w-6 text-gray-600" />
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No nutrition plan selected</h3>
          <p className="mt-1 text-sm text-gray-500">
            {mockNutritionPlans.length > 0
              ? 'Please select a nutrition plan from the dropdown above.'
              : 'Get started by creating your first nutrition plan.'}
          </p>
          {mockNutritionPlans.length === 0 && (
            <div className="mt-6">
              <Link
                to="/nutrition-plans/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <ClipboardPlus className="mr-2 h-4 w-4" />
                Create New Plan
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NutritionPlans;