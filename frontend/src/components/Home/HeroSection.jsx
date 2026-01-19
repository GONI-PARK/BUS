import { Link } from 'react-router-dom';
import BusBackground from '../../assets/BusBackground.png';

export default function HeroSection() {
  return (
    <section className="relative isolate px-6 lg:px-8">
      {/* Hero Section */}
      <img
        src={BusBackground}
        alt="Bus Background"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      <div className="mx-20 max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-left">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
            全国のバス会社
            <br />
            無料で会える
          </h1>
          <p className="mt-2 text-lg font-medium text-pretty text-zinc-300 sm:text-xl/8">
            カリバスで、バス手配はもっと簡単に。
            <br />
            国内のバス会社を、無料でスムーズに見積もり・比較。
          </p>
          <div className="mt-10 flex items-center justify-left gap-x-6">
            <Link
              href="#"
              to="/inputpage1"
              className="rounded-md bg-indigo-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              見積もりはこちら
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
