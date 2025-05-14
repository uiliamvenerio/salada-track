import React, { useState } from 'react';
import { mockClients, mockProgressRecords } from '../data/mockData';
import ProgressChart from '../components/ProgressChart';

const Progress: React.FC = () => {
  const [selectedClientId, setSelectedClientId] = useState(mockClients[0]?.id || '');

  // Get client progress data
  const clientProgressData = mockProgressRecords.filter(
    record => record.clientId === selectedClientId
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Progress Tracking</h1>

      {/* Client Selector */}
      <div className="mt-6 bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="w-full md:w-72">
            <label htmlFor="client-select" className="block text-sm font-medium text-gray-700">
              Select Client
            </label>
            <select
              id="client-select"
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
            >
              <option value="" disabled>
                Select a client
              </option>
              {mockClients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Progress Data Display */}
      {selectedClientId && (
        <div className="mt-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Progress Summary: {mockClients.find(c => c.id === selectedClientId)?.name}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Tracking progress over time to measure the effectiveness of nutrition plans.
              </p>
            </div>

            {clientProgressData.length > 0 ? (
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <ProgressChart 
                    progressData={clientProgressData} 
                    metric="weight" 
                    color="#4CAF50" 
                    unit="kg"
                  />
                  
                  <ProgressChart 
                    progressData={clientProgressData} 
                    metric="bodyFatPercentage" 
                    color="#2196F3" 
                    unit="%"
                  />
                  
                  <ProgressChart 
                    progressData={clientProgressData} 
                    metric="waist" 
                    color="#FF9800" 
                    unit="cm"
                  />
                  
                  <ProgressChart 
                    progressData={clientProgressData} 
                    metric="hips" 
                    color="#9C27B0" 
                    unit="cm"
                  />
                </div>

                {/* Data Table */}
                <div className="mt-8 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Weight (kg)
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Body Fat %
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Waist (cm)
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Hips (cm)
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {clientProgressData
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((record) => (
                          <tr key={record.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(record.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {record.weight}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {record.bodyFatPercentage || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {record.measurements?.waist || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {record.measurements?.hips || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {record.notes}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="px-4 py-5 sm:p-6 text-center">
                <p className="text-gray-500">No progress data available for this client.</p>
                <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Add Progress Record
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;