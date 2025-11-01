import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function LoginPage() {
  const { user, signInWithGoogle, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [showAlphaWarning, setShowAlphaWarning] = useState(true);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate('/notes');
    } catch (error) {
      console.error('Google Sign-In failed:', error.message);
      alert('Google Sign-In failed: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      {/* Alpha Warning Popup */}
      {showAlphaWarning && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-scale-in">
            {/* Close Button */}
            <button
              onClick={() => setShowAlphaWarning(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <div className="text-center space-y-4">
              <div className="text-5xl">🚧</div>
              <h2 className="text-2xl font-bold text-gray-900">Alpha Build</h2>
              <p className="text-gray-600 leading-relaxed">
                This is an early alpha version of the app. Things might break, and data could be wiped anytime. Still in active development.
              </p>
              <button
                onClick={() => setShowAlphaWarning(false)}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-md"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-sm w-full space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
            <span className="text-2xl font-bold text-white">N</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {user ? 'Welcome Back!' : 'Welcome'}
          </h1>
          <p className="text-gray-600">
            {user ? 'You are successfully signed in' : 'Sign in to access your notes'}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          {user ? (
            <div className="text-center space-y-6">
              {/* User Info */}
              <div className="flex items-center justify-center space-x-4">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                )}
                <div className="text-left">
                  <h2 className="font-semibold text-gray-900">{user.displayName}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/notes')}
                  className="w-full bg-blue-500 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-600 transition-colors duration-200 shadow-sm"
                >
                  Go to Notes
                </button>
                <button
                  onClick={() => logout().then(() => navigate('/'))}
                  className="w-full bg-gray-100 text-teal-50 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 transition-colors duration-200"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Sign In Section */}
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Continue to Notes
                </h2>
                <p className="text-gray-500 text-sm">
                    sign-in using Google
                </p>
              </div>

              {/* Google Sign In Button */}
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-teal-50 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-200 shadow-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;