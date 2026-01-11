import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "./Logo";
import { NavigationLinks } from "./NavigationLinks";
import { NavbarActions } from "./NavbarActions";
import { MenuIcon, CloseIcon, SearchIcon, FilterIcon } from "../../icons";
import userImage from "../../../assets/user.png";

interface NavbarProps {
  userPhotoUrl?: string;
  onSearchClick?: () => void;
  onFilterClick?: () => void;
  onUserClick?: () => void;
}

export const Navbar = ({
  onSearchClick,
  onFilterClick,
  onUserClick,
}: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full h-14 sm:h-16 md:h-20 bg-white">
      <div className="w-full h-full mx-auto flex items-center justify-between px-2 sm:px-3 md:px-4 lg:px-12 xl:px-25 max-w-360">
        <Logo />
        <NavigationLinks />
        <NavbarActions
          onSearchClick={onSearchClick}
          onFilterClick={onFilterClick}
          onUserClick={onUserClick}
        />
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed top-14 sm:top-16 md:top-20 left-0 right-0 bg-white z-40 shadow-lg border-t border-gray-100 max-h-[calc(100vh-3.5rem)] overflow-y-auto">
          <div className="px-4 py-4 space-y-2">
            <NavigationLinks
              mobile={true}
              onLinkClick={() => {
                setIsMobileMenuOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </nav>
  );
};
