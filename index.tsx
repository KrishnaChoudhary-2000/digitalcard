
import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';

// =================================================================================
// TYPES (from types.ts)
// =================================================================================

interface SocialLink {
  url: string;
  enabled: boolean;
}

interface Socials {
  linkedin: SocialLink;
  instagram: SocialLink;
  twitter: SocialLink;
  youtube: SocialLink;
  facebook: SocialLink;
  whatsapp: SocialLink;
}

interface StyleOptions {
  accentColor: string;
}

interface ExecutiveData {
  id: string;
  cardName: string;
  name: string;
  title: string;
  companyName: string;
  companyWebsite: string;
  phone: string;
  email: string;
  address: string;
  addressLink: string;
  calendlyLink: string;
  socials: Socials;
  profilePictureUrl?: string;
  companyLogoUrl?: string;
  companyLogoPosition: { x: number, y: number }; // x, y in percentage
  companyLogoSize: number; // width in pixels
  cardBackLogoUrl?: string;
  cardBackLogoSize: number; // width in pixels
  styleOptions: StyleOptions;
  meetingButtonText: string;
  saveContactButtonText: string;
}

// =================================================================================
// CONSTANTS & ICONS (from constants.tsx)
// =================================================================================

const executiveData: ExecutiveData = {
  id: `card-${Date.now()}`,
  cardName: "Default Profile",
  name: "Atul Gupta",
  title: "Founder & CEO, Multisteer & Glydus",
  companyName: "Glydus",
  companyWebsite: "https://glydus.com/",
  profilePictureUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=250&h=250&fit=crop&crop=faces",
  phone: "+919876543210",
  email: "atul.gupta@multisteer.com",
  address: "Nagpur, Maharashtra, India",
  addressLink: "https://maps.google.com/?q=Nagpur,+Maharashtra,+India",
  calendlyLink: "https://calendly.com/your-link",
  socials: {
    linkedin: { url: "https://www.linkedin.com/in/atul-gupta-904bb7127/", enabled: true },
    instagram: { url: "https://www.instagram.com/atulgupta_1504?igsh=MXRrZ3l2NmVzdmZiag==", enabled: true },
    twitter: { url: "https://x.com/Glydus_IN", enabled: true },
    youtube: { url: "https://www.youtube.com/@Glydus", enabled: true },
    facebook: { url: "https://www.facebook.com/share/16bWt5DqJ6/", enabled: true },
    whatsapp: { url: "https://wa.me/919876543210", enabled: true },
  },
  styleOptions: {
    accentColor: '#00F0B5',
  },
  meetingButtonText: 'Book Meeting',
  saveContactButtonText: 'Save Contact',
  companyLogoUrl: undefined,
  companyLogoPosition: { x: 50, y: 50 },
  companyLogoSize: 140,
  cardBackLogoUrl: undefined,
  cardBackLogoSize: 160,
};

const GlydusLogo: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`flex items-center gap-3 ${className}`}>
        <svg width="28" height="32" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1_2_glydus)">
            <path d="M11.5312 0L23.0625 6.66667V20L11.5312 26.6667L0 20V6.66667L11.5312 0Z" fill="url(#paint0_linear_1_2_glydus)"></path>
            <path d="M11.5312 3.11133L2.24997 8.33355V18.5558L11.5312 23.778L20.8125 18.5558V8.33355L11.5312 3.11133Z" fill="url(#paint1_linear_1_2_glydus)"></path>
            <path d="M12.9167 15.6558C12.9167 16.5113 12.2334 17.2224 11.4028 17.2224C10.5723 17.2224 9.88892 16.5113 9.88892 15.6558V11.2224H12.9167V15.6558Z" fill="white"></path>
            <path d="M16.5972 11.2222H11.4028V8.77777C11.4028 7.22222 12.9167 6.66666 14.1667 6.66666C15.4167 6.66666 16.5972 7.22222 16.5972 8.77777V11.2222Z" fill="white"></path>
            </g>
            <defs>
            <linearGradient id="paint0_linear_1_2_glydus" x1="11.5312" y1="0" x2="11.5312" y2="26.6667" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00B8D4"></stop>
            <stop offset="1" stopColor="#00F0B5"></stop>
            </linearGradient>
            <linearGradient id="paint1_linear_1_2_glydus" x1="11.5312" y1="3.11133" x2="11.5312" y2="23.778" gradientUnits="userSpaceOnUse">
            <stop stopColor="#007BFF"></stop>
            <stop offset="1" stopColor="#00D1A6"></stop>
            </linearGradient>
            <clipPath id="clip0_1_2_glydus">
            <path d="M11.5312 0L23.0625 6.66667V20L11.5312 26.6667L0 20V6.66667L11.5312 0Z" fill="white"></path>
            </clipPath>
            </defs>
        </svg>
        <span className="text-3xl font-bold text-white tracking-wider">GLYDUS</span>
    </div>
);

const MantaRayLogo: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path 
                d="M50 10 C 45 20, 20 25, 10 45 C 15 65, 30 80, 50 90 C 70 80, 85 65, 90 45 C 80 25, 55 20, 50 10 Z M 47 15 C 47.5 14, 47.5 12, 47 11 C 46.5 10, 45 12, 46 14 C 47 16, 47 16, 47 15 Z M 53 15 C 52.5 14, 52.5 12, 53 11 C 53.5 10, 55 12, 54 14 C 53 16, 53 16, 53 15 Z"
                fill="currentColor"
            />
        </svg>
    );
};

const SaveContactIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} style={style}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
);
  
const PhoneIcon: React.FC<{className?: string; style?: React.CSSProperties}> = ({ className, style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const EmailIcon: React.FC<{className?: string; style?: React.CSSProperties}> = ({ className, style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LocationIcon: React.FC<{className?: string; style?: React.CSSProperties}> = ({ className, style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const FacebookIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
  </svg>
);

const LinkedInIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.359 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.359-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.359-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />
  </svg>
);

const WhatsAppIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.521.074-.792.372c-.272.296-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
  </svg>
);


const XIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 7.184L18.901 1.153ZM17.61 20.644h2.039L6.486 3.24H4.298l11.312 17.404Z"></path>
  </svg>
);

const YouTubeIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
  </svg>
);

const CalendarIcon: React.FC<{className?: string; style?: React.CSSProperties}> = ({ className, style }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} style={style}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18" />
    </svg>
);

const ChevronRightIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

const PlusIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

const TrashIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.036-2.134H8.716c-1.126 0-2.036.954-2.036 2.134v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);


// =================================================================================
// APPLICATION COMPONENTS (from App.tsx)
// =================================================================================

const EyeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
);

const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
    </svg>
);

const PencilIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
    </svg>
);

const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5 .124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m9.75 0h-3.25a2.25 2.25 0 00-2.25 2.25v4.5a2.25 2.25 0 002.25 2.25h3.25" />
    </svg>
);

const LoadingSpinner: React.FC = () => (
  <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const generateVCardString = (vcfData: ExecutiveData): string => {
  let vCard = `BEGIN:VCARD\nVERSION:3.0\n`;
  const nameParts = vcfData.name.split(' ');
  const lastName = nameParts.pop() || '';
  const firstName = nameParts.join(' ');
  
  vCard += `N:${lastName};${firstName};;;\n`;
  vCard += `FN:${vcfData.name}\n`;
  vCard += `ORG:${vcfData.companyName}\n`;
  vCard += `TITLE:${vcfData.title}\n`;
  vCard += `TEL;TYPE=WORK,VOICE:${vcfData.phone}\n`;
  vCard += `EMAIL:${vcfData.email}\n`;
  vCard += `ADR;TYPE=WORK:;;${vcfData.address}\n`;
  if (vcfData.companyWebsite) vCard += `URL:${vcfData.companyWebsite}\n`;
  
  if (vcfData.profilePictureUrl && vcfData.profilePictureUrl.startsWith('data:image/')) {
      const mimeMatch = vcfData.profilePictureUrl.match(/:(.*?);/);
      const mimeType = mimeMatch ? mimeMatch[1].toUpperCase().replace('JPEG', 'JPG') : 'JPEG';
      const base64Data = vcfData.profilePictureUrl.split(',')[1];
      vCard += `PHOTO;ENCODING=b;TYPE=${mimeType}:${base64Data}\n`;
  }

  if (vcfData.socials.linkedin.enabled && vcfData.socials.linkedin.url) vCard += `X-SOCIALPROFILE;type=linkedin:${vcfData.socials.linkedin.url}\n`;
  if (vcfData.socials.twitter.enabled && vcfData.socials.twitter.url) vCard += `X-SOCIALPROFILE;type=twitter:${vcfData.socials.twitter.url}\n`;
  if (vcfData.socials.instagram.enabled && vcfData.socials.instagram.url) vCard += `X-SOCIALPROFILE;type=instagram:${vcfData.socials.instagram.url}\n`;
  
  vCard += `END:VCARD`;
  return vCard;
};

const CardPreview: React.FC<{ data: ExecutiveData | null; onUpdate: (updates: Partial<ExecutiveData>) => void; }> = ({ data, onUpdate }) => {
  if (!data) {
    return (
      <div className="bg-brand-card rounded-3xl shadow-2xl p-6 md:p-8 w-full max-w-sm mx-auto flex items-center justify-center font-sans text-gray-400 h-full">
        No card selected. Please select or create a card to see the preview.
      </div>
    );
  }
  
  const { name, title, companyWebsite, profilePictureUrl, companyLogoUrl, socials, styleOptions } = data;

  const formattedPhone = data.phone.startsWith('+91')
    ? data.phone.replace(/^\+(\d{2})(\d{5})(\d{5})/, '+$1 $2 $3')
    : data.phone;

  const buttonStyle = { '--accent-color': styleOptions.accentColor } as React.CSSProperties;
  const actionButtonClasses = "flex items-center justify-between w-full p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-card focus:ring-[--accent-color]";


  const showSocialsSection = Object.values(socials).some(link => link.enabled && link.url);
  
  const handleSaveContact = () => {
    if (!data) return;
    const vCardString = generateVCardString(data);
    const blob = new Blob([vCardString], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.name.replace(/ /g, '_')}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const ContactRow = ({ href, icon, text, ariaLabel }: { href?: string; icon: React.ReactNode; text: string; ariaLabel: string }) => {
    const content = (
        <div className="flex items-center space-x-4 group p-3">
            <div className="flex-shrink-0 w-6 flex items-center justify-center">
                {icon}
            </div>
            <div className="flex-grow min-w-0 text-gray-200 break-words font-medium">
                {text}
            </div>
        </div>
    );
    
    if (href) {
        return <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} className="block rounded-lg transition-colors">{content}</a>;
    }
    return <div aria-label={ariaLabel} className="rounded-lg">{content}</div>;
  };
  
  return (
    <div className="relative bg-brand-card bg-gradient-to-b from-brand-card to-black rounded-3xl shadow-2xl w-full max-w-sm mx-auto transition-all duration-500 font-sans overflow-hidden" style={buttonStyle}>
      <header 
          className="relative h-24"
      >
        <a
          href={companyWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute transition-transform duration-300 hover:scale-105"
          style={{
            left: `${data.companyLogoPosition.x}%`,
            top: `${data.companyLogoPosition.y}%`,
            transform: 'translate(-50%, -50%)',
            width: `${data.companyLogoSize}px`,
          }}
        >
          {companyLogoUrl ? (
            <img src={companyLogoUrl} alt={`${data.companyName} logo`} className="max-h-[80px] w-full object-contain pointer-events-none" />
          ) : (
            <div className="pointer-events-none"><GlydusLogo /></div>
          )}
        </a>
      </header>
      
      <div className="relative p-6 md:p-8 pt-0 -mt-10">
        <div className="relative z-10">
            {profilePictureUrl && (
                <div className="flex justify-center mb-6">
                    <img 
                    src={profilePictureUrl} 
                    alt={`Profile of ${name}`} 
                    className="w-36 h-36 rounded-full object-cover shadow-2xl ring-4 ring-white/10"
                    />
                </div>
            )}

            <section className={`text-center mb-6 ${!profilePictureUrl ? 'pt-8' : ''}`}>
                <h1 className="text-4xl font-bold text-white tracking-tight">{name}</h1>
                <p className="text-sm mt-3 font-medium text-gray-400 tracking-widest uppercase">{title}</p>
            </section>
        </div>


        <div className="flex flex-col gap-3 mb-8">
            <a href={data.calendlyLink} target="_blank" rel="noopener noreferrer" className={actionButtonClasses}>
                <div className="flex items-center gap-4">
                    <CalendarIcon className="w-6 h-6" style={{color: styleOptions.accentColor}} />
                    <span className="font-semibold text-white">{data.meetingButtonText}</span>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-gray-500" />
            </a>
            <button onClick={handleSaveContact} className={actionButtonClasses}>
                <div className="flex items-center gap-4">
                    <SaveContactIcon className="w-6 h-6" style={{color: styleOptions.accentColor}} />
                    <span className="font-semibold text-white">{data.saveContactButtonText}</span>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-gray-500" />
            </button>
        </div>

        <section className="rounded-xl overflow-hidden">
            <ContactRow 
            href={`tel:${data.phone}`}
            icon={<PhoneIcon className="w-5 h-5" style={{color: styleOptions.accentColor}} />}
            text={formattedPhone}
            ariaLabel={`Call ${name}`}
            />
            <div className="h-px bg-white/10"></div>
            <ContactRow 
            href={`mailto:${data.email}`}
            icon={<EmailIcon className="w-5 h-5" style={{color: styleOptions.accentColor}} />}
            text={data.email}
            ariaLabel={`Email ${name}`}
            />
            <div className="h-px bg-white/10"></div>
            <ContactRow 
            href={data.addressLink}
            icon={<LocationIcon className="w-5 h-5" style={{color: styleOptions.accentColor}} />}
            text={data.address}
            ariaLabel={`Location: ${data.address}`}
            />
        </section>

        {showSocialsSection && (
            <>
            <div className="my-6 pb-2"></div>
            
            <section className="flex justify-center items-center flex-wrap gap-x-6 gap-y-4">
                {socials.linkedin.enabled && socials.linkedin.url && <a href={socials.linkedin.url} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s LinkedIn Profile`} className="text-[#0077B5] transition-opacity duration-300 hover:opacity-75"> <LinkedInIcon className="w-8 h-8" /> </a>}
                {socials.instagram.enabled && socials.instagram.url && <a href={socials.instagram.url} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s Instagram Profile`} className="text-[#E1306C] transition-opacity duration-300 hover:opacity-75"> <InstagramIcon className="w-8 h-8" /> </a>}
                {socials.whatsapp.enabled && socials.whatsapp.url && <a href={socials.whatsapp.url} target="_blank" rel="noopener noreferrer" aria-label={`Contact ${name} on WhatsApp`} className="text-[#25D366] transition-opacity duration-300 hover:opacity-75"> <WhatsAppIcon className="w-8 h-8" /> </a>}
                {socials.facebook.enabled && socials.facebook.url && <a href={socials.facebook.url} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s Facebook Profile`} className="text-[#1877F2] transition-opacity duration-300 hover:opacity-75"> <FacebookIcon className="w-8 h-8" /> </a>}
                {socials.twitter.enabled && socials.twitter.url && <a href={socials.twitter.url} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s X Profile`} className="text-white transition-opacity duration-300 hover:opacity-75"> <XIcon className="w-7 h-7" /> </a>}
                {socials.youtube.enabled && socials.youtube.url && <a href={socials.youtube.url} target="_blank" rel="noopener noreferrer" aria-label={`${name}'s YouTube Channel`} className="text-[#FF0000] transition-opacity duration-300 hover:opacity-75"> <YouTubeIcon className="w-8 h-8" /> </a>}
            </section>
            </>
        )}
        <div className="pt-8 text-center text-xs font-semibold text-gray-500 tracking-widest uppercase">
          STEER THE WAVES
        </div>
      </div>
    </div>
  );
};

