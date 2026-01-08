/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import {
    User,
    CreditCard,
    Globe,
    Lock,
    LogOut,
    ChevronRight,
    Camera,
    Check,
    Loader2
} from 'lucide-react';
import { profile } from '@/assets';


// Type Definitions

interface MenuItemProps {
    icon: React.ElementType;
    label: string;
    onClick?: () => void;
    isDestructive?: boolean;
}

interface Language {
    code: string;
    name: string;
    nativeName: string;
    flag: string;
}

// Constants
const AVAILABLE_LANGUAGES: Language[] = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
];


/**
 * Set Google Translate cookie
 */
const setTranslateCookie = (langCode: string): void => {
    const value = langCode === 'en' ? '' : `/en/${langCode}`;
    
    // Clear existing cookies first
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
    
    if (value) {
        document.cookie = `googtrans=${value}; path=/`;
        document.cookie = `googtrans=${value}; path=/; domain=.${window.location.hostname}`;
    }
};


 // Get current language from cookie
 
const getCurrentLanguage = (): string => {
    const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
    return match ? match[1] : 'en';
};

// Sub-Components
const MenuItem: React.FC<MenuItemProps> = ({
    icon: Icon,
    label,
    onClick,
    isDestructive = false,
}) => {
    return (
        <div
            onClick={onClick}
            className="group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-50 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
        >
            <div className="flex items-center gap-4">
                <Icon
                    size={22}
                    className={`${isDestructive ? 'text-red-500' : 'text-gray-600'} stroke-[1.5]`}
                />
                <span className={`font-medium text-base ${isDestructive ? 'text-red-500' : 'text-gray-800'}`}>
                    {label}
                </span>
            </div>

            {!isDestructive && (
                <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
            )}
        </div>
    );
};

/**
 * LanguageSelector Component
 */
