import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/layout/Layout';

function Placeholder({ name }: { name: string }) {
  return (
    <section className="container-prose section">
      <h1 className="text-4xl">{name}</h1>
      <p className="mt-4 text-warmgray-700">Coming soon.</p>
    </section>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Placeholder name="Home" />} />
        <Route path="/services" element={<Placeholder name="Services" />} />
        <Route path="/about" element={<Placeholder name="About" />} />
        <Route path="/gallery" element={<Placeholder name="Gallery" />} />
        <Route path="/contact" element={<Placeholder name="Contact" />} />
        <Route path="/faq" element={<Placeholder name="FAQ" />} />
        <Route path="*" element={<Placeholder name="Page not found" />} />
      </Route>
    </Routes>
  );
}
