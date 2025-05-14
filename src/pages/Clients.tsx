import React, { useState } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockClients } from '../data/mockData';
import ClientCard from '../components/ClientCard';

const Clients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDietaryRestriction, setFilterDietaryRestriction] = useState('');

  // Get unique dietary restrictions from all clients
  const uniqueDietaryRestrictions = Array.from(
    new Set(mockClients.flatMap(client => client.dietaryRestrictions))
  );

  // Filter clients based on search term and dietary restriction filter
  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDietaryRestriction = filterDietaryRestriction === '' || 
                                      client.dietaryRestrictions.includes(filterDietaryRestriction);
    
    return matchesSearch && matchesDietaryRestriction;
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
        <Link
          to="/clients/new"
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Client
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="mt-6 bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="Search clients..."
              />
            </div>
          </div>
          <div className="w-full md:w-auto">
            <select
              value={filterDietaryRestriction}
              onChange={(e) => setFilterDietaryRestriction(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            >
              <option value="">All Dietary Restrictions</option>
              {uniqueDietaryRestrictions.map(restriction => (
                <option key={restriction} value={restriction}>
                  {restriction}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Client List */}
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredClients.map(client => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <div className="mt-6 bg-white rounded-lg shadow p-8 text-center">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
            <User className="h-6 w-6 text-gray-600" />
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No clients found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterDietaryRestriction
              ? 'Try adjusting your search or filter to find what you\'re looking for.'
              : 'Get started by adding your first client.'}
          </p>
          {!searchTerm && !filterDietaryRestriction && (
            <div className="mt-6">
              <Link
                to="/clients/new"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add New Client
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Clients;