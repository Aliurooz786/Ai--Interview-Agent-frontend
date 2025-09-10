import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Hamari API service import karein

const TrainersPage = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        // Public API ko call karein
        const response = await api.get('/public/trainers');
        setTrainers(response.data);
      } catch (err) {
        setError('Failed to fetch trainers. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []); // [] ka matlab hai ki yeh effect sirf ek baar chalega

  if (loading) {
    return <div className="text-center py-10">Loading trainers...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Meet Our Trainers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="border rounded-lg shadow-lg p-6 bg-white">
            <h2 className="text-2xl font-semibold mb-2">{trainer.user.name}</h2>
            <p className="text-gray-600 mb-4">{trainer.description}</p>
            <div className="flex flex-wrap gap-2">
              {trainer.specializations.map((spec, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                  {spec}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainersPage;
