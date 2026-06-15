import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  phone: string;
  generation: '2008' | '2009';
  city: string;
  points: number;
  rank: number;
  joinDate: string;
}

interface AuthContextType {
  user: User | null;
  login: (phone: string, password: string) => boolean;
  register: (name: string, phone: string, password: string, generation: '2008' | '2009', city: string) => boolean;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => boolean;
  updateUser: (updatedUser: User) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>( undefined );

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // تحميل المستخدم من localStorage عند بدء التطبيق
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // التأكد من وجود جميع الحقول المطلوبة
      const userData: User = {
        id: parsedUser.id || Date.now().toString(),
        name: parsedUser.name || '',
        phone: parsedUser.phone || '',
        generation: parsedUser.generation || '2008',
        city: parsedUser.city || '',
        points: parsedUser.points || 0,
        rank: parsedUser.rank || 0,
        joinDate: parsedUser.joinDate || new Date().toISOString()
      };
      setUser(userData);
    }
  }, []);

  const login = (phone: string, password: string): boolean => {
    // الحصول على قائمة المستخدمين المسجلين
    const usersData = localStorage.getItem('users');
    const users = usersData ? JSON.parse(usersData) : [];

    // البحث عن المستخدم
    const foundUser = users.find(
      (u: any) => u.phone === phone && u.password === password
    );

    if (foundUser) {
      const userData: User = {
        id: foundUser.id || Date.now().toString(),
        name: foundUser.name || '',
        phone: foundUser.phone || '',
        generation: foundUser.generation || '2008',
        city: foundUser.city || '',
        points: foundUser.points || 0,
        rank: foundUser.rank || 0,
        joinDate: foundUser.joinDate || new Date().toISOString()
      };
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return true;
    }

    return false;
  };

  const register = (
    name: string,
    phone: string,
    password: string,
    generation: '2008' | '2009',
    city: string
  ): boolean => {
    // الحصول على قائمة المستخدمين المسجلين
    const usersData = localStorage.getItem('users');
    const users = usersData ? JSON.parse(usersData) : [];

    // التحقق من أن رقم الهاتف غير مسجل مسبقاً
    const phoneExists = users.some((u: any) => u.phone === phone);
    if (phoneExists) {
      return false;
    }

    // إنشاء مستخدم جديد مع نقاط وترتيب وهمي
    const randomPoints = Math.floor(Math.random() * 2000) + 500; // نقاط عشوائية بين 500 و 2500
    const randomRank = Math.floor(Math.random() * 50) + 1; // ترتيب عشوائي بين 1 و 50
    
    const newUser = {
      id: Date.now().toString(),
      name,
      phone,
      password,
      generation,
      city,
      points: randomPoints,
      rank: randomRank,
      joinDate: new Date().toISOString()
    };

    // إضافة المستخدم الجديد
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // تسجيل الدخول تلقائياً
    const userData: User = {
      id: newUser.id,
      name: newUser.name,
      phone: newUser.phone,
      generation: newUser.generation,
      city: newUser.city,
      points: newUser.points,
      rank: newUser.rank,
      joinDate: newUser.joinDate
    };
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const changePassword = (oldPassword: string, newPassword: string): boolean => {
    if (!user) {
      return false;
    }

    // الحصول على قائمة المستخدمين المسجلين
    const usersData = localStorage.getItem('users');
    const users = usersData ? JSON.parse(usersData) : [];

    // البحث عن المستخدم
    const foundUser = users.find(
      (u: any) => u.phone === user.phone && u.password === oldPassword
    );

    if (foundUser) {
      foundUser.password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));

      // تحديث بيانات المستخدم في localStorage
      const userData: User = {
        id: foundUser.id || user.id,
        name: foundUser.name || user.name,
        phone: foundUser.phone || user.phone,
        generation: foundUser.generation || user.generation,
        city: foundUser.city || user.city,
        points: foundUser.points || 0,
        rank: foundUser.rank || 0,
        joinDate: foundUser.joinDate || user.joinDate
      };
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));

      return true;
    }

    return false;
  };

  const updateUser = (updatedUser: User) => {
    if (!user) {
      return;
    }

    // الحصول على قائمة المستخدمين المسجلين
    const usersData = localStorage.getItem('users');
    const users = usersData ? JSON.parse(usersData) : [];

    // البحث عن المستخدم
    const foundUser = users.find(
      (u: any) => u.phone === user.phone
    );

    if (foundUser) {
      foundUser.name = updatedUser.name;
      foundUser.city = updatedUser.city;
      foundUser.points = updatedUser.points;
      foundUser.rank = updatedUser.rank;
      localStorage.setItem('users', JSON.stringify(users));

      // تحديث بيانات المستخدم في localStorage
      const userData: User = {
        id: foundUser.id || user.id,
        name: foundUser.name || user.name,
        phone: foundUser.phone || user.phone,
        generation: foundUser.generation || user.generation,
        city: foundUser.city || user.city,
        points: foundUser.points || 0,
        rank: foundUser.rank || 0,
        joinDate: foundUser.joinDate || user.joinDate
      };
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));

      return;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        changePassword,
        updateUser,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}