const CardBack: React.FC<{ data: ExecutiveData | null }> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="w-full h-full card-face card-back flex flex-col items-center justify-center p-8 text-center text-white font-sans bg-brand-card bg-gradient-to-b from-brand-card to-black">
      <div className="flex-grow flex flex-col items-center justify-center">
        {data.cardBackLogoUrl ? (
          <img 
            src={data.cardBackLogoUrl} 
            alt="Custom Card Back Logo" 
            className="object-contain"
            style={{ width: `${data.cardBackLogoSize}px`, height: `${data.cardBackLogoSize}px` }}
          />
        ) : null}
      </div>
      <div className="text-xs font-semibold text-gray-500 tracking-widest uppercase">
        STEER THE WAVES
      </div>
    </div>
  );
};

const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <details open className="bg-gray-900/50 border border-white/10 rounded-lg overflow-hidden">
    <summary className="px-6 py-4 text-lg font-semibold text-white cursor-pointer hover:bg-white/5 list-none flex justify-between items-center">
      {title}
      <span className="text-gray-400 transition-transform duration-300 transform-gpu">▼</span>
    </summary>
    <div className="px-6 py-5 border-t border-white/10 space-y-4">
      {children}
    </div>
  </details>
);

const InputField = React.forwardRef<
  HTMLInputElement,
  {
    label: string;
    name: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
  }
>(({ label, name, type = 'text', ...props }, ref) => (
  <div>
    <label htmlFor={name} className={`block text-sm font-medium text-gray-300 mb-1 ${props.disabled ? 'opacity-50' : ''}`}>{label}</label>
    <input 
        id={name} 
        name={name} 
        type={type} 
        ref={ref} 
        {...props} 
        className="w-full bg-gray-900 text-white border border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition disabled:opacity-50 disabled:cursor-not-allowed" />
  </div>
));
InputField.displayName = "InputField";

const InteractivePreviewModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  data: ExecutiveData | null;
  onUpdate: (updates: Partial<ExecutiveData>) => void;
}> = ({ isOpen, onClose, data, onUpdate }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };
  
  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };

    setRotation(prev => {
        const newY = prev.y + deltaX * 0.5;
        const newX = Math.max(-45, Math.min(45, prev.x - deltaY * 0.5));
        return { x: newX, y: newY };
    });
  };
  
  const handleMouseLeave = () => {
    isDragging.current = false;
  };
  
  const toggleFlip = () => {
    setIsFlipped(prev => !prev);
  };

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setIsFlipped(false);
        setRotation({ x: 0, y: 0 });
      }, 500);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50 flex flex-col items-center justify-center font-sans overflow-hidden" 
        onClick={onClose}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
    >
        <div 
          className="relative perspective-container animate-fade-in-up"
          onClick={e => e.stopPropagation()}
          onDoubleClick={toggleFlip}
          onMouseDown={handleMouseDown}
        >
          <div className="modal-glow"></div>
          <div
            ref={cardRef}
            className="relative w-[384px] h-[720px] card-3d"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y + (isFlipped ? 180 : 0)}deg)`
            }}
          >
            <div className="card-face card-front">
              <CardPreview data={data} onUpdate={onUpdate} />
            </div>
            <CardBack data={data} />
          </div>
        </div>
        <button onClick={onClose} className="absolute top-6 right-6 bg-white/10 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50">&times;</button>
        <div className="absolute bottom-6 flex flex-col items-center gap-4">
            <button
              onClick={(e) => { e.stopPropagation(); toggleFlip(); }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-2 px-6 rounded-lg transition-all hover:bg-white/20"
            >
              {isFlipped ? 'Flip to Front' : 'Flip to Back'}
            </button>
            <div className="text-white/50 text-sm">
                Drag to rotate &nbsp;&bull;&nbsp; Double-click or use button to flip
            </div>
        </div>
    </div>
  );
};


const CreateCardModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
}> = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreate(name.trim());
      setName('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center font-sans">
      <div className="bg-brand-card border border-white/10 rounded-2xl shadow-2xl p-8 w-full max-w-md m-4 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-white mb-6">Create a New Digital Card</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Card Name"
            name="newCardName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., John Doe's Profile"
          />
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold py-2 px-6 rounded-lg transition disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              Create Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ConfirmDeleteModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cardName: string;
}> = ({ isOpen, onClose, onConfirm, cardName }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center font-sans">
      <div className="bg-brand-card border border-white/10 rounded-2xl shadow-2xl p-8 w-full max-w-md m-4 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-white mb-4">Confirm Deletion</h2>
        <p className="text-gray-300 mb-8">
          Are you sure you want to delete the card "<strong>{cardName}</strong>"? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const ShareModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  url: string;
}> = ({ isOpen, onClose, url }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCopied(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center font-sans" onClick={onClose}>
      <div className="bg-brand-card border border-white/10 rounded-2xl shadow-2xl p-8 w-full max-w-lg m-4 animate-fade-in-up" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <ShareIcon className="w-6 h-6 text-brand-accent" />
            Shareable Link
          </h2>
          <button onClick={onClose} className="text-gray-400 text-3xl leading-none hover:text-white transition-colors">&times;</button>
        </div>
        
        <div className="bg-green-900/50 border border-green-700 text-green-200 text-sm rounded-lg p-4 mb-6">
          <p><strong className="font-semibold">Your card is live on Vercel!</strong> Anyone with this link can view your digital card. To ensure the link is fast and shareable, images are not included.</p>
        </div>

        <p className="text-gray-300 mb-2 font-medium">Your shareable URL:</p>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={url}
            className="w-full bg-gray-900 text-gray-300 border border-gray-600 rounded-md px-3 py-2 select-all"
          />
          <button
            onClick={handleCopy}
            className="flex-shrink-0 flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-5 rounded-lg transition"
          >
            <CopyIcon className="w-5 h-5" />
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Toast: React.FC<{ message: string; show: boolean; onClose: () => void; type?: 'success' | 'error' }> = ({ message, show, onClose, type = 'success' }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  const bgColor = type === 'success' ? 'bg-green-600' : 'bg-red-600';

  return (
    <div className={`fixed bottom-5 right-5 z-[100] transition-all duration-300 ease-out ${ show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full' }`}>
      <div className={`${bgColor} text-white font-bold rounded-lg shadow-2xl px-6 py-3`}>
        {message}
      </div>
    </div>
  );
};

const PublicCardPage: React.FC<{ data: ExecutiveData }> = ({ data }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const toggleFlip = () => setIsFlipped(prev => !prev);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 bg-brand-dark font-sans">
      <div className="relative perspective-container">
        <div
          className="relative w-[384px] h-[720px] card-3d"
          style={{
            transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
          }}
        >
          <div className="card-face card-front">
            <CardPreview data={data} onUpdate={() => {}} />
          </div>
          <CardBack data={data} />
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center gap-4">
        <button
          onClick={toggleFlip}
          className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-2 px-6 rounded-lg transition-all hover:bg-white/20"
        >
          {isFlipped ? 'Flip to Front' : 'Flip to Back'}
        </button>
      </div>
      <a href="https://vercel.com?utm_source=digital_card_creator" target="_blank" rel="noopener noreferrer" className="absolute bottom-5 text-gray-500 text-xs hover:text-white transition-colors">
          Hosted on ▲ Vercel
      </a>
    </div>
  );
};

