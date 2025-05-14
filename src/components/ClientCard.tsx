import React from 'react';
import { Calendar, Phone, Mail, ArrowRight } from 'lucide-react';
import { Client } from '../types';
import { Link } from 'react-router-dom';

interface ClientCardProps {
  client: Client;
}

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
            <p className="text-sm text-gray-500">
              {client.age} yrs • {client.height} cm • {client.weight} kg
            </p>
          </div>
          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-800 font-medium">
              {client.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={16} className="mr-2 text-gray-400" />
            <span>Started: {new Date(client.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={16} className="mr-2 text-gray-400" />
            <span>Last visit: {new Date(client.lastVisit).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone size={16} className="mr-2 text-gray-400" />
            <span>{client.phone}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Mail size={16} className="mr-2 text-gray-400" />
            <span>{client.email}</span>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700">Goals:</h4>
          <p className="text-sm text-gray-600 mt-1">{client.goals}</p>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700">Dietary Restrictions:</h4>
          <div className="flex flex-wrap gap-2 mt-1">
            {client.dietaryRestrictions.map((restriction, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {restriction}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Link
            to={`/clients/${client.id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            View Details
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;