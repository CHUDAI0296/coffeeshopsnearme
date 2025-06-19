import KeywordFilter from '@/components/KeywordFilter';
import dynamic from 'next/dynamic';

const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

export default function Explore() {
  return (
    <>
      <MapView />
      <KeywordFilter />
    </>
  );
} 