const App: React.FC = () => {
  const [publicCardData, setPublicCardData] = useState<ExecutiveData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [savedCards, setSavedCards] = useState<ExecutiveData[]>([]);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [cardData, setCardData] = useState<ExecutiveData | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState<string | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
  const [cardBackLogoPreview, setCardBackLogoPreview] = useState<string | null>(null);
  const [companyLogoPreview, setCompanyLogoPreview] = useState<string | null>(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' as 'success' | 'error' });
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareableUrl, setShareableUrl] = useState('');
  const [isTestingPublicView, setIsTestingPublicView] = useState(false);
  const [isEditorPreviewFlipped, setIsEditorPreviewFlipped] = useState(false);
  
  const draggedItem = useRef<string | null>(null);
  const dragOverItem = useRef<string | null>(null);


  // Check for public card data in URL on initial load
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const cardDataParam = urlParams.get('card');
    if (cardDataParam) {
      try {
        const decodedJson = decodeURIComponent(cardDataParam);
        const parsedData = JSON.parse(decodedJson);
        setPublicCardData(parsedData);
      } catch (e) {
        console.error("Failed to parse card data from URL:", e);
        // Fallback to admin view if parsing fails
      }
    }
  }, []);

  // Load cards from localStorage on initial mount for admin view
  useEffect(() => {
    // Only run if not in public card view mode
    if (publicCardData) return;
    try {
      const storedCards = localStorage.getItem('savedDigitalCards');
      if (storedCards) {
        const parsedCards: ExecutiveData[] = JSON.parse(storedCards);
        setSavedCards(parsedCards.map(c => ({...executiveData, ...c}))); // ensure new fields have defaults
        if (parsedCards.length > 0) {
          setActiveCardId(parsedCards[0].id);
        }
      } else {
        // If no cards are stored, initialize with the default one
        setSavedCards([executiveData]);
        setActiveCardId(executiveData.id);
      }
    } catch (error) {
      console.error("Failed to parse cards from localStorage", error);
      setSavedCards([executiveData]);
      setActiveCardId(executiveData.id);
    }
  }, [publicCardData]);

  // Persist cards to localStorage whenever they change
  useEffect(() => {
    if (savedCards.length > 0) {
      localStorage.setItem('savedDigitalCards', JSON.stringify(savedCards));
    } else {
      localStorage.removeItem('savedDigitalCards');
    }
  }, [savedCards]);
  
  // Update form data when active card changes
  useEffect(() => {
    const activeCard = savedCards.find(card => card.id === activeCardId);
    setCardData(activeCard || null);
    setProfilePicPreview(activeCard?.profilePictureUrl || null);
    setCardBackLogoPreview(activeCard?.cardBackLogoUrl || null);
    setCompanyLogoPreview(activeCard?.companyLogoUrl || null);
  }, [activeCardId, savedCards]);

  if (publicCardData) {
    return <PublicCardPage data={publicCardData} />;
  }

  if (isTestingPublicView) {
    return (
      <div className="relative min-h-screen">
        <PublicCardPage data={cardData!} />
        <button
          onClick={() => setIsTestingPublicView(false)}
          className="fixed top-4 right-4 bg-gray-900/80 backdrop-blur-lg border border-white/10 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg transition shadow-lg z-[101] flex items-center gap-2"
        >
          <PencilIcon className="w-5 h-5" />
          Return to Editor
        </button>
      </div>
    );
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameRef.current?.value === 'admin' && passwordRef.current?.value === 'password') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid credentials. Use admin/password.');
    }
  };
  
  const handleCardDataChange = (updates: Partial<ExecutiveData>) => {
    setCardData(prev => (prev ? { ...prev, ...updates } : null));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    
    setCardData(prev => {
      if (!prev) return null;
      const newState = JSON.parse(JSON.stringify(prev));
      let current = newState;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newState;
    });
  };
  
  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const keys = name.split('.');

    setCardData(prev => {
        if (!prev) return null;
        const newState = JSON.parse(JSON.stringify(prev));
        
        if (keys.length > 1) {
            let current = newState;
            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) current[keys[i]] = {};
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = checked;
        } else {
            (newState as any)[name] = checked;
        }
        return newState;
    });
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCardData(prev => prev ? {...prev, profilePictureUrl: result} : null);
        setProfilePicPreview(result);
      }
      reader.readAsDataURL(file);
    }
  };

    const handleCompanyLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            setCardData(prev => prev ? {...prev, companyLogoUrl: result} : null);
            setCompanyLogoPreview(result);
          }
          reader.readAsDataURL(file);
        }
    };

    const handleRemoveCompanyLogo = () => {
        setCardData(prev => prev ? {...prev, companyLogoUrl: undefined} : null);
        setCompanyLogoPreview(null);
    };

    const handleCardBackLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onloadend = () => {
            const result = reader.result as string;
            setCardData(prev => prev ? {...prev, cardBackLogoUrl: result} : null);
            setCardBackLogoPreview(result);
          }
          reader.readAsDataURL(file);
        }
    };

    const handleRemoveCardBackLogo = () => {
        setCardData(prev => prev ? {...prev, cardBackLogoUrl: undefined} : null);
        setCardBackLogoPreview(null);
    };
  
  const handleSaveChanges = () => {
    if (!cardData) return;
    setSavedCards(prev => prev.map(card => card.id === activeCardId ? cardData : card));
    setToast({ show: true, message: 'Changes saved!', type: 'success' });
  };
  
  const handleResetChanges = () => {
    const activeCard = savedCards.find(card => card.id === activeCardId);
    setCardData(activeCard || null);
    setProfilePicPreview(activeCard?.profilePictureUrl || null);
    setCardBackLogoPreview(activeCard?.cardBackLogoUrl || null);
    setCompanyLogoPreview(activeCard?.companyLogoUrl || null);
  };
  
  const handleCreateCard = (newCardName: string) => {
    const newCard: ExecutiveData = {
      ...executiveData,
      id: `card-${Date.now()}`,
      cardName: newCardName,
      name: 'New Profile',
      title: 'New Title',
    };
    setSavedCards(prev => [...prev, newCard]);
    setActiveCardId(newCard.id);
    setIsCreateModalOpen(false);
  };

  const handleDeleteCard = (idToDelete: string) => {
    setCardToDelete(idToDelete);
  };
  
  const confirmDeleteCard = () => {
    if (!cardToDelete) return;
    
    const remainingCards = savedCards.filter(card => card.id !== cardToDelete);
    setSavedCards(remainingCards);

    if (activeCardId === cardToDelete) {
      setActiveCardId(remainingCards.length > 0 ? remainingCards[0].id : null);
    }
    setCardToDelete(null);
  };

  const handleShareCard = () => {
    if (!cardData) return;
    try {
        // Create a deep copy of the card data to avoid modifying the live state.
        const dataToShare: ExecutiveData = JSON.parse(JSON.stringify(cardData));

        // Remove large image data (base64 URLs) to prevent the generated URL
        // from becoming too long, which causes browser errors. The shared card
        // will not include the images, but all other info will be preserved.
        delete dataToShare.profilePictureUrl;
        delete dataToShare.cardBackLogoUrl;
        delete dataToShare.companyLogoUrl;

        const jsonString = JSON.stringify(dataToShare);
        const encodedData = encodeURIComponent(jsonString);
        const baseUrl = window.location.href.split('?')[0].split('#')[0];
        const url = `${baseUrl}?card=${encodedData}`;
        
        setShareableUrl(url);
        setIsShareModalOpen(true);
    } catch (e) {
        console.error("Failed to create shareable link:", e);
        setToast({ show: true, message: 'Could not create link.', type: 'error' });
    }
  };
  
  const handleDragSort = () => {
    if (draggedItem.current === null || dragOverItem.current === null) return;
    if (draggedItem.current === dragOverItem.current) return;

    setSavedCards(prev => {
        const cards = [...prev];
        const draggedItemIndex = cards.findIndex(c => c.id === draggedItem.current);
        const dragOverItemIndex = cards.findIndex(c => c.id === dragOverItem.current);
        
        const [reorderedItem] = cards.splice(draggedItemIndex, 1);
        cards.splice(dragOverItemIndex, 0, reorderedItem);
        
        return cards;
    });

    draggedItem.current = null;
    dragOverItem.current = null;
  };


  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans">
        <div className="w-full max-w-md">
          <form onSubmit={handleLogin} className="bg-brand-card/70 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 space-y-6">
            <h1 className="text-2xl font-bold text-center text-white">Glydus Admin Login</h1>
            {error && <p className="text-red-400 text-sm text-center bg-red-900/50 p-2 rounded-md">{error}</p>}
            <InputField name="username" label="Username" placeholder="admin" ref={usernameRef}/>
            <InputField name="password" label="Password" type="password" placeholder="password" ref={passwordRef} />
            <button type="submit" className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-2 px-4 rounded-lg transition duration-300">Login</button>
          </form>
        </div>
      </div>
    );
  }

  const editorDisabled = !cardData;
  const cardToDeleteDetails = savedCards.find(c => c.id === cardToDelete);
  const currentAccentColor = cardData?.styleOptions?.accentColor || '#000000';

  return (
    <div className="min-h-screen font-sans text-white bg-brand-dark">
      <header className="bg-gray-900/80 backdrop-blur-lg border-b border-white/10 p-4 flex justify-between items-center sticky top-0 z-20">
        <h1 className="text-xl font-bold">Glydus Card Dashboard</h1>
        <div className="flex items-center gap-2">
            <button 
                onClick={handleShareCard} 
                disabled={editorDisabled}
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 lg:px-2 rounded-lg transition disabled:opacity-50"
                title="Copy Shareable Link"
            >
                <ShareIcon className="w-5 h-5" />
                <span className="hidden sm:inline lg:hidden">Share</span>
            </button>
            <button 
                onClick={() => setIsPreviewModalOpen(true)} 
                disabled={editorDisabled}
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 lg:px-2 rounded-lg transition disabled:opacity-50"
                title="Interactive Preview"
            >
              <EyeIcon className="w-5 h-5" />
              <span className="hidden sm:inline lg:hidden">Preview</span>
          </button>
          <button 
                onClick={() => setIsTestingPublicView(true)} 
                disabled={editorDisabled}
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 lg:px-2 rounded-lg transition disabled:opacity-50"
                title="Test Live View"
            >
                <PlayIcon className="w-5 h-5" />
                <span className="hidden sm:inline lg:hidden">Test</span>
            </button>
          <button onClick={handleSaveChanges} disabled={editorDisabled} className="bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold py-2 px-4 rounded-lg transition disabled:bg-gray-500 disabled:cursor-not-allowed">Save Changes</button>
          <button onClick={handleResetChanges} disabled={editorDisabled} className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50">Reset</button>
        </div>
      </header>
      
      <div className="flex">
        {/* Card Manager Sidebar */}
        <aside className="w-64 bg-gray-900/50 border-r border-white/10 p-4 flex flex-col" style={{height: 'calc(100vh - 69px)'}}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Saved Cards</h2>
            <button onClick={() => setIsCreateModalOpen(true)} title="Create New Card" className="p-2 rounded-md hover:bg-brand-accent/50 transition-colors">
              <PlusIcon className="w-5 h-5"/>
            </button>
          </div>
          <ul className="space-y-1 overflow-y-auto">
            {savedCards.map(card => (
              <li 
                key={card.id}
                draggable
                onDragStart={() => draggedItem.current = card.id}
                onDragEnter={() => dragOverItem.current = card.id}
                onDragEnd={handleDragSort}
                onDragOver={(e) => e.preventDefault()}
                className={`group rounded-md transition-all duration-150 ease-in-out cursor-grab active:cursor-grabbing ${draggedItem.current === card.id ? 'opacity-50 scale-105 shadow-lg' : ''} ${activeCardId === card.id ? 'bg-white/10' : 'hover:bg-white/5'}`}
              >
                  <div className={`flex items-center justify-between p-2 rounded-md transition-colors border-l-4 ${activeCardId === card.id ? 'border-brand-accent' : 'border-transparent'}`}>
                    <span onClick={() => setActiveCardId(card.id)} className="truncate flex-1 pr-2 cursor-pointer">{card.cardName}</span>
                    <button onClick={() => handleDeleteCard(card.id)} title={`Delete ${card.cardName}`} className="p-1 rounded-full text-gray-500 hover:bg-red-500/50 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
              </li>
            ))}
             {savedCards.length === 0 && <p className="text-gray-500 text-sm text-center py-4">No cards yet. Create one!</p>}
          </ul>
        </aside>

        {/* Editor Panel */}
        <main className="flex-1 lg:w-1/2 p-6 space-y-6 overflow-y-auto" style={{maxHeight: 'calc(100vh - 69px)'}}>
          <FormSection title="Profile">
            <InputField label="Card Name" name="cardName" value={cardData?.cardName || ''} onChange={handleInputChange} disabled={editorDisabled} />
            <InputField label="Full Name" name="name" value={cardData?.name || ''} onChange={handleInputChange} disabled={editorDisabled} />
            <InputField label="Designation/Title" name="title" value={cardData?.title || ''} onChange={handleInputChange} disabled={editorDisabled}/>
            <InputField label="Company Name" name="companyName" value={cardData?.companyName || ''} onChange={handleInputChange} disabled={editorDisabled}/>
            <InputField label="Company Website" name="companyWebsite" value={cardData?.companyWebsite || ''} onChange={handleInputChange} disabled={editorDisabled}/>
            <div className="flex items-center gap-4">
              {companyLogoPreview ? (
                <img src={companyLogoPreview} alt="Company Logo Preview" className="h-16 object-contain shadow-md bg-gray-700 p-1 rounded-md" style={{maxHeight: '64px', maxWidth: '128px'}} />
              ) : (
                <div className="h-16 w-16 flex items-center justify-center bg-gray-700 p-1 rounded-md [&_span]:hidden"><GlydusLogo /></div>
              )}
              <div className="flex-grow">
                <label className={`block text-sm font-medium text-gray-300 mb-1 ${editorDisabled ? 'opacity-50' : ''}`}>Company Logo</label>
                <input type="file" accept="image/*" onChange={handleCompanyLogoChange} disabled={editorDisabled} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-accent/80 file:text-white hover:file:bg-brand-accent disabled:opacity-50 disabled:cursor-not-allowed" />
              </div>
              {companyLogoPreview && (
                <button 
                    onClick={handleRemoveCompanyLogo} 
                    className="p-2 rounded-full text-gray-400 hover:bg-red-500/50 hover:text-white transition-colors"
                    title="Remove custom logo"
                >
                    <TrashIcon className="w-5 h-5" />
                </button>
              )}
            </div>
             <div className="pt-4 space-y-4 border-t border-white/10 mt-4">
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-300">Logo Size</label>
                        <span className="text-sm text-gray-400">{cardData?.companyLogoSize || 0}px</span>
                    </div>
                    <input 
                        type="range" 
                        min="30" 
                        max="250" 
                        name="companyLogoSize"
                        value={cardData?.companyLogoSize || 140} 
                        onChange={e => handleCardDataChange({ companyLogoSize: parseInt(e.target.value, 10) })}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-brand-accent [&::-moz-range-thumb]:bg-brand-accent"
                        disabled={editorDisabled}
                    />
                </div>
            </div>
            <div className="flex items-center gap-4 pt-4 border-t border-white/10 mt-4">
              {profilePicPreview && <img src={profilePicPreview} alt="Preview" className="w-16 h-16 rounded-full object-cover shadow-md" />}
              <div className="flex-grow">
                <label className={`block text-sm font-medium text-gray-300 mb-1 ${editorDisabled ? 'opacity-50' : ''}`}>Profile Picture</label>
                <input type="file" accept="image/*" onChange={handleProfilePicChange} disabled={editorDisabled} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-accent/80 file:text-white hover:file:bg-brand-accent disabled:opacity-50 disabled:cursor-not-allowed" />
              </div>
            </div>
          </FormSection>

          <FormSection title="Primary Actions">
            <InputField label="Book Meeting Button Text" name="meetingButtonText" value={cardData?.meetingButtonText || ''} onChange={handleInputChange} disabled={editorDisabled} />
            <InputField label="Meeting URL" name="calendlyLink" value={cardData?.calendlyLink || ''} onChange={handleInputChange} disabled={editorDisabled} />
            <InputField label="Save Contact Button Text" name="saveContactButtonText" value={cardData?.saveContactButtonText || ''} onChange={handleInputChange} disabled={editorDisabled} />
          </FormSection>

          <FormSection title="Contact Info">
            <InputField label="Phone Number" name="phone" value={cardData?.phone || ''} onChange={handleInputChange} disabled={editorDisabled}/>
            <InputField label="Email Address" name="email" value={cardData?.email || ''} onChange={handleInputChange} disabled={editorDisabled}/>
            <InputField label="Location" name="address" value={cardData?.address || ''} onChange={handleInputChange} disabled={editorDisabled}/>
            <InputField label="Location Link (e.g., Google Maps URL)" name="addressLink" value={cardData?.addressLink || ''} onChange={handleInputChange} disabled={editorDisabled}/>
          </FormSection>

          <FormSection title="Social Media">
            <div className="space-y-4">
                <div className="flex items-end gap-3">
                  <div className="flex-grow"><InputField label="LinkedIn URL" name="socials.linkedin.url" value={cardData?.socials?.linkedin?.url || ''} onChange={handleInputChange} disabled={editorDisabled || !cardData?.socials?.linkedin?.enabled} /></div>
                  <div className="flex items-center h-10"><input type="checkbox" title="Enable/Disable LinkedIn" name="socials.linkedin.enabled" checked={cardData?.socials?.linkedin?.enabled ?? false} onChange={handleToggleChange} disabled={editorDisabled} className="h-5 w-5 rounded border-gray-300 text-brand-accent focus:ring-brand-accent disabled:cursor-not-allowed" /></div>
                </div>
                <div className="flex items-end gap-3">
                  <div className="flex-grow"><InputField label="Instagram URL" name="socials.instagram.url" value={cardData?.socials?.instagram?.url || ''} onChange={handleInputChange} disabled={editorDisabled || !cardData?.socials?.instagram?.enabled} /></div>
                  <div className="flex items-center h-10"><input type="checkbox" title="Enable/Disable Instagram" name="socials.instagram.enabled" checked={cardData?.socials?.instagram?.enabled ?? false} onChange={handleToggleChange} disabled={editorDisabled} className="h-5 w-5 rounded border-gray-300 text-brand-accent focus:ring-brand-accent disabled:cursor-not-allowed" /></div>
                </div>
                <div className="flex items-end gap-3">
                  <div className="flex-grow"><InputField label="WhatsApp URL" name="socials.whatsapp.url" value={cardData?.socials?.whatsapp?.url || ''} onChange={handleInputChange} disabled={editorDisabled || !cardData?.socials?.whatsapp?.enabled} /></div>
                  <div className="flex items-center h-10"><input type="checkbox" title="Enable/Disable WhatsApp" name="socials.whatsapp.enabled" checked={cardData?.socials?.whatsapp?.enabled ?? false} onChange={handleToggleChange} disabled={editorDisabled} className="h-5 w-5 rounded border-gray-300 text-brand-accent focus:ring-brand-accent disabled:cursor-not-allowed" /></div>
                </div>
                <div className="flex items-end gap-3">
                  <div className="flex-grow"><InputField label="Facebook URL" name="socials.facebook.url" value={cardData?.socials?.facebook?.url || ''} onChange={handleInputChange} disabled={editorDisabled || !cardData?.socials?.facebook?.enabled} /></div>
                  <div className="flex items-center h-10"><input type="checkbox" title="Enable/Disable Facebook" name="socials.facebook.enabled" checked={cardData?.socials?.facebook?.enabled ?? false} onChange={handleToggleChange} disabled={editorDisabled} className="h-5 w-5 rounded border-gray-300 text-brand-accent focus:ring-brand-accent disabled:cursor-not-allowed" /></div>
                </div>
                <div className="flex items-end gap-3">
                  <div className="flex-grow"><InputField label="X (Twitter) URL" name="socials.twitter.url" value={cardData?.socials?.twitter?.url || ''} onChange={handleInputChange} disabled={editorDisabled || !cardData?.socials?.twitter?.enabled} /></div>
                  <div className="flex items-center h-10"><input type="checkbox" title="Enable/Disable X (Twitter)" name="socials.twitter.enabled" checked={cardData?.socials?.twitter?.enabled ?? false} onChange={handleToggleChange} disabled={editorDisabled} className="h-5 w-5 rounded border-gray-300 text-brand-accent focus:ring-brand-accent disabled:cursor-not-allowed" /></div>
                </div>
                <div className="flex items-end gap-3">
                  <div className="flex-grow"><InputField label="YouTube URL" name="socials.youtube.url" value={cardData?.socials?.youtube?.url || ''} onChange={handleInputChange} disabled={editorDisabled || !cardData?.socials?.youtube?.enabled} /></div>
                  <div className="flex items-center h-10"><input type="checkbox" title="Enable/Disable YouTube" name="socials.youtube.enabled" checked={cardData?.socials?.youtube?.enabled ?? false} onChange={handleToggleChange} disabled={editorDisabled} className="h-5 w-5 rounded border-gray-300 text-brand-accent focus:ring-brand-accent disabled:cursor-not-allowed" /></div>
                </div>
            </div>
          </FormSection>

          <FormSection title="Styling">
            <div className="flex items-center gap-4">
              <label htmlFor="accentColor" className="font-medium text-gray-300">Accent Color</label>
              <div className="relative">
                <input type="color" id="accentColor" name="styleOptions.accentColor" value={currentAccentColor} onChange={handleInputChange} disabled={editorDisabled} className="p-1 h-10 w-14 block bg-gray-900 border border-gray-600 cursor-pointer rounded-lg disabled:opacity-50 disabled:cursor-not-allowed" />
              </div>
              <div style={{ backgroundColor: currentAccentColor }} className="w-8 h-8 rounded-full border-2 border-white/20 shadow-inner"></div>
            </div>
          </FormSection>

          <FormSection title="Card Back">
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    {cardBackLogoPreview && (
                    <img src={cardBackLogoPreview} alt="Card Back Logo Preview" className="w-16 h-16 object-contain shadow-md bg-gray-700 p-1 rounded-md" />
                    )}
                    <div className="flex-grow">
                    <label className={`block text-sm font-medium text-gray-300 mb-1 ${editorDisabled ? 'opacity-50' : ''}`}>Custom Card Back Logo</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleCardBackLogoChange} 
                        disabled={editorDisabled} 
                        className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-accent/80 file:text-white hover:file:bg-brand-accent disabled:opacity-50 disabled:cursor-not-allowed" 
                    />
                    </div>
                    {cardBackLogoPreview && (
                    <button 
                        onClick={handleRemoveCardBackLogo} 
                        className="p-2 rounded-full text-gray-400 hover:bg-red-500/50 hover:text-white transition-colors"
                        title="Remove custom logo"
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                    )}
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className={`block text-sm font-medium text-gray-300 ${!cardData?.cardBackLogoUrl || editorDisabled ? 'opacity-50' : ''}`}>Logo Size</label>
                        <span className="text-sm text-gray-400">{cardData?.cardBackLogoSize || 0}px</span>
                    </div>
                    <input 
                        type="range" 
                        min="50" 
                        max="300" 
                        name="cardBackLogoSize"
                        value={cardData?.cardBackLogoSize || 160} 
                        onChange={e => handleCardDataChange({ cardBackLogoSize: parseInt(e.target.value, 10) })}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-brand-accent [&::-moz-range-thumb]:bg-brand-accent disabled:cursor-not-allowed"
                        disabled={!cardData?.cardBackLogoUrl || editorDisabled}
                    />
                </div>
            </div>
          </FormSection>

        </main>

        {/* Card Preview */}
        <aside className="hidden lg:flex flex-col lg:w-1/2 p-6 bg-brand-dark" style={{maxHeight: 'calc(100vh - 69px)'}}>
          <div className="flex-grow w-full perspective-container flex items-center justify-center">
            <div 
              className="card-3d w-[384px] h-[720px]"
              style={{ transform: `rotateY(${isEditorPreviewFlipped ? 180 : 0}deg)` }}
            >
              <div className="card-face card-front">
                <CardPreview data={cardData} onUpdate={handleCardDataChange} />
              </div>
              <CardBack data={cardData} />
            </div>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsEditorPreviewFlipped(prev => !prev)}
              disabled={editorDisabled}
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold py-2 px-6 rounded-lg transition-all hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEditorPreviewFlipped ? 'View Front' : 'View Back'}
            </button>
          </div>
        </aside>
      </div>

      <CreateCardModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateCard}
      />
      
      {cardToDeleteDetails && <ConfirmDeleteModal 
        isOpen={!!cardToDelete}
        onClose={() => setCardToDelete(null)}
        onConfirm={confirmDeleteCard}
        cardName={cardToDeleteDetails.cardName}
      />}
      
      <InteractivePreviewModal 
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        data={cardData}
        onUpdate={handleCardDataChange}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        url={shareableUrl}
      />

      <Toast 
        message={toast.message} 
        show={toast.show}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
        type={toast.type}
      />

    </div>
  );
};


// =================================================================================
// RENDERER (from index.tsx)
// =================================================================================

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);