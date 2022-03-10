import MenuBar from '../../components/MenuBar/MenuBar';
import './DashboardLayout.css';

export default function DashboardLayout({ children }) {
  return (
    <div className="Container-root">
      <MenuBar />
      <main>
        {children}
      </main>
    </div>
  );
}
