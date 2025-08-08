import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, Clock, MapPin, DollarSign, User, Phone, Star, MessageCircle } from 'lucide-react';
import axios from 'axios';

const Bookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/bookings');
      setBookings(response.data.bookings || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      // Fallback to mock data
      setBookings(mockBookings);
    } finally {
      setLoading(false);
    }
  };

  const mockBookings = [
    {
      _id: '1',
      bookingId: 'BK202401001',
      equipment: {
        _id: '1',
        name: 'John Deere 5055E Tractor',
        category: 'Tractor',
        images: [{ url: 'https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg' }]
      },
      owner: {
        _id: '2',
        name: 'Rajesh Kumar',
        phone: '+91 98765 43210'
      },
      renter: {
        _id: '3',
        name: 'Priya Sharma',
        phone: '+91 87654 32109'
      },
      rentalPeriod: {
        startDate: '2024-01-15T00:00:00.000Z',
        endDate: '2024-01-17T00:00:00.000Z',
        totalDays: 3
      },
      pricing: {
        rateType: 'daily',
        rate: 250,
        totalAmount: 750
      },
      location: {
        deliveryAddress: '123 Farm Road, Village Kuppam, Tamil Nadu 635001'
      },
      status: 'confirmed',
      createdAt: '2024-01-10T00:00:00.000Z'
    },
    {
      _id: '2',
      bookingId: 'BK202401002',
      equipment: {
        _id: '2',
        name: 'JCB 3DX Backhoe Loader',
        category: 'JCB',
        images: [{ url: 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg' }]
      },
      owner: {
        _id: '4',
        name: 'Singh Tractors',
        phone: '+91 76543 21098'
      },
      renter: {
        _id: '3',
        name: 'Priya Sharma',
        phone: '+91 87654 32109'
      },
      rentalPeriod: {
        startDate: '2024-01-08T00:00:00.000Z',
        endDate: '2024-01-10T00:00:00.000Z',
        totalDays: 2
      },
      pricing: {
        rateType: 'daily',
        rate: 400,
        totalAmount: 800
      },
      location: {
        deliveryAddress: '456 Agriculture Lane, Coimbatore, Tamil Nadu 641001'
      },
      status: 'completed',
      createdAt: '2024-01-05T00:00:00.000Z'
    },
    {
      _id: '3',
      bookingId: 'BK202401003',
      equipment: {
        _id: '3',
        name: 'Combine Harvester',
        category: 'Harvester',
        images: [{ url: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg' }]
      },
      owner: {
        _id: '5',
        name: 'Harvest Masters',
        phone: '+91 65432 10987'
      },
      renter: {
        _id: '3',
        name: 'Priya Sharma',
        phone: '+91 87654 32109'
      },
      rentalPeriod: {
        startDate: '2024-01-20T00:00:00.000Z',
        endDate: '2024-01-22T00:00:00.000Z',
        totalDays: 2
      },
      pricing: {
        rateType: 'daily',
        rate: 800,
        totalAmount: 1600
      },
      location: {
        deliveryAddress: '789 Harvest Field, Salem, Tamil Nadu 636001'
      },
      status: 'pending',
      createdAt: '2024-01-12T00:00:00.000Z'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return 'badge-warning';
      case 'confirmed':
        return 'badge-info';
      case 'in_progress':
        return 'badge-info';
      case 'completed':
        return 'badge-success';
      case 'cancelled':
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending Approval';
      case 'confirmed':
        return 'Confirmed';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'all') return true;
    return booking.status === activeTab;
  });

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.put(`/api/bookings/${bookingId}/cancel`, {
        reason: 'Cancelled by user'
      });
      fetchBookings(); // Refresh bookings
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">My Bookings</h1>
          <p className="page-description">
            {user?.role === 'farmer' 
              ? 'Track your equipment rentals and booking history'
              : 'Manage bookings for your equipment'
            }
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="tab-nav">
          <button
            className={activeTab === 'all' ? 'active' : ''}
            onClick={() => setActiveTab('all')}
          >
            All Bookings ({bookings.length})
          </button>
          <button
            className={activeTab === 'pending' ? 'active' : ''}
            onClick={() => setActiveTab('pending')}
          >
            Pending ({bookings.filter(b => b.status === 'pending').length})
          </button>
          <button
            className={activeTab === 'confirmed' ? 'active' : ''}
            onClick={() => setActiveTab('confirmed')}
          >
            Confirmed ({bookings.filter(b => b.status === 'confirmed').length})
          </button>
          <button
            className={activeTab === 'completed' ? 'active' : ''}
            onClick={() => setActiveTab('completed')}
          >
            Completed ({bookings.filter(b => b.status === 'completed').length})
          </button>
        </div>

        {/* Bookings List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredBookings.map((booking) => (
            <div key={booking._id} className="card">
              <div className="card-content">
                <div style={{ display: 'flex', gap: '20px' }}>
                  {/* Equipment Image */}
                  <div style={{ flexShrink: 0 }}>
                    <img
                      src={booking.equipment.images?.[0]?.url || 'https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg'}
                      alt={booking.equipment.name}
                      style={{
                        width: '120px',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                  </div>

                  {/* Booking Details */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                      <div>
                        <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '600' }}>
                          {booking.equipment.name}
                        </h3>
                        <p style={{ margin: '0 0 8px 0', color: '#64748b', fontSize: '14px' }}>
                          Booking ID: {booking.bookingId}
                        </p>
                        <span className={`badge ${getStatusBadge(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '20px', fontWeight: '700', color: '#059669' }}>
                          ₹{booking.pricing.totalAmount}
                        </div>
                        <div style={{ fontSize: '14px', color: '#64748b' }}>
                          ₹{booking.pricing.rate}/{booking.pricing.rateType}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-2" style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                        <Calendar size={16} />
                        <span style={{ fontSize: '14px' }}>
                          {new Date(booking.rentalPeriod.startDate).toLocaleDateString()} - {' '}
                          {new Date(booking.rentalPeriod.endDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                        <Clock size={16} />
                        <span style={{ fontSize: '14px' }}>
                          {booking.rentalPeriod.totalDays} days
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                        <User size={16} />
                        <span style={{ fontSize: '14px' }}>
                          {user?.role === 'farmer' ? booking.owner.name : booking.renter.name}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
                        <Phone size={16} />
                        <span style={{ fontSize: '14px' }}>
                          {user?.role === 'farmer' ? booking.owner.phone : booking.renter.phone}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: '#64748b' }}>
                      <MapPin size={16} />
                      <span style={{ fontSize: '14px' }}>
                        {booking.location.deliveryAddress}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <button className="btn btn-secondary">
                        <MessageCircle size={16} />
                        Contact {user?.role === 'farmer' ? 'Owner' : 'Renter'}
                      </button>
                      
                      {booking.status === 'completed' && (
                        <button className="btn btn-secondary">
                          <Star size={16} />
                          Rate & Review
                        </button>
                      )}
                      
                      {(booking.status === 'pending' || booking.status === 'confirmed') && (
                        <button 
                          className="btn btn-danger"
                          onClick={() => handleCancelBooking(booking._id)}
                        >
                          Cancel Booking
                        </button>
                      )}
                      
                      <button className="btn btn-primary">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <Calendar size={48} style={{ color: '#94a3b8', marginBottom: '16px' }} />
            <h3 style={{ color: '#64748b', marginBottom: '8px' }}>No bookings found</h3>
            <p style={{ color: '#94a3b8' }}>
              {activeTab === 'all' 
                ? "You haven't made any bookings yet."
                : `No ${activeTab} bookings at the moment.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;