import React from 'react';
import { User, Calendar, LineChart, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockClients, mockAppointments } from '../data/mockData';
import AppointmentCard from '../components/AppointmentCard';

const Dashboard: React.FC = () => {
  // Filter upcoming appointments (scheduled only)
  const upcomingAppointments = mockAppointments
    .filter(appointment => appointment.status === 'scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <User className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Clients</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{mockClients.length}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <Link to="/clients" className="text-sm text-blue-600 hover:text-blue-800">View all</Link>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-6 w-6 text-green-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Upcoming Appointments</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{upcomingAppointments.length}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <Link to="/appointments" className="text-sm text-green-600 hover:text-green-800">View all</Link>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClipboardList className="h-6 w-6 text-purple-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Meal Plans</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">12</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <Link to="/nutrition-plans" className="text-sm text-purple-600 hover:text-purple-800">View all</Link>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <LineChart className="h-6 w-6 text-orange-500" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Client Progress</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">85%</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <Link to="/progress" className="text-sm text-orange-600 hover:text-orange-800">View details</Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <h2 className="mt-8 text-lg font-medium text-gray-900">Recent Activity</h2>
      <div className="mt-2 bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flow-root">
            <ul className="-mb-8">
              <li>
                <div className="relative pb-8">
                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                        <User className="h-5 w-5 text-white" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">New client <span className="font-medium text-gray-900">Sophia Rodriguez</span> joined</p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        1h ago
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="relative pb-8">
                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white">
                        <ClipboardList className="h-5 w-5 text-white" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">Nutrition plan created for <span className="font-medium text-gray-900">Jane Smith</span></p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        3h ago
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="relative pb-8">
                  <div className="relative flex space-x-3">
                    <div>
                      <span className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center ring-8 ring-white">
                        <LineChart className="h-5 w-5 text-white" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500"><span className="font-medium text-gray-900">Michael Johnson</span> logged new progress measurements</p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        5h ago
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <h2 className="mt-8 text-lg font-medium text-gray-900">Upcoming Appointments</h2>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {upcomingAppointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
      {upcomingAppointments.length === 0 && (
        <div className="mt-2 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6 text-center">
            <p className="text-gray-500">No upcoming appointments</p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <h2 className="mt-8 text-lg font-medium text-gray-900">Quick Actions</h2>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Link to="/clients/new" className="block">
          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
            <div className="px-4 py-5 sm:p-6 text-center">
              <User className="h-8 w-8 text-blue-500 mx-auto" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Add New Client</h3>
              <p className="mt-1 text-sm text-gray-500">Register a new client to the system</p>
            </div>
          </div>
        </Link>

        <Link to="/appointments/new" className="block">
          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
            <div className="px-4 py-5 sm:p-6 text-center">
              <Calendar className="h-8 w-8 text-green-500 mx-auto" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Schedule Appointment</h3>
              <p className="mt-1 text-sm text-gray-500">Book a new appointment for a client</p>
            </div>
          </div>
        </Link>

        <Link to="/nutrition-plans/new" className="block">
          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
            <div className="px-4 py-5 sm:p-6 text-center">
              <ClipboardList className="h-8 w-8 text-purple-500 mx-auto" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Create Meal Plan</h3>
              <p className="mt-1 text-sm text-gray-500">Design a new nutrition plan</p>
            </div>
          </div>
        </Link>

        <Link to="/reports" className="block">
          <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-300">
            <div className="px-4 py-5 sm:p-6 text-center">
              <LineChart className="h-8 w-8 text-orange-500 mx-auto" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Generate Reports</h3>
              <p className="mt-1 text-sm text-gray-500">Create and export client reports</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;