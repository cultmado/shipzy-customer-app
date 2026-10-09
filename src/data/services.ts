import pabiliImg from '@/assets/images/pabili.png';
import parcelImg from '@/assets/images/parcel.png';
import vehicleImg from '@/assets/images/vehicle.png';

export type ServiceKey = 'pabili' | 'parcel' | 'vehicle';

export interface ServiceMeta {
  key: ServiceKey;
  name: string;
  image: string;
  /** Tailwind classes for the service accent */
  accentText: string;
  accentBg: string;
  tintBg: string;
  tintBorder: string;
  bookRoute: string;
}

export const services: Record<ServiceKey, ServiceMeta> = {
  pabili: {
    key: 'pabili',
    name: 'Pabili Service',
    image: pabiliImg,
    accentText: 'text-pabili',
    accentBg: 'bg-pabili',
    tintBg: 'bg-pabili-light',
    tintBorder: 'border-blue-200',
    bookRoute: '/book/pabili',
  },
  parcel: {
    key: 'parcel',
    name: 'Parcel & Cargo',
    image: parcelImg,
    accentText: 'text-parcel',
    accentBg: 'bg-parcel',
    tintBg: 'bg-parcel-light',
    tintBorder: 'border-green-200',
    bookRoute: '/book/parcel',
  },
  vehicle: {
    key: 'vehicle',
    name: 'Vehicle Request',
    image: vehicleImg,
    accentText: 'text-vehicle',
    accentBg: 'bg-vehicle',
    tintBg: 'bg-vehicle-light',
    tintBorder: 'border-orange-200',
    bookRoute: '/book/vehicle',
  },
};

export function formatPeso(amount: number): string {
  return '₱' + amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
