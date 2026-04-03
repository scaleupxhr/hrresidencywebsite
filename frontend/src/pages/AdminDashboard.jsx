import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { PlusCircle, Edit2, Trash2, LogOut, Save, X, Check } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRoom, setEditingRoom] = useState(null);
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/admin/rooms`, {
        withCredentials: true
      });
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const handleEdit = (room) => {
    setEditingRoom({ ...room });
    setIsAddingRoom(false);
  };

  const handleAddNew = () => {
    setEditingRoom({
      name_en: '',
      name_ml: '',
      image: '',
      bed_type_en: '',
      bed_type_ml: '',
      amenities_en: [],
      amenities_ml: [],
      price_per_night: 0,
      original_price: 0,
      is_available: true
    });
    setIsAddingRoom(true);
  };

  const handleCancel = () => {
    setEditingRoom(null);
    setIsAddingRoom(false);
  };

  const handleSave = async () => {
    try {
      if (isAddingRoom) {
        await axios.post(
          `${API_URL}/api/admin/rooms`,
          editingRoom,
          { withCredentials: true }
        );
        setSaveMessage('✅ Room added successfully!');
      } else {
        await axios.put(
          `${API_URL}/api/admin/rooms/${editingRoom.id}`,
          editingRoom,
          { withCredentials: true }
        );
        setSaveMessage('✅ Room updated successfully!');
      }
      
      await fetchRooms();
      setEditingRoom(null);
      setIsAddingRoom(false);
      
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('❌ Error saving room. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleDelete = async (roomId) => {
    if (!window.confirm('Are you sure you want to delete this room?')) return;
    
    try {
      await axios.delete(`${API_URL}/api/admin/rooms/${roomId}`, {
        withCredentials: true
      });
      setSaveMessage('✅ Room deleted successfully!');
      await fetchRooms();
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('❌ Error deleting room. Please try again.');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleInputChange = (field, value) => {
    setEditingRoom({ ...editingRoom, [field]: value });
  };

  const handleAmenitiesChange = (field, value) => {
    const amenitiesArray = value.split(',').map(a => a.trim()).filter(a => a);
    setEditingRoom({ ...editingRoom, [field]: amenitiesArray });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome, {user?.name}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success/Error Message */}
        {saveMessage && (
          <div className={`mb-6 p-4 rounded-lg ${saveMessage.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {saveMessage}
          </div>
        )}

        {/* Add New Button */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Room Management</h2>
          {!editingRoom && (
            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              <PlusCircle size={20} />
              Add New Room
            </button>
          )}
        </div>

        {/* Edit/Add Form */}
        {editingRoom && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">
              {isAddingRoom ? 'Add New Room' : 'Edit Room'}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Name (English)</label>
                <input
                  type="text"
                  value={editingRoom.name_en}
                  onChange={(e) => handleInputChange('name_en', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g., Deluxe AC Room"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Name (Malayalam)</label>
                <input
                  type="text"
                  value={editingRoom.name_ml}
                  onChange={(e) => handleInputChange('name_ml', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Malayalam name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bed Type (English)</label>
                <input
                  type="text"
                  value={editingRoom.bed_type_en}
                  onChange={(e) => handleInputChange('bed_type_en', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g., Double Bed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bed Type (Malayalam)</label>
                <input
                  type="text"
                  value={editingRoom.bed_type_ml}
                  onChange={(e) => handleInputChange('bed_type_ml', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Malayalam bed type"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Price (₹)</label>
                <input
                  type="number"
                  value={editingRoom.price_per_night}
                  onChange={(e) => handleInputChange('price_per_night', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g., 1400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                <input
                  type="number"
                  value={editingRoom.original_price}
                  onChange={(e) => handleInputChange('original_price', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g., 1800"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingRoom.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="https://example.com/room-image.jpg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amenities (English) - comma separated
                </label>
                <input
                  type="text"
                  value={editingRoom.amenities_en?.join(', ') || ''}
                  onChange={(e) => handleAmenitiesChange('amenities_en', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g., Air Conditioning, Private Bathroom, TV"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amenities (Malayalam) - comma separated
                </label>
                <input
                  type="text"
                  value={editingRoom.amenities_ml?.join(', ') || ''}
                  onChange={(e) => handleAmenitiesChange('amenities_ml', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Malayalam amenities"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingRoom.is_available}
                    onChange={(e) => handleInputChange('is_available', e.target.checked)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-700">Room is Available</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
              >
                <Save size={18} />
                Save Room
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div key={room.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <img
                src={room.image}
                alt={room.name_en}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{room.name_en}</h3>
                    <p className="text-sm text-gray-600">{room.bed_type_en}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {room.is_available ? (
                      <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        <Check size={12} />
                        Available
                      </span>
                    ) : (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                        Unavailable
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-blue-600">₹{room.price_per_night}</span>
                    <span className="text-sm text-gray-400 line-through">₹{room.original_price}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">per night</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(room)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(room.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {rooms.length === 0 && !editingRoom && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No rooms found. Add your first room!</p>
            <button
              onClick={handleAddNew}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              <PlusCircle size={20} />
              Add First Room
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
