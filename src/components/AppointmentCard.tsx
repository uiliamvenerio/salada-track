import React from 'react';
import { Clock, Calendar, User } from 'lucide-react';
import { Appointment } from '../types';
import { mockClients } from '../data/mockData';

interface AppointmentCardProps {
  appointment: Appointment;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  const client = mockClients.find((c) => c.id === appointment.clientId);
  
  const getStatusColor = () => {
    switch (appointment.status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const getAppointmentTypeLabel = () => {
    switch (appointment.type) {
      case 'initial':
        return 'Initial Consultation';
      case 'followUp':
        return 'Follow-up';
      case 'assessment':
        return 'Assessment';
      default:
        return appointment.type;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}
            >
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </span>
            <h3 className="text-lg font-semibold text-gray-900 mt-1">{getAppointmentTypeLabel()}</h3>
          </div>
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Calendar size={18} className="text-blue-600" />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <User size={16} className="mr-2 text-gray-400" />
            <span className="font-medium">{client?.name || 'Unknown Client'}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={16} className="mr-2 text-gray-400" />
            <span>{formatDate(appointment.date)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock size={16} className="mr-2 text-gray-400" />
            <span>
              {formatTime(appointment.time)} ({appointment.duration} min)
            </span>
          </div>
        </div>

        {appointment.notes && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700">Notes:</h4>
            <p className="text-sm text-gray-600 mt-1">{appointment.notes}</p>
          </div>
        )}

        <div className="mt-6 flex space-x-3">
          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Reschedule
          </button>
          {appointment.status === 'scheduled' && (
            <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;