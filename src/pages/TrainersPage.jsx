import React, { useState, useEffect } from 'react';
import { getAllTrainers } from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TrainersPage = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await getAllTrainers();
        setTrainers(response.data);
      } catch (err) {
        setError('Failed to fetch trainers. Please try again later.');
        console.error("Error fetching trainers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []); 

  if (loading) {
    return <div className="text-center py-20">Loading trainers...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">Meet Our Professionals</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trainers.map((trainer) => (
          <Card key={trainer.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl">{trainer.user.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{trainer.description}</p>
              <div className="flex flex-wrap gap-2">
                {trainer.specializations.map((spec, index) => (
                  <span key={index} className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                    {spec}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrainersPage;

