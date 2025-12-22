import { useNavigate } from 'react-router-dom';
import TracingCard from '../components/TracingCard';
import NavBar from '../components/Navbar';

const CATEGORIES = [
  { 
    id: 'letters', 
    title: 'Alphabets', 
    icon: 'ABC', 
    colorClass: 'from-emerald-400 to-cyan-700', 
    path: '/letters' 
  },
  { 
    id: 'numbers', 
    title: 'Numbers', 
    icon: '123', 
    colorClass: 'from-orange-400 to-red-600', 
    path: '/counting' 
  },
  { 
    id: 'shapes', 
    title: 'Shapes', 
    icon: '★', 
    colorClass: 'from-rose-400 to-pink-600',
    path: '/shapes' 
  }
];

export default function CategoriesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-200 via-cyan-100 to-purple-200 p-6">
      <NavBar themeColor="text-indigo-900" />
      
      <header className="text-center mt-10 mb-10">
        <h1 className="text-5xl md:text-7xl font-extrabold text-indigo-900 tracking-tight drop-shadow-lg">
          Choose a Category
        </h1>
        <p className="text-xl md:text-2xl text-indigo-700 font-medium mt-4">
          What would you like to trace today?
        </p>
      </header>

      <div className="bg-white/30 backdrop-blur-xl p-8 md:p-12 rounded-[50px] shadow-2xl max-w-6xl w-full border border-white/40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((category) => (
            <TracingCard
              key={category.id}
              icon={category.icon}
              title={category.title}
              colorClass={category.colorClass}
              onClick={() => navigate(category.path)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}