const LanguageSelector: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isChanging, setIsChanging] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Get current language from cookie or localStorage
    const currentLangCode = localStorage.getItem('selectedLanguage') || getCurrentLanguage();
    const selectedLanguage = AVAILABLE_LANGUAGES.find(l => l.code === currentLangCode) || AVAILABLE_LANGUAGES[0];

    // Initialize Google Translate
    useEffect(() => {
        // Hide Google Translate UI
        const style = document.createElement('style');
        style.id = 'google-translate-hide';
        style.innerHTML = `
            .goog-te-banner-frame,
            .goog-te-gadget-icon,
            #google_translate_element,
            .goog-te-balloon-frame,
            .goog-tooltip,
            .VIpgJd-ZVi9od-ORHb-OEVmcd,
            .VIpgJd-ZVi9od-l4eHX-hSRGPd,
            #goog-gt-tt,
            .goog-te-gadget,
            .skiptranslate,
            .goog-te-spinner-pos {
                display: none !important;
                visibility: hidden !important;
            }
            
            body {
                top: 0 !important;
                position: static !important;
            }
            
            .goog-text-highlight {
                background: none !important;
                box-shadow: none !important;
            }
        `;
        
        if (!document.getElementById('google-translate-hide')) {
            document.head.appendChild(style);
        }

        // Create Google Translate container
        if (!document.getElementById('google_translate_element')) {
            const div = document.createElement('div');
            div.id = 'google_translate_element';
            div.style.display = 'none';
            document.body.appendChild(div);
        }

        // Initialize Google Translate
        (window as any).googleTranslateElementInit = () => {
            new (window as any).google.translate.TranslateElement(
                {
                    pageLanguage: 'en',
                    includedLanguages: 'en,ar',
                    autoDisplay: false,
                },
                'google_translate_element'
            );
        };

        // Load script if not already loaded
        if (!document.getElementById('google-translate-script')) {
            const script = document.createElement('script');
            script.id = 'google-translate-script';
            script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    /**
     * Handle language change
     */
    const handleLanguageSelect = (language: Language): void => {
        if (language.code === selectedLanguage.code) {
            setIsOpen(false);
            return;
        }

        setIsChanging(true);
        setIsOpen(false);

        // Save selection
        localStorage.setItem('selectedLanguage', language.code);
        
        // Set cookie for Google Translate
        setTranslateCookie(language.code);

        // Show toast before reload
        toast.success(`Changing to ${language.name}...`, {
            icon: language.flag,
            duration: 1000,
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });

        // Reload page after short delay
        setTimeout(() => {
            window.location.reload();
        }, 500);
    };

    return (
        <div ref={dropdownRef} className="relative">
            {/* Trigger */}
            <div
                onClick={() => !isChanging && setIsOpen(!isOpen)}
                className="group flex items-center justify-between p-4 bg-white rounded-xl border border-gray-50 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
            >
                <div className="flex items-center gap-4">
                    <Globe size={22} className="text-gray-600 stroke-[1.5]" />
                    <span className="font-medium text-base text-gray-800">
                        App Language
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    {isChanging ? (
                        <Loader2 size={18} className="animate-spin text-blue-500" />
                    ) : (
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
                            <span>{selectedLanguage.flag}</span>
                            <span>{selectedLanguage.name}</span>
                        </span>
                    )}
                    <ChevronRight
                        size={20}
                        className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
                    />
                </div>
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border border-gray-100 shadow-lg z-50 overflow-hidden">
                    {AVAILABLE_LANGUAGES.map((language) => (
                        <div
                            key={language.code}
                            onClick={() => handleLanguageSelect(language)}
                            className={`flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                                selectedLanguage.code === language.code ? 'bg-blue-50' : ''
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">{language.flag}</span>
                                <div className="flex flex-col">
                                    <span className="font-medium text-gray-800">
                                        {language.name}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {language.nativeName}
                                    </span>
                                </div>
                            </div>

                            {selectedLanguage.code === language.code && (
                                <Check size={20} className="text-blue-500" />
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// ============================================
// Main Component
// ============================================

const ProfileSettings: React.FC = () => {
    const navigate = useNavigate();

    const handleBookingClick = (): void => {
        toast("You don't have any bookings yet!", {
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });
    };

    const handleLogout = (): void => {
        toast.loading('Logging out...', {
            duration: 1500,
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        });

        setTimeout(() => {
            navigate('/login');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-start pt-10 px-4 pb-10">
            <Toaster position="top-center" reverseOrder={false} />

            <div className="w-full max-w-3xl space-y-6">

                {/* User Profile Card */}
                <div className="relative rounded-[24px] p-px bg-gradient-to-b from-[#4A90E2] to-[#DE3163]">
                    <div className="w-full rounded-[23px] p-6 flex items-center gap-6 bg-white">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                <img
                                    src={profile}
                                    alt="User Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button
                                className="absolute bottom-0 right-0 bg-blue-100 p-2 rounded-xl border-2 border-white hover:bg-blue-200 transition-colors"
                                aria-label="Change profile picture"
                            >
                                <Camera size={18} className="text-blue-600" />
                            </button>
                        </div>

                        <div className="flex flex-col">
                            <h2 className="text-2xl font-bold text-slate-700 mb-1">Knee Due</h2>
                            <p className="text-slate-500 text-lg">kneedue@gmail.com</p>
                        </div>
                    </div>
                </div>

                {/* Settings Menu */}
                <div className="relative rounded-[24px] p-px bg-gradient-to-b from-[#4A90E2] to-[#DE3163]">
                    <div className="w-full rounded-[23px] p-6 space-y-4 bg-white">
                        
                        <MenuItem
                            icon={User}
                            label="Personal Info"
                            onClick={() => navigate("/personal-info")}
                        />

                        <MenuItem
                            icon={CreditCard}
                            label="My Booking"
                            onClick={handleBookingClick}
                        />

                        <LanguageSelector />

                        <MenuItem
                            icon={Lock}
                            label="Account & Security"
                            onClick={() => navigate("/security")}
                        />

                        <div className="pt-2">
                            <MenuItem
                                icon={LogOut}
                                label="Logout"
                                isDestructive={true}
                                onClick={handleLogout}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProfileSettings;