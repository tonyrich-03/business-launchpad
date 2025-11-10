// src/utils/auth.ts

// Export types with type-only exports
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

// Regular exports for values/functions
export const authUtils = {
  // Validate email format
  validateEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  // Validate password strength
  validatePassword: (password: string): { valid: boolean; message: string } => {
    if (password.length < 6) {
      return { valid: false, message: 'Password must be at least 6 characters' };
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      return { valid: false, message: 'Password must contain both uppercase and lowercase letters' };
    }
    return { valid: true, message: 'Password is strong' };
  },

  // Check if user exists in localStorage
  getUserByEmail: (email: string): User | null => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find((user: User) => user.email === email) || null;
  },

  // Save user to localStorage
  saveUser: (user: User): void => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUserIndex = users.findIndex((u: User) => u.id === user.id);
    
    if (existingUserIndex >= 0) {
      users[existingUserIndex] = user;
    } else {
      users.push(user);
    }
    
    localStorage.setItem('users', JSON.stringify(users));
  },

  // Authenticate user
  authenticate: async (email: string, password: string): Promise<AuthResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    
    const user = authUtils.getUserByEmail(email);
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // In a real app, you'd verify the password hash
    // For demo, we'll use a simple check
    const storedPassword = localStorage.getItem(`user_password_${user.id}`);
    if (password !== storedPassword) {
      return { success: false, error: 'Invalid password' };
    }

    return { success: true, user };
  },

  // Register new user
  register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

    if (!authUtils.validateEmail(email)) {
      return { success: false, error: 'Invalid email format' };
    }

    const passwordValidation = authUtils.validatePassword(password);
    if (!passwordValidation.valid) {
      return { success: false, error: passwordValidation.message };
    }

    if (authUtils.getUserByEmail(email)) {
      return { success: false, error: 'User already exists with this email' };
    }

    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      createdAt: new Date(),
    };

    // Save user data
    authUtils.saveUser(newUser);
    
    // Save password (in real app, this would be hashed)
    localStorage.setItem(`user_password_${newUser.id}`, password);

    return { success: true, user: newUser };
  },

  // Get current user from localStorage
  getCurrentUser: (): User | null => {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  },

  // Set current user
  setCurrentUser: (user: User | null): void => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  },

  // Logout user
  logout: (): void => {
    localStorage.removeItem('currentUser');
  },

  // Update user profile
  updateProfile: async (userId: string, updates: Partial<User>): Promise<AuthResponse> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((user: User) => user.id === userId);
    
    if (userIndex === -1) {
      return { success: false, error: 'User not found' };
    }

    users[userIndex] = { ...users[userIndex], ...updates };
    localStorage.setItem('users', JSON.stringify(users));
    
    // Update current user if it's the same user
    const currentUser = authUtils.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      authUtils.setCurrentUser(users[userIndex]);
    }

    return { success: true, user: users[userIndex] };
  }
};