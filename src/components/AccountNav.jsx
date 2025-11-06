import { NavLink } from 'react-router-dom';

/**
 * AccountNav component displays the user account link with avatar or fallback icon.
 * @param {Object} props - Component props
 * @param {Object} props.profile - User profile object
 * @returns {JSX.Element}
 */
export default function AccountNav({ profile }) {
  const avatarUrl = profile?.images?.[0]?.url;

  return (
    <NavLink
      to="/account"
      aria-label={profile?.display_name ? `Account (${profile.display_name})` : 'Account'}
      className="avatar"
    >
      {avatarUrl && (
        <img
          src={avatarUrl}
          alt={profile?.display_name || 'Profile avatar'}
          className="avatar__img"
        />
      )}
    </NavLink>
  );
}